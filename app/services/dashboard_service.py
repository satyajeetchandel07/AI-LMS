from app.database.database import (
    student_collection,
    instructor_collection,
    course_collection,
    enrollment_collection,
    lecture_collection,
    assignment_collection,
    submission_collection,
    attendance_collection,
    # test_collection

)


async def admin_dashboard_service():

    return {
        "students": await student_collection.count_documents({}),
        "instructors": await instructor_collection.count_documents({}),
        "courses": await course_collection.count_documents({}),
        "enrollments": await enrollment_collection.count_documents({}),
        "lectures": await lecture_collection.count_documents({}),
        "assignments": await assignment_collection.count_documents({}),
        "tests": await test_collection.count_documents({}),
        "submissions": await submission_collection.count_documents({}),
        "attendance_records": await attendance_collection.count_documents({})
    }


async def instructor_dashboard_service(email):

    return {
        "courses": await course_collection.count_documents(
            {
                "instructor_email": email
            }
        ),

        "lectures": await lecture_collection.count_documents(
            {
                "instructor_email": email
            }
        ),

        "assignments": await assignment_collection.count_documents(
            {
                "instructor_email": email
            }
        )
    }


async def student_dashboard_service(email):

    enrolled = await enrollment_collection.count_documents(
        {
            "student_email": email
        }
    )

    submissions = await submission_collection.count_documents(
        {
            "student_email": email
        }
    )

    attendance = await attendance_collection.count_documents(
        {
            "student_email": email,
            "status": "Present"
        }
    )

    total_attendance = await attendance_collection.count_documents(
        {
            "student_email": email
        }
    )

    percentage = 0

    if total_attendance > 0:
        percentage = round(
            (attendance / total_attendance) * 100,
            2
        )

    return {

        "enrolled_courses": enrolled,

        "submitted_assignments": submissions,

        "attendance_percentage": percentage

    }