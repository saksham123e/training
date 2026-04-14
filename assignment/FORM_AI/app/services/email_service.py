import logging
import smtplib
from email.message import EmailMessage

from app.core.config import settings


logger = logging.getLogger(__name__)


class EmailService:
    def send_password_reset_email(self, recipient_email: str, recipient_name: str, reset_link: str) -> None:
        message = EmailMessage()
        message["Subject"] = "Reset your password"
        message["From"] = self._format_from_header()
        message["To"] = recipient_email
        message.set_content(
            self._build_text_body(
                recipient_name=recipient_name,
                reset_link=reset_link,
            )
        )
        message.add_alternative(
            self._build_html_body(
                recipient_name=recipient_name,
                reset_link=reset_link,
            ),
            subtype="html",
        )

        try:
            with smtplib.SMTP(settings.email_host, settings.email_port, timeout=20) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(settings.email_user, settings.email_pass_smtp)
                server.send_message(message)
        except (smtplib.SMTPException, OSError):
            logger.exception("Failed to send password reset email to %s", recipient_email)
            raise RuntimeError("Unable to send password reset email at the moment.")

    def _format_from_header(self) -> str:
        return "Form AI Auth <{email}>".format(email=settings.email_user)

    def _build_text_body(self, recipient_name: str, reset_link: str) -> str:
        return (
            "Hello {name},\n\n"
            "We received a request to reset your password.\n"
            "Use the link below to choose a new password:\n\n"
            "{link}\n\n"
            "This link expires in {minutes} minutes.\n"
            "If you did not request this, you can ignore this email.\n"
        ).format(
            name=recipient_name,
            link=reset_link,
            minutes=settings.reset_token_expire_minutes,
        )

    def _build_html_body(self, recipient_name: str, reset_link: str) -> str:
        return """
        <html>
          <body style="font-family: Arial, sans-serif; color: #0f172a;">
            <h2>Reset your password</h2>
            <p>Hello {name},</p>
            <p>We received a request to reset your password.</p>
            <p>
              <a href="{link}" style="display:inline-block;padding:12px 18px;background:#0f766e;color:#ffffff;text-decoration:none;border-radius:8px;">
                Reset Password
              </a>
            </p>
            <p>If the button does not work, use this link:</p>
            <p><a href="{link}">{link}</a></p>
            <p>This link expires in {minutes} minutes.</p>
            <p>If you did not request this, you can ignore this email.</p>
          </body>
        </html>
        """.format(
            name=recipient_name,
            link=reset_link,
            minutes=settings.reset_token_expire_minutes,
        )
