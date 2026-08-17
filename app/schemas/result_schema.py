from pydantic import BaseModel
from typing import List


class Answer(BaseModel):
    question_id: str
    selected_answer: str


class ResultCreate(BaseModel):
    student_email: str
    test_name: str
    answers: List[Answer]