from pydantic import BaseModel


class CertificateCreate(BaseModel):
    student_email: str
    student_name: str
    course_name: str
    instructor_name: str


class CertificateUpdate(BaseModel):
    student_name: str
    course_name: str
    instructor_name: str