from datetime import datetime


def create_user(user, hashed_password):
    return {
        "full_name": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "password": hashed_password,
        "role": "student",
        "is_verified": False,
        "created_at": datetime.utcnow()
    }