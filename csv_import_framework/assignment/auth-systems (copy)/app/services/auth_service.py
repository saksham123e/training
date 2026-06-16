import logging
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import create_access_token, hash_password, verify_password
from app.models import User
from app.schemas import MessageResponse, ResetPasswordRequest, TokenResponse, UserCreate, UserLogin
from app.services.email_service import EmailService


logger = logging.getLogger(__name__)


class AuthService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.email_service = EmailService()

    def signup(self, payload: UserCreate) -> User:
        try:
            existing_user = self._get_user_by_email(payload.email)
            if existing_user:
                raise ValueError("An account with this email already exists.")

            user = User(
                name=payload.name,
                email=payload.email.lower(),
                hashed_password=hash_password(payload.password),
            )
            self.db.add(user)
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            logger.warning("Signup blocked because email already exists: %s", payload.email.lower())
            raise ValueError("An account with this email already exists.")
        except SQLAlchemyError:
            self.db.rollback()
            logger.exception("Database error while creating account for email=%s", payload.email.lower())
            raise RuntimeError("Database is unavailable while creating the account.")
        self.db.refresh(user)
        return user

    def login(self, payload: UserLogin) -> TokenResponse:
        try:
            user = self._get_user_by_email(payload.email)
        except SQLAlchemyError:
            logger.exception("Database error while loading user for login email=%s", payload.email.lower())
            raise RuntimeError("Database is unavailable while logging in.")

        if not user:
            logger.info("Login failed because user was not found: %s", payload.email.lower())
            raise ValueError("Invalid email or password.")

        try:
            is_valid_password = verify_password(payload.password, user.hashed_password)
        except Exception:
            logger.exception("Password verification failed for email=%s", payload.email.lower())
            raise RuntimeError("Password verification failed during login.")

        if not is_valid_password:
            logger.info("Login failed because password did not match for email=%s", payload.email.lower())
            raise ValueError("Invalid email or password.")

        access_token = create_access_token(subject=str(user.id))
        return TokenResponse(access_token=access_token)

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def forgot_password(self, email: str) -> MessageResponse:
        user = self._get_user_by_email(email)
        if user:
            reset_token = secrets.token_urlsafe(32)
            user.reset_token = reset_token
            user.reset_token_expiry = datetime.now(timezone.utc) + timedelta(
                minutes=settings.reset_token_expire_minutes
            )
            self.db.add(user)
            try:
                self.db.commit()
            except SQLAlchemyError:
                self.db.rollback()
                logger.exception("Database error while generating reset link for email=%s", email.lower())
                raise RuntimeError("Database error while generating the reset link.")

            reset_link = "{base_url}/reset-password?token={token}".format(
                base_url=settings.frontend_base_url.rstrip("/"),
                token=reset_token,
            )
            try:
                self.email_service.send_password_reset_email(
                    recipient_email=user.email,
                    recipient_name=user.name,
                    reset_link=reset_link,
                )
            except RuntimeError:
                user.reset_token = None
                user.reset_token_expiry = None
                self.db.add(user)
                self.db.commit()
                raise

        return MessageResponse(
            message="If an account exists for that email, reset instructions have been sent."
        )

    def reset_password(self, payload: ResetPasswordRequest) -> MessageResponse:
        user = self.db.query(User).filter(User.reset_token == payload.token).first()
        if not user or not user.reset_token_expiry:
            raise ValueError("Invalid password reset token.")

        expiry = user.reset_token_expiry
        if expiry.tzinfo is None:
            expiry = expiry.replace(tzinfo=timezone.utc)

        if expiry < datetime.now(timezone.utc):
            user.reset_token = None
            user.reset_token_expiry = None
            self.db.add(user)
            try:
                self.db.commit()
            except SQLAlchemyError:
                self.db.rollback()
                logger.exception("Database error while expiring reset token for user_id=%s", user.id)
                raise RuntimeError("Database error while expiring the reset token.")
            raise ValueError("Password reset token has expired.")

        user.hashed_password = hash_password(payload.password)
        user.reset_token = None
        user.reset_token_expiry = None
        self.db.add(user)
        try:
            self.db.commit()
        except SQLAlchemyError:
            self.db.rollback()
            logger.exception("Database error while resetting password for user_id=%s", user.id)
            raise RuntimeError("Database error while resetting the password.")

        return MessageResponse(message="Password reset successful. You can now log in.")

    def _get_user_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email.lower()).first()
