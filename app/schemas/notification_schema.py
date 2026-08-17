from pydantic import BaseModel


class NotificationCreate(BaseModel):
    title: str
    message: str
    receiver_email: str
    sender_email: str


class NotificationUpdate(BaseModel):
    title: str
    message: str
    receiver_email: str