import smtplib
import os
from email.message import EmailMessage

msg = EmailMessage()
msg["Subject"] = "AI-LMS Verification"
msg["From"] = os.getenv("EMAIL")
msg["To"] = "student@example.com"

msg.set_content("Welcome to AI-LMS!")

with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
    smtp.login(
        os.getenv("EMAIL"),
        os.getenv("EMAIL_PASSWORD")
    )
    smtp.send_message(msg)

    