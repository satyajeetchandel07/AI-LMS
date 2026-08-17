from datetime import datetime


def create_lecture(lecture):

    return {
        "course_id": lecture.course_id,
        "instructor_email": lecture.instructor_email,
        "title": lecture.title,
        "description": lecture.description,
        "video_url": lecture.video_url,
        "pdf_url": lecture.pdf_url,
        "duration": lecture.duration,
        "created_at": datetime.utcnow()
    }