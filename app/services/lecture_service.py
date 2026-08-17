from bson import ObjectId

from app.database.database import lecture_collection
from app.models.lecture_model import create_lecture


async def create_lecture_service(lecture):

    data = create_lecture(lecture)

    await lecture_collection.insert_one(data)

    return True, "Lecture created successfully"


async def get_all_lectures_service():

    lectures = []

    async for lecture in lecture_collection.find():

        lecture["_id"] = str(lecture["_id"])

        lectures.append(lecture)

    return lectures


async def get_lecture_by_id_service(id):

    lecture = await lecture_collection.find_one(
        {
            "_id": ObjectId(id)
        }
    )

    if not lecture:
        return None

    lecture["_id"] = str(lecture["_id"])

    return lecture


async def update_lecture_service(id, lecture):

    result = await lecture_collection.update_one(
        {
            "_id": ObjectId(id)
        },
        {
            "$set": lecture.dict()
        }
    )

    return result.modified_count


async def delete_lecture_service(id):

    result = await lecture_collection.delete_one(
        {
            "_id": ObjectId(id)
        }
    )

    return result.deleted_count


async def get_course_lectures_service(course_id):

    lectures = []

    async for lecture in lecture_collection.find(
        {
            "course_id": course_id
        }
    ):

        lecture["_id"] = str(lecture["_id"])

        lectures.append(lecture)

    return lectures