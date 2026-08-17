// import { useState } from "react";
// import Login from "./pages/auth/Login";
// import Dashboard from "./pages/student/Dashboard";

// function App() {
//   const [loggedIn] = useState(false);

//   return loggedIn ? <Dashboard /> : <Login />;
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminCourses from "./pages/admin/Courses";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/student/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Assignments from "./pages/admin/Assignments";
import StudentAssignments from "./pages/student/Assignments";
import EmailVerified from "./pages/auth/EmailVerified";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentSubmissions from "./pages/student/Submissions";
import Attendance from "./pages/student/Attendance";
import AIQuiz from "./pages/student/AIQuiz";
import ResumeAnalyzer from "./pages/student/ResumeAnalyzer";
import StudyPlanner from "./pages/student/StudyPlanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/assignments" element=  
        {<ProtectedRoute><StudentAssignments /></ProtectedRoute>} />
        <Route path="/student/assignments" element={<StudentAssignments />}/>   
        <Route path="/student/submissions" element={<StudentSubmissions />}/>      
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/student/attendance" element={<Attendance />} />
        <Route path="/student/ai-quiz" element={<AIQuiz />} />
        <Route path="/student/resume-analyzer" element={<ResumeAnalyzer />}/>
        <Route path="/student/study-planner" element={<StudyPlanner />} />
        <Route path="/student/ai-quiz-window" element={<AIQuiz />}/>
  
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/email-verified" element={<EmailVerified />} /> 
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/assignments" element={<Assignments />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;