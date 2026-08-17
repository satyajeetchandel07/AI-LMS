import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  LinearProgress,
} from "@mui/material";

import FactCheckIcon from "@mui/icons-material/FactCheck";

import StudentLayout from "../../layouts/StudentLayout";

import {
  getStudentAttendance,
} from "../../services/attendanceService";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const studentEmail =
        localStorage.getItem("email");

      if (!studentEmail) {
        setError(
          "Student email not found. Please login again."
        );

        setLoading(false);
        return;
      }

      const response =
        await getStudentAttendance(studentEmail);

      console.log(
        "Student Attendance:",
        response
      );

      if (Array.isArray(response)) {
        setAttendance(response);
      } else if (response?.attendance) {
        setAttendance(response.attendance);
      } else {
        setAttendance([]);
      }
    } catch (err) {
      console.error(
        "Attendance Loading Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to load attendance. Backend may be unavailable."
      );

      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: "#F8FAFC",
            mb: 1,
          }}
        >
          Attendance
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mb: 4,
          }}
        >
          View your attendance for all courses.
        </Typography>

        {error && (
          <Alert
            severity="warning"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        ) : attendance.length === 0 ? (
          <Card
            sx={{
              backgroundColor: "#1E293B",
              border: "1px solid #334155",
              borderRadius: 3,
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 7,
              }}
            >
              <FactCheckIcon
                sx={{
                  fontSize: 60,
                  color: "#64748B",
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  color: "#F8FAFC",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                No attendance records
              </Typography>

              <Typography
                sx={{
                  color: "#94A3B8",
                  mt: 1,
                }}
              >
                Your attendance will appear here.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {attendance.map((record) => {
              const id =
                record._id ||
                record.id ||
                record.course_id;

              const percentage =
                Number(
                  record.attendance_percentage ??
                    record.percentage ??
                    0
                );

              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor:
                        "#1E293B",
                      border:
                        "1px solid #334155",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent>
                      <FactCheckIcon
                        sx={{
                          fontSize: 42,
                          color: "#34D399",
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#F8FAFC",
                          fontSize: 20,
                          fontWeight: 700,
                          mt: 2,
                        }}
                      >
                        {record.course_name ||
                          record.course_id ||
                          "Course"}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#94A3B8",
                          mt: 2,
                        }}
                      >
                        Total Classes:{" "}
                        {record.total_classes ?? 0}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#34D399",
                          mt: 1,
                        }}
                      >
                        Present:{" "}
                        {record.present ?? 0}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#FF69B4",
                          mt: 1,
                        }}
                      >
                        Absent:{" "}
                        {record.absent ?? 0}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#F8FAFC",
                          fontSize: 18,
                          fontWeight: 600,
                          mt: 3,
                          mb: 1,
                        }}
                      >
                        Attendance:{" "}
                        {percentage}%
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={Math.min(
                          Math.max(
                            percentage,
                            0
                          ),
                          100
                        )}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          backgroundColor:
                            "#334155",
                          "& .MuiLinearProgress-bar":
                            {
                              backgroundColor:
                                percentage >=
                                75
                                  ? "#34D399"
                                  : "#FF69B4",
                            },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </StudentLayout>
  );
}