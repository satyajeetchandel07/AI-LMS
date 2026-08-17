from typing import Optional

from pydantic import BaseModel


class SubmissionCreate(BaseModel):
    assignment_id: str
    student_email: str
    submission_url: Optional[str] = None


class SubmissionUpdate(BaseModel):
    assignment_id: str
    student_email: str
    submission_url: Optional[str] = None