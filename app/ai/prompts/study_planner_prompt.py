def study_planner_prompt(subject, exam_date, daily_hours):

    return f"""
You are an expert study planner.

Create a study plan.

Subject:
{subject}

Exam Date:
{exam_date}

Daily Study Hours:
{daily_hours}

Rules:

Return ONLY JSON.

Format:

{{
    "plan":[
        {{
            "day":"Day 1",
            "topics":[
                "",
                ""
            ]
        }}
    ]
}}
"""
