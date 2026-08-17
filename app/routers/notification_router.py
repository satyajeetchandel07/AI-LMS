from fastapi import APIRouter, HTTPException

from app.schemas.notification_schema import NotificationCreate

from app.services.notification_service import (
    create_notification_service,
    get_notifications_service,
    mark_as_read_service,
    delete_notification_service
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notification Module"]
)


@router.post("/")
async def send_notification(notification: NotificationCreate):

    success, message = await create_notification_service(notification)

    if not success:
        raise HTTPException(status_code=400, detail=message)

    return {
        "success": True,
        "message": message
    }


@router.get("/{email}")
async def get_notifications(email: str):

    return await get_notifications_service(email)


@router.put("/read/{id}")
async def mark_as_read(id: str):

    updated = await mark_as_read_service(id)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return {
        "success": True,
        "message": "Notification marked as read"
    }


@router.delete("/{id}")
async def delete_notification(id: str):

    deleted = await delete_notification_service(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return {
        "success": True,
        "message": "Notification deleted successfully"
    }