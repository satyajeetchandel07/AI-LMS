import { useEffect, useState } from "react";
import {
  createSubmission,
  uploadSubmission,
} from "../../services/submissionService";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";

import StudentLayout from "../../layouts/StudentLayout";

import { getAllAssignments } from "../../services/assignmentService";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllAssignments();

      if (Array.isArray(response)) {
        setAssignments(response);
      } else if (response?.assignments) {
        setAssignments(response.assignments);
      } else {
        setAssignments([]);
      }
    } catch (err) {
      console.error("Assignment Loading Error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to load assignments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);
const [openSubmit, setOpenSubmit] =
  useState(false);

const [selectedAssignment, setSelectedAssignment] =
  useState(null);

const [submissionType, setSubmissionType] =
  useState("url");

const [submissionUrl, setSubmissionUrl] =
  useState("");

const [selectedFile, setSelectedFile] =
  useState(null);

const [submitLoading, setSubmitLoading] =
  useState(false);

const [submitError, setSubmitError] =
  useState("");

const [submitSuccess, setSubmitSuccess] =
  useState("");
const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (file.size >= MAX_FILE_SIZE) {
    setSubmitError(
      "File size must be less than 5 MB."
    );

    setSelectedFile(null);
    event.target.value = "";

    return;
  }

  setSubmitError("");
  setSelectedFile(file);
};


const handleSubmission = async () => {
  try {
    setSubmitLoading(true);
    setSubmitError("");
    setSubmitSuccess("");

    const assignmentId =
      selectedAssignment._id ||
      selectedAssignment.id;

    const studentEmail =
      localStorage.getItem("email");

    if (!studentEmail) {
      setSubmitError(
        "Student email not found. Please login again."
      );
      return;
    }

    if (submissionType === "url") {

      if (!submissionUrl.trim()) {
        setSubmitError(
          "Please enter a submission URL."
        );
        return;
      }

      await createSubmission({
        assignment_id: assignmentId,
        student_email: studentEmail,
        submission_url: submissionUrl.trim(),
      });

    } else {

      if (!selectedFile) {
        setSubmitError(
          "Please select a file."
        );
        return;
      }

      await uploadSubmission(
        assignmentId,
        studentEmail,
        selectedFile
      );
    }

    setSubmitSuccess(
      "Assignment submitted successfully."
    );

    setSubmissionUrl("");
    setSelectedFile(null);

    setTimeout(() => {
      setOpenSubmit(false);
      setSubmitSuccess("");
    }, 1500);

  } catch (err) {

    console.error(
      "Submission Error:",
      err
    );

    setSubmitError(
      err.response?.data?.detail ||
      "Unable to submit assignment."
    );

  } finally {
    setSubmitLoading(false);
  }
};

  return (
    <StudentLayout>
      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: "#F8FAFC" }}
        >
          Assignments
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mt: 1,
          }}
        >
          View your available assignments and deadlines.
        </Typography>
      </Box>

      {error && (
        <Alert
          severity="error"
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
      ) : assignments.length === 0 ? (
        <Box
          sx={{
            backgroundColor: "#1E293B",
            border: "1px solid #334155",
            borderRadius: 3,
            p: 6,
            textAlign: "center",
          }}
        >
          <AssignmentIcon
            sx={{
              fontSize: 55,
              color: "#64748B",
            }}
          />

          <Typography
            sx={{
              color: "#F8FAFC",
              fontSize: 20,
              fontWeight: 600,
              mt: 2,
            }}
          >
            No assignments available
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              mt: 1,
            }}
          >
            Your assignments will appear here.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {assignments.map((assignment) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={
                assignment._id ||
                assignment.id
              }
            >
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <AssignmentIcon
                    sx={{
                      fontSize: 40,
                      color: "#FF69B4",
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
                    {assignment.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#94A3B8",
                      mt: 2,
                    }}
                  >
                    {assignment.description}
                  </Typography>

                  <Box mt={3}>
                    <Typography
                      sx={{ color: "#64748B" }}
                    >
                      Course:{" "}
                      <span style={{ color: "#94A3B8" }}>
                        {assignment.course_id}
                      </span>
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        mt: 1,
                      }}
                    >
                      Due Date:{" "}
                      <span style={{ color: "#94A3B8" }}>
                        {assignment.due_date}
                      </span>
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        mt: 1,
                      }}
                    >
                      Total Marks:{" "}
                      <span style={{ color: "#94A3B8" }}>
                        {assignment.total_marks}
                      </span>
                    </Typography>
                  </Box>
                  <Button
  fullWidth
  variant="contained"
  sx={{
    mt: 3,
    backgroundColor: "#0056D2",
  }}
  onClick={() => {
    setSelectedAssignment(assignment);
    setSubmissionType("url");
    setSubmissionUrl("");
    setSelectedFile(null);
    setSubmitError("");
    setSubmitSuccess("");
    setOpenSubmit(true);
  }}
>
  Submit Assignment
</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog
  open={openSubmit}
  onClose={() => {
    if (!submitLoading) {
      setOpenSubmit(false);
    }
  }}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle
    sx={{
      backgroundColor: "#1E293B",
      color: "#F8FAFC",
      fontWeight: 700,
    }}
  >
    Submit Assignment
  </DialogTitle>

  <DialogContent
    sx={{
      backgroundColor: "#1E293B",
      pt: 3,
    }}
  >

    {submitError && (
      <Alert
        severity="error"
        sx={{ mb: 2 }}
      >
        {submitError}
      </Alert>
    )}

    {submitSuccess && (
      <Alert
        severity="success"
        sx={{ mb: 2 }}
      >
        {submitSuccess}
      </Alert>
    )}

    <Typography
      sx={{
        color: "#94A3B8",
        mb: 2,
      }}
    >
      Choose how you want to submit your assignment.
    </Typography>

    <Stack spacing={2}>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >

        <Button
          variant={
            submissionType === "url"
              ? "contained"
              : "outlined"
          }
          onClick={() => {
            setSubmissionType("url");
            setSubmitError("");
          }}
          sx={{
            flex: 1,
          }}
        >
          Submit URL
        </Button>

        <Button
          variant={
            submissionType === "file"
              ? "contained"
              : "outlined"
          }
          onClick={() => {
            setSubmissionType("file");
            setSubmitError("");
          }}
          sx={{
            flex: 1,
          }}
        >
          Upload File
        </Button>

      </Box>

      {submissionType === "url" && (
        <TextField
          fullWidth
          label="Submission URL"
          placeholder="https://github.com/..."
          value={submissionUrl}
          onChange={(e) =>
            setSubmissionUrl(
              e.target.value
            )
          }
          sx={{
            "& .MuiInputLabel-root": {
              color: "#94A3B8",
            },

            "& .MuiInputLabel-root.Mui-focused": {
              color: "#0056D2",
            },

            "& .MuiOutlinedInput-root": {
              color: "#94A3B8",

              "& fieldset": {
                borderColor: "#334155",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#0056D2",
              },
            },
          }}
        />
      )}

      {submissionType === "file" && (
        <Box>

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              height: 55,
              color: "#94A3B8",
              borderColor: "#334155",
            }}
          >
            Choose File

            <input
              type="file"
              hidden
              onChange={
                handleFileChange
              }
            />
          </Button>

          {selectedFile && (
            <Typography
              sx={{
                color: "#94A3B8",
                mt: 1,
              }}
            >
              {selectedFile.name}
            </Typography>
          )}

          <Typography
            sx={{
              color: "#64748B",
              mt: 1,
              fontSize: 13,
            }}
          >
            Maximum file size: 5 MB
          </Typography>

        </Box>
      )}

    </Stack>

  </DialogContent>

  <DialogActions
    sx={{
      backgroundColor: "#1E293B",
      px: 3,
      pb: 3,
    }}
  >

    <Button
      onClick={() =>
        setOpenSubmit(false)
      }
      disabled={submitLoading}
      sx={{
        color: "#94A3B8",
      }}
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={handleSubmission}
      disabled={submitLoading}
      sx={{
        backgroundColor: "#0056D2",
      }}
    >
      {submitLoading ? (
        <CircularProgress
          size={22}
          sx={{
            color: "#fff",
          }}
        />
      ) : (
        "Submit Assignment"
      )}
    </Button>

  </DialogActions>
</Dialog>
    </StudentLayout>
  );
}