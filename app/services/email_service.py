import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv


load_dotenv()


EMAIL_ADDRESS = os.getenv("EMAIL")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_otp_email(
    recipient_email: str,
    otp: str
):

    if not EMAIL_ADDRESS:
        raise Exception(
            "EMAIL is missing from .env"
        )

    if not EMAIL_PASSWORD:
        raise Exception(
            "EMAIL_PASSWORD is missing from .env"
        )

    subject = "AI-LMS Password Reset OTP"

    body = f"""
Hello,

Your AI-LMS password reset OTP is:

{otp}

This OTP is valid for 5 minutes.

If you did not request a password reset,
please ignore this email.

Regards,
AI-LMS
Learn. Build. Grow.
"""

    message = MIMEMultipart()

    message["From"] = EMAIL_ADDRESS
    message["To"] = recipient_email
    message["Subject"] = subject

    message.attach(
        MIMEText(body, "plain")
    )

    with smtplib.SMTP(
        "smtp.gmail.com",
        587
    ) as server:

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.sendmail(
            EMAIL_ADDRESS,
            recipient_email,
            message.as_string()
        )