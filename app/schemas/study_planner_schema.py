from pydantic import BaseModel, Field


class StudyPlannerRequest(BaseModel):
    subject: str
    exam_date: str
    daily_study_hours: float = Field(gt=0)


class StudyPlannerResponse(BaseModel):
    success: bool
    message: str
    data: dict