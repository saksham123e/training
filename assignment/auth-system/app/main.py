import logging
from typing import Dict

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.db.session import IS_SQLITE, engine
from app.models import Base
from app.routes import auth_router, pages_router


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

app = FastAPI(title=settings.app_name)
app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(auth_router)
app.include_router(pages_router)


@app.on_event("startup")
def startup() -> None:
    if IS_SQLITE and settings.app_env.lower() == "development":
        Base.metadata.create_all(bind=engine)


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse(url="/login", status_code=302)


@app.get("/health", tags=["health"])
def health_check() -> Dict[str, str]:
    return {"status": "ok"}
