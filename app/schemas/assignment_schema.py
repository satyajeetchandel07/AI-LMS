from pydantic import BaseModel


class AssignmentCreate(BaseModel):
    course_id: str
    instructor_email: str
    title: str
    description: str
    due_date: str
    total_marks: int


class AssignmentUpdate(BaseModel):
    course_id: str
    instructor_email: str
    title: str
    description: str
    due_date: str
    total_marks: int