from datetime import datetime, timedelta
from bson import ObjectId


def study_planner_model(data):

    created_at = datetime.utcnow()

    return {
        "_id": ObjectId(),

        # Logged-in student's email
        "student_email": data.get(
            "student_email"
        ),

        "subject": data.get(
            "subject"
        ),

        "exam_date": data.get(
            "exam_date"
        ),

        "daily_study_hours": data.get(
            "daily_study_hours"
        ),

        "days_generated": data.get(
            "days_generated",
            7
        ),

        "plan": data.get(
            "plan",
            {}
        ),

        "created_at": created_at,

        # ==========================================
        # 7-DAY MONGODB TTL
        # ==========================================

        "expires_at": (
            created_at
            + timedelta(days=7)
        )
    }