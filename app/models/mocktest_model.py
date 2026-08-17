from datetime import datetime


def create_mock_test(test):

    return {

        "course_code": test.course_code,
        "test_name": test.test_name,
        "duration": test.duration,
        "total_marks": test.total_marks,
        "created_at": datetime.utcnow()

    }