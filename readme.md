# AI-LMS

## Features

- Authentication
- Student Management
- Instructor Management
- Course Management
- Lecture Upload
- Assignment
- Submission
- Attendance
- Result
- Dashboard
- Notification
- Certificate
- AI Quiz
- AI Interview
- Resume Analyzer
- Study Planner
- Recommendation Engine
- Analytics

## Study Planner 

   #                 STUDY PLANNER
                         │
                         ▼
              Student enters details
                         │
                         ▼
              /study-planner/generate
                         │
                         ▼
                 FastAPI Router
                         │
                         ▼
                 Planner Service
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Date calculation       AI Prompt
                                    │
                                    ▼
                                AI Model
                                    │
                                    ▼
                              JSON response
                                    │
                                    ▼
                            MongoDB validation
                                    │
                                    ▼
                         Delete old student plan
                                    │
                                    ▼
                          Save new plan + TTL
                                    │
                                    ▼
                              React UI

## Tech Stack

- FastAPI
- MongoDB
- JWT
- Groq
- Ollama
- Gemini
- OpenAI
- HuggingFace

## Run
.\venv\Scripts\activate
uvicorn app.main:app --reload