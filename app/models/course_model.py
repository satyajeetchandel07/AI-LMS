from datetime import datetime


def create_course(course):

    return {

        "course_name": course.course_name,
        "course_code": course.course_code,
        "description": course.description,
        "category": course.category,
        "instructor": course.instructor,
        "duration": course.duration,
        "level": course.level,
        "created_at": datetime.utcnow()

    }