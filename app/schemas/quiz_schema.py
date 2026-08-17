from pydantic import BaseModel


class QuizRequest(BaseModel):
    topic: str
    number_of_questions: int = 5
    difficulty: str = "Easy"