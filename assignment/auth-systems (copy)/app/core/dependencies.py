from typing import Optional

from fastapi import Cookie, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import JWTError, decode_access_token
from app.db.session import get_db
from app.models import User


def _extract_bearer_token(authorization: Optional[str]) -> Optional[str]:
    if not authorization:
        return None

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        return None
    return token


def _get_user_from_token(token: str, db: Session) -> Optional[User]:
    try:
        payload = decode_access_token(token)
        subject = payload.get("sub")
        if not subject:
            return None
        user_id = int(subject)
    except (JWTError, TypeError, ValueError):
        return None

    return db.query(User).filter(User.id == user_id).first()


def get_current_user(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
    access_token: Optional[str] = Cookie(None),
) -> User:
    token = _extract_bearer_token(authorization) or access_token
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided.",
        )

    user = _get_user_from_token(token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token.",
        )

    return user


def get_current_user_optional(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
    access_token: Optional[str] = Cookie(None),
) -> Optional[User]:
    token = _extract_bearer_token(authorization) or access_token
    if not token:
        return None
    return _get_user_from_token(token, db)
