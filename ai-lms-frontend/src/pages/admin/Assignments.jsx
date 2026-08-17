import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getAllCourses } from "../../services/courseService";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../../services/assignmentService";

const textFieldStyle = {
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

    "&:hover fieldset": {
      borderColor: "#94A3B8",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#0056D2",
    },
  },

  "& .MuiOutlinedInput-input": {
    color: "#94A3B8",
  },

  "& textarea": {
    color: "#94A3B8",
  },
};

const initialForm = {
  course_id: "",
  instructor_email: "",
  title: "",
  description: "",
  due_date: "",
  total_marks: "",
};

export default function Assignments() {
  const [courses, setCourses] = useState([]);

  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [selectedAssignment, setSelectedAssignment] =
    useState(null);

  const [form, setForm] = useState(initialForm);

  // ==========================================
  // LOAD ASSIGNMENTS
  // ==========================================

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllAssignments();

      console.log(
        "Assignments API Response:",
        response
      );

      if (Array.isArray(response)) {
        setAssignments(response);
      } else if (response?.assignments) {
        setAssignments(response.assignments);
      } else {
        setAssignments([]);
      }
    } catch (err) {
      console.error(
        "Assignment Loading Error:",
        err
      );

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
    loadCourses();
  }, []);
  const loadCourses = async () => {
  try {
    const response = await getAllCourses();

    if (Array.isArray(response)) {
      setCourses(response);
    } else if (response?.courses) {
      setCourses(response.courses);
    } else {
      setCourses([]);
    }
  } catch (err) {
    console.error("Course Loading Error:", err);
  }
};

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // OPEN CREATE FORM
  // ==========================================

  const handleAdd = () => {
    setSelectedAssignment(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
    setOpenForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);

    setForm({
      course_id: assignment.course_id || "",
      instructor_email:
        assignment.instructor_email || "",
      title: assignment.title || "",
      description:
        assignment.description || "",
      due_date: assignment.due_date || "",
      total_marks:
        assignment.total_marks ?? "",
    });

    setError("");
    setSuccess("");
    setOpenForm(true);
  };

  // ==========================================
  // CREATE / UPDATE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const assignmentData = {
        course_id: form.course_id,
        instructor_email:
          form.instructor_email,
        title: form.title,
        description: form.description,
        due_date: form.due_date,
        total_marks: Number(form.total_marks),
      };

      console.log(
        "Assignment Data:",
        assignmentData
      );

      if (selectedAssignment) {
        await updateAssignment(
          selectedAssignment._id ||
            selectedAssignment.id,
          assignmentData
        );

        setSuccess(
          "Assignment updated successfully."
        );
      } else {
        await createAssignment(
          assignmentData
        );

        setSuccess(
          "Assignment created successfully."
        );
      }

      setOpenForm(false);
      setSelectedAssignment(null);
      setForm(initialForm);

      await loadAssignments();
    } catch (err) {
      console.error(
        "Assignment Save Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to save assignment."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (assignment) => {
    const id =
      assignment._id || assignment.id;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${assignment.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteAssignment(id);

      setSuccess(
        "Assignment deleted successfully."
      );

      await loadAssignments();
    } catch (err) {
      console.error(
        "Assignment Delete Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to delete assignment."
      );
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <AdminLayout>
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
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
            Create and manage student assignments.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "#0056D2",
          }}
        >
          Add Assignment
        </Button>
      </Box>

      {/* MESSAGES */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          {success}
        </Alert>
      )}

      {/* LOADING */}

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
        /* EMPTY STATE */

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
            No assignments found
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              mt: 1,
            }}
          >
            Click Add Assignment to create one.
          </Typography>
        </Box>
      ) : (
        /* ASSIGNMENT CARDS */

        <Grid container spacing={3}>
          {assignments.map((assignment) => {
            const id =
              assignment._id ||
              assignment.id;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={id}
              >
                <Card
                  sx={{
                    backgroundColor: "#1E293B",
                    border:
                      "1px solid #334155",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <AssignmentIcon
                        sx={{
                          fontSize: 40,
                          color: "#FF69B4",
                        }}
                      />

                      <Box>
                        <IconButton
                          onClick={() =>
                            handleEdit(
                              assignment
                            )
                          }
                          sx={{
                            color: "#34D399",
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          onClick={() =>
                            handleDelete(
                              assignment
                            )
                          }
                          sx={{
                            color: "#FF69B4",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Stack>

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

                    <Typography
                      sx={{
                        color: "#64748B",
                        mt: 2,
                      }}
                    >
                      Course:{" "}
                      {assignment.course_id}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        mt: 1,
                      }}
                    >
                      Instructor:{" "}
                      {
                        assignment.instructor_email
                      }
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        mt: 1,
                      }}
                    >
                      Due Date:{" "}
                      {assignment.due_date}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        mt: 1,
                      }}
                    >
                      Total Marks:{" "}
                      {assignment.total_marks}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* CREATE / EDIT DIALOG */}

      <Dialog
        open={openForm}
        onClose={() => {
          if (!saving) {
            setOpenForm(false);
            setSelectedAssignment(null);
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#1E293B",
              color: "#F8FAFC",
              fontWeight: 700,
            }}
          >
            {selectedAssignment
              ? "Edit Assignment"
              : "Create Assignment"}
          </DialogTitle>

          <DialogContent
            sx={{
              backgroundColor: "#1E293B",
              pt: 3,
            }}
          >
            <Stack spacing={2.5}>

              <TextField
                 fullWidth
                 required
                 select
                 label="Course"
                 name="course_id"
                 value={form.course_id}
                 onChange={handleChange}
                 sx={textFieldStyle}
>
                 {courses.map((course) => (
                   <MenuItem
                     key={course.course_code}
                     value={course.course_code}
    >
                     {course.course_name} ({course.course_code})
                   </MenuItem>
                 ))}
              </TextField>

              {/* <TextField
                fullWidth
                required
                type="email"
                label="Instructor_Email "
                name="instructor_email"
                value={
                  form.instructor_email
                }
                onChange={handleChange}
                sx={textFieldStyle}
              /> */}

              <TextField
                fullWidth
                required
                label="Assignment Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                sx={textFieldStyle}
              />

              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                sx={textFieldStyle}
              />

              <TextField
                fullWidth
                required
                type="date"
                label="Due Date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={textFieldStyle}
              />

              <TextField
                fullWidth
                required
                type="number"
                label="Total Marks"
                name="total_marks"
                value={form.total_marks}
                onChange={handleChange}
                inputProps={{
                  min: 1,
                }}
                sx={textFieldStyle}
              />
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
              onClick={() => {
                setOpenForm(false);
                setSelectedAssignment(null);
              }}
              disabled={saving}
              sx={{
                color: "#94A3B8",
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              sx={{
                backgroundColor: "#0056D2",
              }}
            >
              {saving ? (
                <CircularProgress
                  size={22}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : selectedAssignment ? (
                "Update Assignment"
              ) : (
                "Create Assignment"
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </AdminLayout>
  );
}