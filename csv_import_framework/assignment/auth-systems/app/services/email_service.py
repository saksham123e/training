import logging
import smtplib
import ssl
from email.message import EmailMessage
from typing import Tuple

from app.core.config import settings


logger = logging.getLogger(__name__)


class EmailService:
    def send_password_reset_email(self, recipient_email: str, recipient_name: str, reset_link: str) -> None:
        self._validate_email_settings()
        logger.info(
            "send_password_reset_email called recipient=%s host=%s port=%s tls=%s",
            recipient_email,
            settings.email_host.strip(),
            settings.email_port,
            settings.email_use_tls,
        )

        message = EmailMessage()
        message["Subject"] = "Reset your password"
        message["From"] = settings.email_from_header
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

        tls_context = ssl.create_default_context()
        smtp_host = settings.email_host.strip()
        smtp_port = settings.email_port

        try:
            if settings.email_use_ssl:
                server = smtplib.SMTP_SSL(
                    smtp_host,
                    smtp_port,
                    timeout=settings.email_timeout_seconds,
                    context=tls_context,
                )
            else:
                server = smtplib.SMTP(
                    smtp_host,
                    smtp_port,
                    timeout=settings.email_timeout_seconds,
                )

            with server:
                if settings.app_env.lower() == "development":
                    server.set_debuglevel(1)
                server.ehlo()
                if settings.email_use_tls and not settings.email_use_ssl:
                    server.starttls(context=tls_context)
                    server.ehlo()
                logger.info("Attempting SMTP login for %s", settings.email_user_smtp)
                server.login(settings.email_user_smtp, settings.email_pass_smtp)
                logger.info("SMTP login successful for %s", settings.email_user_smtp)
                logger.info("Attempting to send password reset email to %s", recipient_email)
                server.sendmail(
                    settings.email_from_address,
                    [recipient_email],
                    message.as_string(),
                )
                logger.info(
                    "Password reset email sent to %s via %s:%s",
                    recipient_email,
                    smtp_host,
                    smtp_port,
                )
        except smtplib.SMTPAuthenticationError as exc:
            error_message = self._format_smtp_error(
                "SMTP authentication failed. Gmail rejected the login. Use the Gmail address in EMAIL_USER and a valid 16-character Gmail App Password in EMAIL_PASS.",
                exc,
            )
            logger.error(error_message)
            print(error_message)
            raise RuntimeError(error_message)
        except smtplib.SMTPException as exc:
            error_message = self._format_smtp_error("SMTP error while sending password reset email.", exc)
            logger.exception(error_message)
            print(error_message)
            raise RuntimeError(error_message)
        except OSError as exc:
            error_message = self._format_smtp_error(
                "Network error while connecting to the SMTP server. Check DNS, firewall, or outbound SMTP access.",
                exc,
            )
            logger.exception(error_message)
            print(error_message)
            raise RuntimeError(error_message)

    def _validate_email_settings(self) -> None:
        smtp_host = settings.email_host.strip()
        smtp_user = settings.email_user_smtp
        smtp_pass = settings.email_pass_smtp
        logger.info(
            "Loaded SMTP settings host=%s port=%s user_present=%s pass_present=%s pass_length=%s tls=%s ssl=%s",
            smtp_host,
            settings.email_port,
            bool(smtp_user),
            bool(smtp_pass),
            len(smtp_pass),
            settings.email_use_tls,
            settings.email_use_ssl,
        )

        if not smtp_host:
            raise RuntimeError("EMAIL_HOST is empty. Set it to smtp.gmail.com.")
        if not smtp_user:
            raise RuntimeError("EMAIL_USER is empty. Set it to your Gmail address.")
        if not smtp_pass:
            raise RuntimeError("EMAIL_PASS is empty. Set it to your Gmail App Password.")
        if smtp_host.lower() == "smtp.gmail.com" and len(smtp_pass) != 16:
            raise RuntimeError(
                "EMAIL_PASS does not look like a Gmail App Password. Use the 16-character App Password from your Google account, not your normal Gmail password."
            )
        if smtp_host.lower() == "smtp.gmail.com" and settings.email_port != 587:
            raise RuntimeError("Gmail SMTP must use port 587 with TLS enabled.")
        if smtp_host.lower() == "smtp.gmail.com" and not settings.email_use_tls:
            raise RuntimeError("Gmail SMTP must use TLS. Set EMAIL_USE_TLS=true.")
        if smtp_host.lower() == "smtp.gmail.com" and settings.email_use_ssl:
            raise RuntimeError("Gmail SMTP over SSL is not supported in this setup. Set EMAIL_USE_SSL=false.")

    def _format_smtp_error(self, message: str, exc: Exception) -> str:
        code, response = self._extract_smtp_details(exc)
        if code is None and response is None:
            return "{message} {error}".format(message=message, error=str(exc))

        parts = [message]
        if code is not None:
            parts.append("SMTP code: {code}.".format(code=code))
        if response:
            parts.append("SMTP response: {response}".format(response=response))
        return " ".join(parts)

    def _extract_smtp_details(self, exc: Exception) -> Tuple[int, str]:
        code = getattr(exc, "smtp_code", None)
        raw_response = getattr(exc, "smtp_error", None)
        if isinstance(raw_response, bytes):
            response = raw_response.decode("utf-8", errors="replace")
        elif raw_response is None:
            response = str(exc)
        else:
            response = str(raw_response)
        return code, response

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
