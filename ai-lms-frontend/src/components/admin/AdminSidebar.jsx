import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: <SchoolIcon />,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: <PeopleIcon />,
  },
  {
    label: "Instructors",
    path: "/admin/instructors",
    icon: <PersonIcon />,
  },
  {
    label: "Assignments",
    path: "/admin/assignments",
    icon: <AssignmentIcon />,
  },
  {
    label: "Lectures",
    path: "/admin/lectures",
    icon: <VideoLibraryIcon />,
  },
  {
    label: "Tests",
    path: "/admin/tests",
    icon: <QuizIcon />,
  },
  {
    label: "Attendance",
    path: "/admin/attendance",
    icon: <FactCheckIcon />,
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/");
  };

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#1E293B",
        borderRight: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}

      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            color: "#F8FAFC",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          AI-LMS
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: 13,
            mt: 0.5,
          }}
        >
          Admin Panel
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#334155" }} />

      {/* Navigation */}

      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const active =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: active
                  ? "#F8FAFC"
                  : "#94A3B8",

                backgroundColor: active
                  ? "#0056D2"
                  : "transparent",

                "&:hover": {
                  backgroundColor: active
                    ? "#0056D2"
                    : "#334155",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: active
                    ? "#F8FAFC"
                    : "#94A3B8",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Logout */}

      <Box sx={{ p: 1.5 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "#FF69B4",

            "&:hover": {
              backgroundColor: "#334155",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "#FF69B4",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}