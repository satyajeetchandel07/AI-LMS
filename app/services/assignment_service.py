from bson import ObjectId

from app.database.database import assignment_collection
from app.models.assignment_model import create_assignment


async def create_assignment_service(assignment):

    data = create_assignment(assignment)

    await assignment_collection.insert_one(data)

    return True, "Assignment created successfully"


async def get_all_assignments_service():

    assignments = []

    async for assignment in assignment_collection.find():

        assignment["_id"] = str(assignment["_id"])

        assignments.append(assignment)

    return assignments


async def get_assignment_by_id_service(id):

    assignment = await assignment_collection.find_one(
        {
            "_id": ObjectId(id)
        }
    )

    if not assignment:
        return None

    assignment["_id"] = str(assignment["_id"])

    return assignment


async def update_assignment_service(id, assignment):

    result = await assignment_collection.update_one(
        {
            "_id": ObjectId(id)
        },
        {
            "$set": assignment.dict()
        }
    )

    return result.modified_count


async def delete_assignment_service(id):

    result = await assignment_collection.delete_one(
        {
            "_id": ObjectId(id)
        }
    )

    return result.deleted_count


async def get_course_assignments_service(course_id):

    assignments = []

    async for assignment in assignment_collection.find(
        {
            "course_id": course_id
        }
    ):

        assignment["_id"] = str(assignment["_id"])

        assignments.append(assignment)

    return assignments