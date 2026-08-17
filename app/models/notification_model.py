from datetime import datetime


def create_notification(notification):

    return {
        "title": notification.title,
        "message": notification.message,
        "receiver_email": notification.receiver_email,
        "sender_email": notification.sender_email,
        "is_read": False,
        "created_at": datetime.utcnow()
    }