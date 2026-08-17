from bson import ObjectId

from app.database.database import notification_collection
from app.models.notification_model import create_notification


async def create_notification_service(notification):

    data = create_notification(notification)

    await notification_collection.insert_one(data)

    return True, "Notification sent successfully"


async def get_notifications_service(email):

    notifications = []

    async for notification in notification_collection.find(
        {"receiver_email": email}
    ).sort("created_at", -1):

        notification["_id"] = str(notification["_id"])

        notifications.append(notification)

    return notifications


async def mark_as_read_service(id):

    result = await notification_collection.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "is_read": True
            }
        }
    )

    return result.modified_count


async def delete_notification_service(id):

    result = await notification_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    return result.deleted_count