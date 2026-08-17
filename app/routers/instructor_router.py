from fastapi import APIRouter, HTTPException

from app.schemas.instructor_schema import InstructorCreate, InstructorUpdate
from app.services.instructor_service import create_instructor_service, get_all_instructors_service, get_instructor_by_id_service, update_instructor_service, delete_instructor_service

router = APIRouter(
    prefix="/instructors",
    tags=["Instructor Module"]
)

@router.get("/")
async def get_all_instructors():

    return await get_all_instructors_service()


@router.post("/")
async def add_instructor(instructor: InstructorCreate):

    success, message = await create_instructor_service(instructor)

    if not success:
        raise HTTPException(
            status_code=409,
            detail=message
        )

    return {
        "success": True,
        "message": message
    }

@router.get("/{id}")
async def get_instructor(id: str):

    instructor = await get_instructor_by_id_service(id)

    if not instructor:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found"
        )

    return instructor

@router.put("/{id}")
async def update_instructor(
    id: str,
    instructor: InstructorUpdate
):

    updated = await update_instructor_service(
        id,
        instructor
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found"
        )

    return {
        "success": True,
        "message": "Instructor updated successfully"
    }

@router.delete("/{id}")
async def delete_instructor(id: str):

    deleted = await delete_instructor_service(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Instructor not found"
        )

    return {
        "success": True,
        "message": "Instructor deleted successfully"
    }        