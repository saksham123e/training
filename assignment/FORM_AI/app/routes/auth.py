import logging

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import get_db
from app.schemas import (
    ForgotPasswordRequest,
    MessageResponse,
    ResetPasswordRequest,
    TokenResponse,
    UserCreate,
    UserLogin,
    UserRead,
)
from app.services.auth_service import AuthService


router = APIRouter(prefix="/auth", tags=["auth"])
logger = logging.getLogger(__name__)


@router.post("/signup", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, db: Session = Depends(get_db)) -> UserRead:
    auth_service = AuthService(db)
    try:
        user = auth_service.signup(payload)
    except ValueError as exc:
        logger.warning("Signup request rejected for email=%s: %s", payload.email.lower(), exc)
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))
    except RuntimeError as exc:
        logger.exception("Signup request failed for email=%s", payload.email.lower())
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc))
    return user


@router.post("/login", response_model=TokenResponse)
def login(
    payload: UserLogin,
    response: Response,
    db: Session = Depends(get_db),
) -> TokenResponse:
    auth_service = AuthService(db)
    try:
        token_response = auth_service.login(payload)
    except ValueError as exc:
        logger.warning("Login request rejected for email=%s: %s", payload.email.lower(), exc)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc))
    except RuntimeError as exc:
        logger.exception("Login request failed for email=%s", payload.email.lower())
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc))
    response.set_cookie(
        key="access_token",
        value=token_response.access_token,
        httponly=True,
        max_age=settings.access_token_expire_minutes * 60,
        samesite="lax",
        secure=settings.app_env.lower() == "production",
    )
    return token_response


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response) -> Response:
    response.delete_cookie(key="access_token")
    response.status_code = status.HTTP_204_NO_CONTENT
    return response


@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(
    payload: ForgotPasswordRequest,
    db: Session = Depends(get_db),
) -> MessageResponse:
    auth_service = AuthService(db)
    try:
        return auth_service.forgot_password(payload.email)
    except RuntimeError as exc:
        logger.exception("Forgot-password request failed for email=%s", payload.email.lower())
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc))


@router.post("/reset-password", response_model=MessageResponse)
def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_db),
) -> MessageResponse:
    auth_service = AuthService(db)
    try:
        return auth_service.reset_password(payload)
    except ValueError as exc:
        logger.warning("Reset-password request rejected for token=%s", payload.token)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    except RuntimeError as exc:
        logger.exception("Reset-password request failed for token=%s", payload.token)
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc))
