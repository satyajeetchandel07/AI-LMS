from datetime import datetime


def create_announcement(announcement):

    return {
        "title": announcement.title,
        "description": announcement.description,
        "audience": announcement.audience,
        "created_by": announcement.created_by,
        "created_at": datetime.utcnow()
    }