from datetime import datetime
from typing import Optional

import re

from pydantic import BaseModel, EmailStr, constr, validator


SPECIAL_CHAR_PATTERN = re.compile(r"[^A-Za-z0-9]")


class UserBase(BaseModel):
    name: constr(strip_whitespace=True, min_length=1, max_length=255)
    email: EmailStr


class UserCreate(UserBase):
    password: constr(min_length=6, max_length=128)

    @validator("password")
    def validate_password_strength(cls, value: str) -> str:
        if not SPECIAL_CHAR_PATTERN.search(value):
            raise ValueError("Password must contain at least one special character.")
        return value


class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=6, max_length=128)


class UserRead(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class MessageResponse(BaseModel):
    message: str


class ResetPasswordRequest(BaseModel):
    token: str
    password: constr(min_length=6, max_length=128)

    @validator("password")
    def validate_password_strength(cls, value: str) -> str:
        if not SPECIAL_CHAR_PATTERN.search(value):
            raise ValueError("Password must contain at least one special character.")
        return value


class UserInDB(UserRead):
    reset_token: Optional[str] = None
    reset_token_expiry: Optional[datetime] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
