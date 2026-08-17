from pydantic import BaseModel, EmailStr


class InstructorCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    department: str
    qualification: str
    experience: int


class InstructorUpdate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    department: str
    qualification: str
    experience: int