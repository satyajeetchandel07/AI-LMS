import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FactCheckIcon from "@mui/icons-material/FactCheck";

import AdminLayout from "../../layouts/AdminLayout";
import AdminStatCard from "../../components/admin/AdminStatCard";

import { getAdminDashboard } from "../../services/adminService";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getAdminDashboard();

        setData(response);
      } catch (err) {
        console.error(
          "Admin Dashboard Error:",
          err
        );

        setError(
          err.response?.data?.detail ||
            "Unable to load admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "#0056D2",
            }}
          />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}

      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{
            color: "#F8FAFC",
            fontWeight: 700,
          }}
        >
          Admin Dashboard
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mt: 1,
          }}
        >
          Manage your AI-LMS platform
          from one place.
        </Typography>
      </Box>

      {/* Error */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Statistics */}

      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Students"
            value={data?.students ?? 0}
            subtitle="Registered Students"
            color="#0056D2"
            icon={
              <PeopleIcon
                sx={{
                  color: "#0056D2",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Instructors"
            value={data?.instructors ?? 0}
            subtitle="Teaching Staff"
            color="#34D399"
            icon={
              <PersonIcon
                sx={{
                  color: "#34D399",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Courses"
            value={data?.courses ?? 0}
            subtitle="Available Courses"
            color="#6F42C1"
            icon={
              <SchoolIcon
                sx={{
                  color: "#6F42C1",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Assignments"
            value={data?.assignments ?? 0}
            subtitle="Total Assignments"
            color="#FF69B4"
            icon={
              <AssignmentIcon
                sx={{
                  color: "#FF69B4",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Lectures"
            value={data?.lectures ?? 0}
            subtitle="Uploaded Lectures"
            color="#0056D2"
            icon={
              <VideoLibraryIcon
                sx={{
                  color: "#0056D2",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Tests"
            value={data?.tests ?? 0}
            subtitle="Tests & Quizzes"
            color="#6F42C1"
            icon={
              <QuizIcon
                sx={{
                  color: "#6F42C1",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Submissions"
            value={data?.submissions ?? 0}
            subtitle="Student Submissions"
            color="#34D399"
            icon={
              <UploadFileIcon
                sx={{
                  color: "#34D399",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <AdminStatCard
            title="Attendance"
            value={
              data?.attendance_records ?? 0
            }
            subtitle="Attendance Records"
            color="#FF69B4"
            icon={
              <FactCheckIcon
                sx={{
                  color: "#FF69B4",
                  fontSize: 30,
                }}
              />
            }
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}