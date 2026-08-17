from bson import ObjectId

from app.database.database import announcement_collection
from app.models.announcement_model import create_announcement


async def create_announcement_service(announcement):

    data = create_announcement(announcement)

    await announcement_collection.insert_one(data)

    return True, "Announcement created successfully"


async def get_all_announcements_service():

    announcements = []

    async for announcement in announcement_collection.find():

        announcement["_id"] = str(announcement["_id"])

        announcements.append(announcement)

    return announcements


async def get_announcement_by_id_service(id):

    announcement = await announcement_collection.find_one(
        {"_id": ObjectId(id)}
    )

    if not announcement:
        return None

    announcement["_id"] = str(announcement["_id"])

    return announcement


async def update_announcement_service(id, announcement):

    result = await announcement_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": announcement.dict()}
    )

    return result.modified_count


async def delete_announcement_service(id):

    result = await announcement_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    return result.deleted_count