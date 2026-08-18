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




## Study Planner Timeline

The dashboard includes a six-stage study planner timeline:

Schedule
   ↓
Hours Analysis
   ↓
Weekly Goal
   ↓
Plan
   ↓
Student Message
   ↓
Countdown

The timeline uses active and inactive states to visually represent the progress of the study schedule.

## Study Schedule Countdown

The dashboard includes a countdown based on the generated study schedule.

The countdown uses:

created_at
+
schedule_days

to determine the schedule's ending time.

The dashboard continuously updates the remaining time and calculates the overall schedule progress.


## AI Quiz 

#                          AI QUIZ
                            │
                            ▼
                    Accepts:
                    Topic
                    Number of Questions
                    Difficulty
                            │
                            ▼
              User clicks "Generate Quiz"
                            │
                            ▼
          New maximized window opens immediately
                            │
                            ▼
                Rocket animation starts
                            │
                            ▼
                   API request starts
                            │
                            ▼
          Rocket keeps flying while AI generates
                            │
                            ▼
                  API response arrives
                            │
                            ▼
             Rocket flies out vertically
                            │
                            ▼
                     MCQs appear
                            │
                            ▼
                 User selects answers
                            │
                            ▼
                        Submit
                            │
                            ▼
                 Correct Answer = Green
                            │
                            ▼
               Wrong Selected Answer = Red
                            │
                            ▼
       Marks generated based on number of questions


## AI Features

AI-LMS uses AI services for intelligent learning features such as:

- AI Study Planner
- AI Quiz Generation
- AI Interview
- Personalized learning assistance
- Learning recommendations

AI APIs used during development include:

Google Gemini / Google GenAI
Groq API

 ## Backend

The backend is developed using FastAPI.

The backend is responsible for:

- Authentication
- Student data
- Study planner generation
- Quiz generation
- Database operations
- API endpoints
- AI service integration
- Data retrieval and persistence

## Backend Organization

backend/
│
├── routers/
│
├── schemas/
│
├── models/
│
├── services/
│
├── uploads/
│
└── ...


## Database

AI-LMS uses MongoDB Atlas for persistent data storage.

MongoDB stores information such as:

- Student information
- Authentication-related data
- Generated study plans
- Study schedule information
- AI-generated content
- Other application data

The Study Planner stores information including:

- student_email
- daily_study_hours
- days_generated
- expires_at
- created_at
- plan

 ## API Communication

The React frontend communicates with the FastAPI backend through APIs.

Axios is used for HTTP requests.

Frontend service modules are used to keep API logic separate from UI components.

Examples:

- studyPlannerService
- aiQuizService

This structure makes the frontend easier to maintain and allows individual features to communicate with their corresponding backend APIs.

## Authentication

The application includes authentication functionality to manage student access and protected application features.

Authenticated users can access student-specific functionality such as:

- Dashboard
- Study Planner
- AI Quiz
- Academic information
- AI learning tools

## Tech Stack

- FastAPI
- MongoDB
- JWT
- React
- Axios
- CORS 
- Groq
- Ollama
- Gemini
- OpenAI
- HuggingFace
- Rag
- LSTM
- ReLU


## Python / ML

- Flask
- pandas
- scikit-learn
- Logistic Regression
- TF-IDF
- TfidfVectorizer
- joblib
- .pkl model files

 
 ## Frontend — React

Your frontend is built with:

- React
- Vite
- Material UI (MUI)
- React Router
- Axios
- Framer Motion for animations
- JSX
- CSS through MUI sx
- Responsive breakpoints such as xs, sm, md, lg
- Cards
- Grid
- Tooltips
- Radio buttons
- Alerts
- Progress indicators
- Icons
- Animations

## Run (on Local System)  
.\venv\Scripts\activate
uvicorn app.main:app --reload



## AI-LMS stack currently looks like this:

                    AI-LMS
                       │
          ┌────────────┴────────────┐
          │                         │
       Frontend                  Backend
          │                         │
        React                    FastAPI
        Vite                       │
        MUI                        │
        Axios                      │
        Router                     │
          │                        │
          └──────────┬─────────────┘
                     │
                 MongoDB Atlas
                     │
             ┌───────┴────────┐
             │                │
          AI Services       Data
             │
       Gemini / Groq...
             │
     ┌───────┼────────┐
     │       │        │
   Quiz   Planner   Interview


   

## Deployment

started moving the project from local development toward deployment:

                    ┌─────────────────┐
                    │    GitHub       │
                    │ Source Code     │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              ↓                             ↓
     ┌─────────────────┐          ┌─────────────────┐
     │    Render       │          │     Vercel      │
     │   FastAPI       │          │  React Frontend │
     └────────┬────────┘          └────────┬────────┘
              │                            │
              │                            │ Axios
              │                            ↓
              │                  ┌─────────────────┐
              └─────────────────→│   Live API      │
                                 │ ai-lms-lrbz...   │
                                 └────────┬────────┘
                                          │
                                          ↓
                                 ┌─────────────────┐
                                 │  MongoDB Atlas   │
                                 │    Database      │
                                 └─────────────────┘

                    CORS allows:
        Vercel Frontend → Render FastAPI



##  Application Flow

Student
   │
   ▼
React Frontend (Vercel)
   │
   ▼
Axios API Requests
   │
   ▼
FastAPI Backend (Render)
   │
   ├──────────────► MongoDB Atlas
   │                    │
   │                    ▼
   │                Stored Data
   │
   └──────────────► AI Service
                         │
                         ▼
                     AI Response
                         │
                         ▼
                  FastAPI Backend
                         │
                         ▼
                  React Frontend
                         │
                         ▼
                       Student



 ## Major AI-LMS Modules


                         Student Dashboard
                                │
        ┌───────────────────────┼────────────────────────┐
        │                       │                        │
        ▼                       ▼                        ▼
 ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
 │ Study Planner │       │    AI Quiz    │       │ AI Interview  │
 └───────┬───────┘       └───────┬───────┘       └───────────────┘
         │                       │
    ┌────┼────┬────┬────┐   ┌────┼────┬────┬────┐
    ▼    ▼    ▼    ▼    ▼   ▼    ▼    ▼    ▼    ▼
 Schedule Hours Weekly Daily Student Countdown
          Analysis Goal  Plan  Message
                             
                          AI Quiz
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
      Quiz Generation   MCQ Selection    Submit
                                             │
                                             ▼
                                      Answer Checking
                                             │
                                             ▼
                                      Result Highlighting


                         Student Dashboard
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
        ┌──────────┐       ┌────────────┐     ┌──────────┐
        │ Courses  │       │Assignments │     │Attendance│
        └──────────┘       └────────────┘     └──────────┘
                                                   
                                │
                                ▼
                          ┌──────────┐
                          │ Results  │
                          └──────────┘


## Project Goal

The main goal of AI-LMS is to combine traditional Learning Management System functionality with artificial intelligence to provide students with a more personalized and interactive learning environment.

The system aims to help students:

- Plan their studies
- Track academic progress
- Generate practice questions
- Prepare for interviews
- Monitor schedules
- Receive AI-powered learning assistance
- Improve their overall learning experience

## Future Improvements

Possible future improvements include:

- More advanced AI recommendations
- Student performance analytics
- Personalized difficulty adjustment
- AI-generated assignments
- AI-based interview evaluation
- Learning streaks and achievements
- More detailed progress analytics
- Notifications and reminders
- Improved calendar integration
- Advanced instructor functionality
- More comprehensive deployment and monitoring

 ## Development Status

AI-LMS is currently under active development, with the student dashboard, AI Study Planner, AI Quiz, backend APIs, database integration, and deployment architecture being developed incrementally.
   
