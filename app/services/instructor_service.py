from bson import ObjectId
from app.database.database import instructor_collection
from app.models.instructor_model import create_instructor


async def create_instructor_service(instructor):

    existing = await instructor_collection.find_one(
        {"email": instructor.email}
    )

    if existing:
        return False, "Instructor already exists"

    data = create_instructor(instructor)

    await instructor_collection.insert_one(data)

    return True, "Instructor added successfully"


async def get_all_instructors_service():

    instructors = []

    async for instructor in instructor_collection.find():

        instructor["_id"] = str(instructor["_id"])

        instructors.append(instructor)

    return instructors


async def get_instructor_by_id_service(id):

    instructor = await instructor_collection.find_one(
        {"_id": ObjectId(id)}
    )

    if not instructor:
        return None

    instructor["_id"] = str(instructor["_id"])

    return instructor


async def update_instructor_service(id, instructor):

    result = await instructor_collection.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": instructor.dict()
        }
    )

    return result.modified_count


async def delete_instructor_service(id):

    result = await instructor_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    return result.deleted_count