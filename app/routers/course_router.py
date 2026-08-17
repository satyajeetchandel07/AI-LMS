from fastapi import APIRouter, HTTPException

from app.schemas.course_schema import (
    CourseCreate,
    CourseUpdate
)

from app.services.course_service import (
    create_course_service,
    get_all_courses_service,
    get_course_by_code_service,
    update_course_service,
    delete_course_service,
    search_course_service
)

router = APIRouter(
    prefix="/courses",
    tags=["Course Module"]
)


# -----------------------------
# Create Course
# -----------------------------
@router.post("/")
async def create_course(course: CourseCreate):

    success, message = await create_course_service(course)

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
# Get All Courses
# -----------------------------
@router.get("/")
async def get_courses():

    return await get_all_courses_service()


# -----------------------------
# Get Course By Code
# -----------------------------
@router.get("/code/{course_code}")
async def get_course(course_code: str):

    course = await get_course_by_code_service(course_code)

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return course


# -----------------------------
# Update Course
# -----------------------------
@router.put("/{course_code}")
async def update_course(course_code: str, course: CourseUpdate):

    updated = await update_course_service(course_code, course)

    if updated == 0:
        raise HTTPException(
            status_code=404,
            detail="Course not found or no changes made"
        )

    return {
        "success": True,
        "message": "Course updated successfully"
    }


# -----------------------------
# Delete Course
# -----------------------------
@router.delete("/{course_code}")
async def delete_course(course_code: str):

    deleted = await delete_course_service(course_code)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return {
        "success": True,
        "message": "Course deleted successfully"
    }


# -----------------------------
# Search Course
# -----------------------------
@router.get("/search/{course_name}")
async def search_course(course_name: str):

    return await search_course_service(course_name)