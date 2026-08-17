from app.database.database import (
    attendance_collection,
    assignment_collection,
    result_collection,
    course_collection
)


async def get_recommendation_service(student_id: str):

    weak_topics = []
    strong_topics = []
    recommended_courses = []
    recommended_actions = []

    attendance = attendance_collection.find_one({"student_id": student_id})

    if attendance:

        percentage = attendance.get("attendance_percentage", 0)

        if percentage < 75:
            recommended_actions.append(
                "Improve your attendance to at least 75%."
            )

    assignments = list(
        assignment_collection.find({"student_id": student_id})
    )

    if len(assignments) < 3:

        recommended_actions.append(
            "Complete pending assignments."
        )

    results = list(
        result_collection.find({"student_id": student_id})
    )

    for result in results:

        if result.get("marks", 0) < 40:
            weak_topics.append(result.get("subject"))

        else:
            strong_topics.append(result.get("subject"))

    courses = list(course_collection.find().limit(3))

    for course in courses:

        recommended_courses.append(course["course_name"])

    return {

        "student_id": student_id,

        "weak_topics": weak_topics,

        "strong_topics": strong_topics,

        "recommended_courses": recommended_courses,

        "recommended_actions": recommended_actions

    }