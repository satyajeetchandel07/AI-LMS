from pydantic import BaseModel


class AttendanceCreate(BaseModel):
    student_email: str
    course_id: str
    lecture_id: str
    date: str
    status: str


class AttendanceUpdate(BaseModel):
    student_email: str
    course_id: str
    lecture_id: str
    date: str
    status: str