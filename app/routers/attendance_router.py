from fastapi import APIRouter, HTTPException

from app.schemas.attendance_schema import (
    AttendanceCreate,
    AttendanceUpdate
)

from app.services.attendance_service import (
    create_attendance_service,
    get_all_attendance_service,
    get_attendance_by_id_service,
    update_attendance_service,
    delete_attendance_service,
    get_student_attendance_service,
    get_course_attendance_service
)

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance Module"]
)


@router.post("/")
async def mark_attendance(attendance: AttendanceCreate):

    success, message = await create_attendance_service(attendance)

    if not success:
        raise HTTPException(
            status_code=400,
            detail=message
        )

    return {
        "success": True,
        "message": message
    }


@router.get("/")
async def get_all_attendance():

    return await get_all_attendance_service()


@router.get("/{id}")
async def get_attendance(id: str):

    attendance = await get_attendance_by_id_service(id)

    if not attendance:
        raise HTTPException(
            status_code=404,
            detail="Attendance not found"
        )

    return attendance


@router.put("/{id}")
async def update_attendance(
    id: str,
    attendance: AttendanceUpdate
):

    updated = await update_attendance_service(id, attendance)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Attendance not found"
        )

    return {
        "success": True,
        "message": "Attendance updated successfully"
    }


@router.delete("/{id}")
async def delete_attendance(id: str):

    deleted = await delete_attendance_service(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Attendance not found"
        )

    return {
        "success": True,
        "message": "Attendance deleted successfully"
    }


@router.get("/student/{student_email}")
async def get_student_attendance(student_email: str):

    return await get_student_attendance_service(student_email)


@router.get("/course/{course_id}")
async def get_course_attendance(course_id: str):

    return await get_course_attendance_service(course_id)