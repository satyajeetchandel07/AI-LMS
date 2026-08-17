from pydantic import BaseModel


class EnrollmentCreate(BaseModel):
    student_email: str
    course_code: str