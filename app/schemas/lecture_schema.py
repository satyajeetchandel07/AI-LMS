from pydantic import BaseModel


class LectureCreate(BaseModel):
    course_id: str
    instructor_email: str
    title: str
    description: str
    video_url: str
    pdf_url: str
    duration: int


class LectureUpdate(BaseModel):
    course_id: str
    instructor_email: str
    title: str
    description: str
    video_url: str
    pdf_url: str
    duration: int