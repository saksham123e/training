from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


database_url = make_url(settings.database_url)
engine_kwargs = {"pool_pre_ping": True}
IS_SQLITE = database_url.drivername.startswith("sqlite")

if database_url.drivername.startswith("postgresql"):
    engine_kwargs["connect_args"] = {"connect_timeout": 5}
elif IS_SQLITE:
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(settings.database_url, **engine_kwargs)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
