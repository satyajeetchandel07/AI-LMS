from datetime import datetime


def create_assignment(assignment):

    return {
        "course_id": assignment.course_id,
        "instructor_email": assignment.instructor_email,
        "title": assignment.title,
        "description": assignment.description,
        "due_date": assignment.due_date,
        "total_marks": assignment.total_marks,
        "created_at": datetime.utcnow()
    }