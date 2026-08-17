from datetime import datetime


def create_attendance(attendance):

    return {
        "student_email": attendance.student_email,
        "course_id": attendance.course_id,
        "lecture_id": attendance.lecture_id,
        "date": attendance.date,
        "status": attendance.status,
        "created_at": datetime.utcnow()
    }