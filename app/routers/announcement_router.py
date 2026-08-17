from fastapi import APIRouter, HTTPException

from app.schemas.announcement_schema import (
    AnnouncementCreate,
    AnnouncementUpdate
)

from app.services.announcement_service import (
    create_announcement_service,
    get_all_announcements_service,
    get_announcement_by_id_service,
    update_announcement_service,
    delete_announcement_service
)

router = APIRouter(
    prefix="/announcements",
    tags=["Announcement Module"]
)


@router.post("/")
async def add_announcement(announcement: AnnouncementCreate):

    success, message = await create_announcement_service(announcement)

    if not success:
        raise HTTPException(status_code=400, detail=message)

    return {
        "success": True,
        "message": message
    }


@router.get("/")
async def get_all_announcements():

    return await get_all_announcements_service()


@router.get("/{id}")
async def get_announcement(id: str):

    announcement = await get_announcement_by_id_service(id)

    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return announcement


@router.put("/{id}")
async def update_announcement(
    id: str,
    announcement: AnnouncementUpdate
):

    updated = await update_announcement_service(id, announcement)

    if not updated:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return {
        "success": True,
        "message": "Announcement updated successfully"
    }


@router.delete("/{id}")
async def delete_announcement(id: str):

    deleted = await delete_announcement_service(id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return {
        "success": True,
        "message": "Announcement deleted successfully"
    }