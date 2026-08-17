from pydantic import BaseModel


class AnnouncementCreate(BaseModel):
    title: str
    description: str
    audience: str      # All, Student, Instructor
    created_by: str


class AnnouncementUpdate(BaseModel):
    title: str
    description: str
    audience: str
    created_by: str