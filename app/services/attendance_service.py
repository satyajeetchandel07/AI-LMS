from bson import ObjectId

from app.database.database import attendance_collection
from app.models.attendance_model import create_attendance


async def create_attendance_service(attendance):

    data = create_attendance(attendance)

    await attendance_collection.insert_one(data)

    return True, "Attendance marked successfully"


async def get_all_attendance_service():

    attendance_list = []

    async for attendance in attendance_collection.find():

        attendance["_id"] = str(attendance["_id"])

        attendance_list.append(attendance)

    return attendance_list


async def get_attendance_by_id_service(id):

    attendance = await attendance_collection.find_one(
        {
            "_id": ObjectId(id)
        }
    )

    if not attendance:
        return None

    attendance["_id"] = str(attendance["_id"])

    return attendance


async def update_attendance_service(id, attendance):

    result = await attendance_collection.update_one(
        {
            "_id": ObjectId(id)
        },
        {
            "$set": attendance.dict()
        }
    )

    return result.modified_count


async def delete_attendance_service(id):

    result = await attendance_collection.delete_one(
        {
            "_id": ObjectId(id)
        }
    )

    return result.deleted_count


async def get_student_attendance_service(student_email):

    attendance_list = []

    async for attendance in attendance_collection.find(
        {
            "student_email": student_email
        }
    ):

        attendance["_id"] = str(attendance["_id"])

        attendance_list.append(attendance)

    return attendance_list


async def get_course_attendance_service(course_id):

    attendance_list = []

    async for attendance in attendance_collection.find(
        {
            "course_id": course_id
        }
    ):

        attendance["_id"] = str(attendance["_id"])

        attendance_list.append(attendance)

    return attendance_list