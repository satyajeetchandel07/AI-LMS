from datetime import datetime


def create_enrollment(enrollment):
    return {
        "student_email": enrollment.student_email,
        "course_code": enrollment.course_code,
        "status": "Enrolled",
        "progress": 0,
        "completed": False,
        "certificate_generated": False,
        "enrolled_at": datetime.utcnow()
    }