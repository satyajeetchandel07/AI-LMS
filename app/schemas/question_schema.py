from pydantic import BaseModel
from typing import Optional


class QuestionCreate(BaseModel):
    test_name: str

    question: str

    option1: str
    option2: str
    option3: str
    option4: str

    correct_answer: str

    marks: int


class QuestionUpdate(BaseModel):
    question: Optional[str] = None

    option1: Optional[str] = None
    option2: Optional[str] = None
    option3: Optional[str] = None
    option4: Optional[str] = None

    correct_answer: Optional[str] = None

    marks: Optional[int] = None