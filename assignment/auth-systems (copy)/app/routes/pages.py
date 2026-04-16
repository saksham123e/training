from pathlib import Path
from typing import Dict

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse

from app.core.dependencies import get_current_user
from app.models import User


router = APIRouter(tags=["pages"])
STATIC_DIR = Path("static")


@router.get("/login", include_in_schema=False)
def login_page() -> FileResponse:
    return FileResponse(STATIC_DIR / "login.html")


@router.get("/signup", include_in_schema=False)
def signup_page() -> FileResponse:
    return FileResponse(STATIC_DIR / "signup.html")


@router.get("/dashboard", include_in_schema=False)
def dashboard() -> FileResponse:
    return FileResponse(STATIC_DIR / "dashboard.html")


@router.get("/extra", include_in_schema=False)
def extra_page() -> FileResponse:
    return FileResponse(STATIC_DIR / "extra.html")


@router.get("/reset-password", include_in_schema=False)
def reset_password_page() -> FileResponse:
    return FileResponse(STATIC_DIR / "reset-password.html")


@router.get("/api/me", response_model=Dict[str, str])
def current_user_profile(current_user: User = Depends(get_current_user)) -> Dict[str, str]:
    return {"id": str(current_user.id), "email": current_user.email, "name": current_user.name}
