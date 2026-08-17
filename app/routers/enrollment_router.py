from fastapi import APIRouter, HTTPException

from app.schemas.enrollment_schema import EnrollmentCreate

from app.services.enrollment_service import (
    enroll_student_service,
    get_all_enrollments_service,
    get_student_courses_service,
    get_course_students_service,
    delete_enrollment_service
)

router = APIRouter(
    prefix="/enrollments",
    tags=["Enrollment Module"]
)


# -----------------------------
# Enroll Student
# -----------------------------
@router.post("/")
async def enroll_student(enrollment: EnrollmentCreate):

    success, message = await enroll_student_service(enrollment)

    if not success:
        raise HTTPException(
            status_code=400,
            detail=message
        )

    return {
        "success": True,
        "message": message
    }


# -----------------------------
# Get All Enrollments
# -----------------------------
@router.get("/")
async def get_enrollments():

    return await get_all_enrollments_service()


# -----------------------------
# Get Student Courses
# -----------------------------
@router.get("/student/{email}")
async def get_student_courses(email: str):

    return await get_student_courses_service(email)


# -----------------------------
# Get Course Students
# -----------------------------
@router.get("/course/{course_code}")
async def get_course_students(course_code: str):

    return await get_course_students_service(course_code)


# -----------------------------
# Delete Enrollment
# -----------------------------
@router.delete("/{email}/{course_code}")
async def delete_enrollment(
    email: str,
    course_code: str
):

    deleted = await delete_enrollment_service(
        email,
        course_code
    )

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Enrollment not found"
        )

    return {
        "success": True,
        "message": "Enrollment deleted successfully"
    }