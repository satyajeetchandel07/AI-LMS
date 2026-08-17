import {
  Drawer,
  Toolbar,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import QuizIcon from "@mui/icons-material/Quiz";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RecommendIcon from "@mui/icons-material/Recommend";
import AssessmentIcon from "@mui/icons-material/Assessment";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#1E293B",
          borderRight: "1px solid #334155",
          color: "#F8FAFC",
        },
      }}
    >
      <Toolbar
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#0056D2",
        }}
      >
        🎓 AI-LMS
      </Toolbar>

      {/* ================= MAIN ================= */}

      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "#1E293B",
              color: "#94A3B8",
            }}
          >
            Main
          </ListSubheader>
        }
      >
        <ListItemButton
  onClick={() => navigate("/dashboard")}
>
        <ListItemIcon>
          <DashboardIcon sx={{ color: "#0056D2" }} />
         </ListItemIcon>

         <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>

      {/* ================= ACADEMIC ================= */}

      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "#1E293B",
              color: "#94A3B8",
            }}
          >
            Academic
          </ListSubheader>
        }
      >
        {[
  ["Courses", <MenuBookIcon />, "/student/courses"],
  ["Lectures", <OndemandVideoIcon />, "/student/lectures"],
  ["Assignments", <AssignmentIcon />, "/student/assignments"],
  ["Submissions", <UploadFileIcon />, "/student/submissions"],
  ["Attendance", <FactCheckIcon />, "/student/attendance"],
  ["Results", <EmojiEventsIcon />, "/student/results"],
].map(([title, icon, path]) => (
  <ListItemButton
    key={title}
    onClick={() => navigate(path)}
  >
    <ListItemIcon sx={{ color: "#00FFFF" }}>
      {icon}
    </ListItemIcon>

    <ListItemText primary={title} />
  </ListItemButton>
))}
      </List>
      

      {/* ================= AI TOOLS ================= */}

      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "#1E293B",
              color: "#94A3B8",
            }}
          >
            AI Tools
          </ListSubheader>
        }
      >
        {[
           ["AI Quiz", <QuizIcon />, "/student/ai-quiz"],
           ["AI Interview", <SmartToyIcon />, "/student/ai-interview"],
           ["Resume Analyzer", <DescriptionIcon />, "/student/resume-analyzer"],
           ["Study Planner", <CalendarMonthIcon />, "/student/study-planner"],
           ["Recommendation", <RecommendIcon />, "/student/recommendation"],
           ["Assessment", <AssessmentIcon />, "/student/assessment"],
         ].map(([title, icon, path]) => (
         <ListItemButton
           key={title}
           onClick={() => navigate(path)}
        >
           <ListItemIcon sx={{ color: "#6F42C1" }}>
              {icon}
           </ListItemIcon>
     
            <ListItemText primary={title} />
          </ListItemButton>
    ))}
      </List>

      {/* ================= ACCOUNT ================= */}

      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "#1E293B",
              color: "#94A3B8",
            }}
          >
            Account
          </ListSubheader>
        }
      >
        {[
          ["Certificates", <WorkspacePremiumIcon />],
          ["Notifications", <NotificationsIcon />],
          ["Profile", <PersonIcon />],
        ].map(([title, icon]) => (
          <ListItemButton key={title}>
            <ListItemIcon sx={{ color: "#34D399" }}>
              {icon}
            </ListItemIcon>

            <ListItemText primary={title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}