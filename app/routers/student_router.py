from fastapi import APIRouter, HTTPException

from app.schemas.student_schema import (
    StudentCreate,
    StudentUpdate
)

from app.services.student_service import (
    create_student_service,
    get_all_students_service,
    get_student_by_email_service,
    update_student_service,
    delete_student_service,
    search_student_service
)

router = APIRouter(
    prefix="/students",
    tags=["Student Module"]
)



# -----------------------------
# Get All Students
# -----------------------------
@router.get("/")
async def get_students():

    return await get_all_students_service()


# -----------------------------
# Get Student By Email
# -----------------------------
@router.get("/email/{email}")
async def get_student(email: str):

    student = await get_student_by_email_service(email)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student

# -----------------------------
# Search Student
# -----------------------------
@router.get("/search/{name}")
async def search_student(name: str):

    return await search_student_service(name)


# -----------------------------
# Create Student
# -----------------------------
@router.post("/")
async def add_student(student: StudentCreate):

    success, message = await create_student_service(student)

    if not success:
        raise HTTPException(
            status_code=409,
            detail=message
        )

    return {
        "success": True,
        "message": message
    }



# -----------------------------
# Update Student
# -----------------------------
@router.put("/{email}")
async def update_student(
    email: str,
    student: StudentUpdate
):

    updated = await update_student_service(
        email,
        student
    )

    if updated == 0:
        raise HTTPException(
            status_code=404,
            detail="Student not found or no changes made"
        )

    return {
        "success": True,
        "message": "Student updated successfully"
    }


# -----------------------------
# Delete Student
# -----------------------------
@router.delete("/{email}")
async def delete_student(email: str):

    deleted = await delete_student_service(email)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "success": True,
        "message": "Student deleted successfully"
    }


