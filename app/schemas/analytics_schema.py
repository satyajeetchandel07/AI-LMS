from pydantic import BaseModel


class AnalyticsResponse(BaseModel):

    student_id: str

    attendance_percentage: float

    assignments_completed: int

    quizzes_attempted: int

    average_marks: float

    enrolled_courses: int

    certificates_earned: int

    recommendations: list[str]