from app.database.database import mocktest_collection
from app.models.mocktest_model import create_mock_test


# -----------------------------
# Create Mock Test
# -----------------------------
async def create_mocktest_service(test):

    existing = await mocktest_collection.find_one(
        {"test_name": test.test_name}
    )

    if existing:
        return False, "Mock Test already exists"

    data = create_mock_test(test)

    await mocktest_collection.insert_one(data)

    return True, "Mock Test created successfully"


# -----------------------------
# Get All Mock Tests
# -----------------------------
async def get_all_mocktests_service():

    tests = []

    async for test in mocktest_collection.find():

        test["_id"] = str(test["_id"])

        tests.append(test)

    return tests


# -----------------------------
# Get Mock Test By Name
# -----------------------------
async def get_mocktest_service(test_name):

    test = await mocktest_collection.find_one(
        {"test_name": test_name}
    )

    if test:
        test["_id"] = str(test["_id"])

    return test


# -----------------------------
# Delete Mock Test
# -----------------------------
async def delete_mocktest_service(test_name):

    result = await mocktest_collection.delete_one(
        {"test_name": test_name}
    )

    return result.deleted_count