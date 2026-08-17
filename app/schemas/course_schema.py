from pydantic import BaseModel
from typing import Optional


class CourseCreate(BaseModel):
    course_name: str
    course_code: str
    description: str
    category: str
    instructor: str
    duration: str
    level: str


class CourseUpdate(BaseModel):
    course_name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    instructor: Optional[str] = None
    duration: Optional[str] = None
    level: Optional[str] = None