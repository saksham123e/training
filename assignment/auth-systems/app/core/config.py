from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    app_name: str = Field("Form AI Auth", env="APP_NAME")
    app_env: str = Field("development", env="APP_ENV")
    frontend_base_url: str = Field("http://127.0.0.1:8000", env="FRONTEND_BASE_URL")
    secret_key: str = Field(..., env="SECRET_KEY")
    access_token_expire_minutes: int = Field(60, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    reset_token_expire_minutes: int = Field(30, env="RESET_TOKEN_EXPIRE_MINUTES")
    database_url: str = Field(..., env="DATABASE_URL")
    email_host: str = Field(..., env="EMAIL_HOST")
    email_port: int = Field(587, env="EMAIL_PORT")
    email_user: str = Field(..., env="EMAIL_USER")
    email_pass: str = Field(..., env="EMAIL_PASS")
    email_from: str = Field("", env="EMAIL_FROM")
    email_use_tls: bool = Field(True, env="EMAIL_USE_TLS")
    email_use_ssl: bool = Field(False, env="EMAIL_USE_SSL")
    email_timeout_seconds: int = Field(20, env="EMAIL_TIMEOUT_SECONDS")

    @property
    def email_pass_smtp(self) -> str:
        return self.email_pass.replace(" ", "").strip()

    @property
    def email_user_smtp(self) -> str:
        return self.email_user.strip()

    @property
    def email_from_header(self) -> str:
        sender = self.email_from.strip() or self.email_user_smtp
        return "Form AI Auth <{email}>".format(email=sender)

    @property
    def email_from_address(self) -> str:
        return (self.email_from.strip() or self.email_user_smtp).strip()

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


settings = Settings()
