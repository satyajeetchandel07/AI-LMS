from pydantic import BaseModel


class RecommendationResponse(BaseModel):

    student_id: str

    weak_topics: list[str]

    strong_topics: list[str]

    recommended_courses: list[str]

    recommended_actions: list[str]