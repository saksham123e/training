import asyncore
import smtpd
from datetime import datetime
from pathlib import Path


MAIL_LOG = Path("tmp/dev-mails.log")


class DevMailServer(smtpd.SMTPServer):
    def process_message(self, peer, mailfrom, rcpttos, data, **kwargs):
        MAIL_LOG.parent.mkdir(parents=True, exist_ok=True)
        entry = (
            "\n" + "=" * 80 + "\n"
            + "Timestamp: {timestamp}\n".format(timestamp=datetime.now().isoformat())
            + "From: {mailfrom}\n".format(mailfrom=mailfrom)
            + "To: {recipients}\n".format(recipients=", ".join(rcpttos))
            + "-" * 80 + "\n"
            + data.decode("utf-8", errors="replace")
            + "\n"
        )
        with MAIL_LOG.open("a", encoding="utf-8") as handle:
            handle.write(entry)
        print("Captured email for {recipients}".format(recipients=", ".join(rcpttos)))
        return None


if __name__ == "__main__":
    print("Dev mail server listening on 127.0.0.1:1025")
    print("Captured emails will be written to tmp/dev-mails.log")
    DevMailServer(("127.0.0.1", 1025), None)
    asyncore.loop()
