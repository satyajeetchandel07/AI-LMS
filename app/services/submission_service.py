from bson import ObjectId

from app.database.database import submission_collection
from app.models.submission_model import create_submission


# ==========================================
# CREATE URL SUBMISSION
# ==========================================

async def create_submission_service(submission):

    data = create_submission(submission)

    # Mark submission type
    data["submission_type"] = "url"

    await submission_collection.insert_one(data)

    return True, "Assignment submitted successfully"


# ==========================================
# CREATE FILE SUBMISSION
# ==========================================

async def create_file_submission_service(
    assignment_id,
    student_email,
    original_filename,
    file_path
):

    data = {
        "assignment_id": assignment_id,
        "student_email": student_email,

        "submission_type": "file",

        "submission_url": None,

        "file_name": original_filename,

        "file_path": file_path
    }

    await submission_collection.insert_one(data)

    return True, "Assignment submitted successfully"


# ==========================================
# GET ALL SUBMISSIONS
# ==========================================

async def get_all_submissions_service():

    submissions = []

    async for submission in submission_collection.find():

        submission["_id"] = str(
            submission["_id"]
        )

        submissions.append(submission)

    return submissions


# ==========================================
# GET SUBMISSION BY ID
# ==========================================

async def get_submission_by_id_service(id):

    try:
        object_id = ObjectId(id)
    except Exception:
        return None

    submission = await submission_collection.find_one(
        {
            "_id": object_id
        }
    )

    if not submission:
        return None

    submission["_id"] = str(
        submission["_id"]
    )

    return submission


# ==========================================
# UPDATE SUBMISSION
# ==========================================

async def update_submission_service(
    id,
    submission
):

    try:
        object_id = ObjectId(id)
    except Exception:
        return False

    update_data = submission.dict(
        exclude_unset=True
    )

    result = await submission_collection.update_one(
        {
            "_id": object_id
        },
        {
            "$set": update_data
        }
    )

    return result.modified_count > 0


# ==========================================
# DELETE SUBMISSION
# ==========================================

async def delete_submission_service(id):

    try:
        object_id = ObjectId(id)
    except Exception:
        return False

    result = await submission_collection.delete_one(
        {
            "_id": object_id
        }
    )

    return result.deleted_count > 0


# ==========================================
# GET STUDENT SUBMISSIONS
# ==========================================

async def get_student_submissions_service(
    student_email
):

    submissions = []

    async for submission in submission_collection.find(
        {
            "student_email": student_email
        }
    ):

        submission["_id"] = str(
            submission["_id"]
        )

        submissions.append(submission)

    return submissions