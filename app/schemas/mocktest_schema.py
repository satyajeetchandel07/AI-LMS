from pydantic import BaseModel


class MockTestCreate(BaseModel):
    course_code: str
    test_name: str
    duration: int
    total_marks: int