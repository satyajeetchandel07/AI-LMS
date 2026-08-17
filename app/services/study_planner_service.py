from datetime import datetime
import json

from app.database.database import study_planner_collection
from app.models.study_planner_model import study_planner_model
from app.utils.services.huggingface_service import (
    generate_with_huggingface  
)
from app.utils.services.gemini_service import (    #change 267 line
    generate_with_gemini
)


async def generate_study_plan_service(
    data,
    current_user
):

    # ==========================================
    # GET LOGGED-IN STUDENT EMAIL FROM JWT
    # ==========================================

    student_email = current_user["email"]

    # ==========================================
    # CURRENT DATE
    # ==========================================

    today = datetime.utcnow().date()

    # ==========================================
    # VALIDATE EXAM DATE
    # ==========================================

    try:

        exam_date = datetime.strptime(
            data.exam_date,
            "%Y-%m-%d"
        ).date()

    except ValueError:

        return {
            "success": False,
            "message": "Invalid exam date. Use YYYY-MM-DD.",
            "data": {}
        }

    # ==========================================
    # CHECK EXAM DATE
    # ==========================================

    if exam_date < today:

        return {
            "success": False,
            "message": "Exam date has already passed.",
            "data": {}
        }

    # ==========================================
    # CALCULATE REMAINING DAYS
    # ==========================================

    days_remaining = (
        exam_date - today
    ).days

    total_available_days = days_remaining

    # Maximum 7 days
    schedule_days = min(
        total_available_days,
        7
    )

    # ==========================================
    # STUDY PLANNER PROMPT
    # ==========================================

    prompt = f"""
You are an expert university study planner and academic advisor.

Create a realistic, practical, and exam-focused study schedule for a university student.

STUDENT INFORMATION:
Student Email: {student_email}
Subject: {data.subject}
Today's Date: {today.isoformat()}
Exam Date: {data.exam_date}
Days Remaining: {days_remaining}
Available Study Hours Per Day: {data.daily_study_hours}
Number of Days To Generate: {schedule_days}

STRATEGY BASED ON DAYS REMAINING:
- If days_remaining = 0: Use "Last-Minute Survival Mode". Focus only on the top 3-5 essential topics and create exactly 3 blocks of 4 hours each (Morning, Afternoon, Evening). Prioritize revision over new learning and use an urgent, motivational tone.
- If days_remaining = 1: Use "High-Yield Sprint". Cover the most important 60-70% of the syllabus, with 6 hours for high-yield topics and 4 hours for revision plus one full practice paper. Skip low-priority topics.
- If days_remaining = 2: Use "Balanced Coverage". Cover 70-80% of core topics, using Day 1 for important new topics and Day 2 for revision, mock tests, and doubts.
- If days_remaining = 3-5: Use "Comprehensive Prep". Systematically cover the full syllabus and include one full mock-test day with error analysis and daily revision.
- If days_remaining >= 6: Use "Spaced Repetition & Deep Dive". Cover the full syllabus with review cycles, breaks, light-study periods, and extra focus on weak areas. Prioritize consistency over cramming.

IMPORTANT DATE RULES:
1. The exam date is {data.exam_date}.
2. Never create a schedule after the exam date.
3. Today's date is {today.isoformat()}.
4. Every generated schedule date must be between today's date and the exam date.
5. If more than 7 days remain before the exam, generate ONLY the next 7 days.
6. If 7 or fewer days remain, generate only the remaining days.
7. Do not generate unnecessary days.
8. The schedule MUST contain exactly {schedule_days} hours or days .

Generate the schedule according to the applicable strategy while strictly following all date rules.
 

STUDY HOURS ANALYSIS:

The student currently has:

{data.daily_study_hours} hours per day.

Analyze whether this amount of time is sufficient.

If insufficient:

- Recommend a realistic increase.
- Explain why additional study time would help.
- Do not force the student to increase their hours.
- Clearly mention the recommended number of hours.

If sufficient:

- Keep the student's current study hours.
- Do not unnecessarily recommend additional hours.

STUDY PLAN:

Create a balanced study plan containing:

1. Learning new concepts
2. Difficult topics
3. Important topics
4. Practice questions
5. Problem solving
6. Revision
7. Active recall
8. Self testing

Prioritize difficult and important topics.

As the exam gets closer, gradually shift toward:

- Revision
- Practice
- Mock tests
- Active recall
- Weak areas

Do not create an unrealistic workload.

The student must realistically be able to
complete the schedule within their available
daily study hours.

ONE-WEEK SYSTEM:

This is a one-week planning system.

If the exam is more than one week away,
tell the student that this schedule covers
the current week and that another schedule
can be generated later.

Do NOT generate the entire preparation period.

The student should also be informed that they
can use the separate AI Chat option for:

- Further planning
- Questions
- Modifications
- Additional schedule generation

Do NOT implement the chat functionality here.

RETURN FORMAT:

Return ONLY valid JSON.

Do NOT return Markdown.

Do NOT use ```json.

Do NOT add explanations outside JSON.

Use exactly this structure:

{{
    "subject": "{data.subject}",

    "exam_date": "{data.exam_date}",

    "days_remaining": {days_remaining},

    "schedule_days": {schedule_days},

    "hours_analysis": {{
        "provided_daily_hours": {data.daily_study_hours},
        "hours_sufficient": true,
        "recommended_daily_hours": 0,
        "recommendation": ""
    }},

    "weekly_goal": "",

    "plan": [
        {{
            "day": 1,
            "date": "",
            "focus": "",
            "topics": [],
            "study_hours": 0,
            "activities": [],
            "revision": "",
            "practice": ""
        }}
    ],

    "student_message": ""
}}

IMPORTANT:

The "plan" array MUST contain exactly
{schedule_days} objects.

Every date must be valid.

Every date must be before or equal to
the exam date.

study_hours should normally not exceed
the student's available daily study hours.

Recommend additional hours only when
the current hours are insufficient.

hours_sufficient must be true when the
current hours are sufficient and false
when they are insufficient.

Make the schedule specific to the subject.

Do not unnecessarily repeat the same topic.

The plan should progressively move through:

Learning → Practice → Revision → Testing
"""

    # ==========================================
    # CALL GEMINI
    # ==========================================

    try:

        response = generate_with_huggingface(
            prompt
        )

        result = json.loads(response)

    except json.JSONDecodeError:

        return {
            "success": False,
            "message": "AI returned invalid JSON.",
            "data": {}
        }

    except Exception as error:

        print(
            "Study Planner AI Error:",
            error
        )

        return {
            "success": False,
            "message": "Unable to generate study plan.",
            "data": {}
        }

    # ==========================================
    # DELETE PREVIOUS PLAN
    # ==========================================

    await study_planner_collection.delete_many(
        {
            "student_email": student_email
        }
    )

    # ==========================================
    # CREATE MONGODB DOCUMENT
    # ==========================================

    document = study_planner_model({

        "student_email": student_email,

        "subject": data.subject,

        "exam_date": data.exam_date,

        "daily_study_hours":
            data.daily_study_hours,

        "days_generated":
            schedule_days,

        "plan":
            result
    })

    # ==========================================
    # SAVE NEW PLAN
    # ==========================================

    await study_planner_collection.insert_one(
        document
    )

    # ==========================================
    # RETURN JSON
    # ==========================================

    return {
        "success": True,
        "message": "Study Plan Generated Successfully.",
        "data": result
    }


# =====================================================
# GET LATEST STUDY PLAN
# =====================================================

async def get_latest_study_plan_service(
    current_user
):

    # ==========================================
    # GET EMAIL FROM VERIFIED JWT
    # ==========================================

    student_email = current_user["email"]

    # ==========================================
    # FIND LATEST PLAN
    # ==========================================

    schedule = await study_planner_collection.find_one(
        {
            "student_email": student_email
        },
        sort=[
            ("created_at", -1)
        ]
    )

    # ==========================================
    # NO PLAN
    # ==========================================

    if not schedule:

        return {
            "success": False,
            "message": "No study plan found.",
            "data": None
        }

    # ==========================================
    # CONVERT OBJECT ID
    # ==========================================

    schedule["_id"] = str(
        schedule["_id"]
    )

    # ==========================================
    # RETURN
    # ==========================================

    return {
        "success": True,
        "message": "Latest study plan fetched successfully.",
        "data": schedule
    }