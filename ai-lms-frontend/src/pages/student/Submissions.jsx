import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import LinkIcon from "@mui/icons-material/Link";

import StudentLayout from "../../layouts/StudentLayout";

import {
  getStudentSubmissions,
} from "../../services/submissionService";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
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
        await getStudentSubmissions(studentEmail);

      console.log(
        "Student submissions:",
        response
      );

      if (Array.isArray(response)) {
        setSubmissions(response);
      } else if (response?.submissions) {
        setSubmissions(response.submissions);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      console.error(
        "Submission Loading Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to load submissions. Backend may be unavailable."
      );

      // Important:
      // Keep frontend running even if backend is down.
      setSubmissions([]);
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
          My Submissions
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mb: 4,
          }}
        >
          View the assignments you have submitted.
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
        ) : submissions.length === 0 ? (
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
              <UploadFileIcon
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
                No submissions yet
              </Typography>

              <Typography
                sx={{
                  color: "#94A3B8",
                  mt: 1,
                }}
              >
                Your submitted assignments
                will appear here.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 3,
            }}
          >
            {submissions.map((submission) => {
              const id =
                submission._id ||
                submission.id;

              const isUrl =
                Boolean(
                  submission.submission_url
                );

              return (
                <Card
                  key={id}
                  sx={{
                    backgroundColor:
                      "#1E293B",
                    border:
                      "1px solid #334155",
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      {isUrl ? (
                        <LinkIcon
                          sx={{
                            fontSize: 40,
                            color: "#0056D2",
                          }}
                        />
                      ) : (
                        <UploadFileIcon
                          sx={{
                            fontSize: 40,
                            color: "#34D399",
                          }}
                        />
                      )}

                      <Chip
                        label={
                          isUrl
                            ? "URL"
                            : "FILE"
                        }
                        size="small"
                        sx={{
                          color: "#F8FAFC",
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        color: "#F8FAFC",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Assignment
                    </Typography>

                    <Typography
                      sx={{
                        color: "#94A3B8",
                        mt: 1,
                      }}
                    >
                      Assignment ID:{" "}
                      {submission.assignment_id}
                    </Typography>

                    {isUrl && (
                      <Button
                        variant="outlined"
                        startIcon={
                          <LinkIcon />
                        }
                        href={
                          submission.submission_url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          mt: 3,
                        }}
                      >
                        Open Submission
                      </Button>
                    )}

                    {!isUrl &&
                      submission.file_name && (
                        <Typography
                          sx={{
                            color:
                              "#94A3B8",
                            mt: 2,
                          }}
                        >
                          File:{" "}
                          {
                            submission.file_name
                          }
                        </Typography>
                      )}
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </StudentLayout>
  );
}