from pydantic import BaseModel, EmailStr
from typing import Optional


class StudentCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    department: str
    semester: int


class StudentUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    semester: Optional[int] = None