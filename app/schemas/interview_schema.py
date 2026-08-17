from pydantic import BaseModel


class InterviewRequest(BaseModel):
    job_role: str
    experience: str
    difficulty: str
    question_number: int


class InterviewAnswer(BaseModel):
    job_role: str
    question: str
    answer: str