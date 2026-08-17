from fastapi import APIRouter, HTTPException

from app.schemas.assignment_schema import (
    AssignmentCreate,
    AssignmentUpdate
)

from app.services.assignment_service import (
    create_assignment_service,
    get_all_assignments_service,
    get_assignment_by_id_service,
    update_assignment_service,
    delete_assignment_service,
    get_course_assignments_service
)

router = APIRouter(
    prefix="/assignments",
    tags=["Assignment Module"]
)


@router.post("/")
async def add_assignment(assignment: AssignmentCreate):

    success, message = await create_assignment_service(assignment)

    if not success:
        raise HTTPException(status_code=400, detail=message)

    return {
        "success": True,
        "message": message
    }


@router.get("/")
async def get_all_assignments():

    return await get_all_assignments_service()


@router.get("/{id}")
async def get_assignment(id: str):

    assignment = await get_assignment_by_id_service(id)

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    return assignment


@router.put("/{id}")
async def update_assignment(
    id: str,
    assignment: AssignmentUpdate
):

    updated = await update_assignment_service(id, assignment)

    if not updated:
        raise HTTPException(status_code=404, detail="Assignment not found")

    return {
        "success": True,
        "message": "Assignment updated successfully"
    }


@router.delete("/{id}")
async def delete_assignment(id: str):

    deleted = await delete_assignment_service(id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Assignment not found")

    return {
        "success": True,
        "message": "Assignment deleted successfully"
    }


@router.get("/course/{course_id}")
async def get_course_assignments(course_id: str):

    return await get_course_assignments_service(course_id)