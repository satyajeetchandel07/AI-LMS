from pydantic import BaseModel


class ResumeAnalysisResponse(BaseModel):
    student_id: str
    student_name: str
    file_name: str
    skills: list[str]
    strengths: list[str]
    weaknesses: list[str]
    recommended_roles: list[str]
    resume_score: int
    suggestions: list[str]