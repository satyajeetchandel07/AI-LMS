from datetime import datetime


def create_submission(submission):

    return {
        "assignment_id": submission.assignment_id,
        "student_email": submission.student_email,
        "submission_url": submission.submission_url,
        "status": "Submitted",
        "marks": 0,
        "feedback": "",
        "submitted_at": datetime.utcnow()
    }