import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";

import AdminLayout from "../../layouts/AdminLayout";

import CourseForm from "../../components/admin/CourseForm";

import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
} from "../../services/courseService";
import { color } from "framer-motion";

export default function Courses() {

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [selectedCourse, setSelectedCourse] =
    useState(null);


  // ========================================
  // LOAD COURSES
  // ========================================

  const loadCourses = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllCourses();

      setCourses(
        Array.isArray(data)
          ? data
          : data.courses || []
      );

    } catch (err) {

      console.error(
        "Course Loading Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load courses."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadCourses();
  }, []);


  // ========================================
  // SEARCH
  // ========================================

  const handleSearch = async () => {

    if (!search.trim()) {
      loadCourses();
      return;
    }

    try {

      setLoading(true);
      setError("");

      const data = await searchCourse(
        search.trim()
      );

      setCourses(
        Array.isArray(data)
          ? data
          : data.courses || []
      );

    } catch (err) {

      setError(
        err.response?.data?.detail ||
        "Course search failed."
      );

    } finally {

      setLoading(false);

    }
  };


  // ========================================
  // OPEN CREATE
  // ========================================

  const handleAdd = () => {

    setSelectedCourse(null);

    setOpenForm(true);

  };


  // ========================================
  // OPEN EDIT
  // ========================================

  const handleEdit = (course) => {

    setSelectedCourse(course);

    setOpenForm(true);

  };


  // ========================================
  // CREATE / UPDATE
  // ========================================

  const handleSubmit = async (formData) => {
  try {
    setSaving(true);
    setError("");
    setSuccess("");

    // ==============================
    // UPDATE COURSE
    // ==============================

    if (selectedCourse) {
      await updateCourse(
        selectedCourse.course_code,
        {
          course_name: formData.course_name,
          description: formData.description,
          category: formData.category,
          instructor: formData.instructor,
          duration: formData.duration,
          level: formData.level,
        }
      );

      setSuccess(
        "Course updated successfully."
      );
    }

    // ==============================
    // CREATE COURSE
    // ==============================

    else {
      await createCourse({
        course_name: formData.course_name,
        course_code: formData.course_code,
        description: formData.description,
        category: formData.category,
        instructor: formData.instructor,
        duration: formData.duration,
        level: formData.level,
      });

      setSuccess(
        "Course created successfully."
      );
    }

    // ==============================
    // CLOSE FORM
    // ==============================

    setOpenForm(false);

    setSelectedCourse(null);

    // ==============================
    // RELOAD COURSES
    // ==============================

    await loadCourses();

  } catch (err) {
    console.error(
      "Course Save Error:",
      err
    );

    setError(
      err.response?.data?.detail ||
      "Unable to save course."
    );

  } finally {
    setSaving(false);
  }
};


  // ========================================
  // DELETE
  // ========================================

  const handleDelete = async (course) => {

    const confirmed = window.confirm(
      `Delete "${course.course_name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");
      setSuccess("");

      await deleteCourse(
        course.course_code
      );

      setSuccess(
        "Course deleted successfully."
      );

      await loadCourses();

    } catch (err) {

      console.error(
        "Course Delete Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to delete course."
      );
    }
  };


  return (
    <AdminLayout>

      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >

        <Box>

          <Typography
            variant="h4"
            sx={{
              color: "#F8FAFC",
              fontWeight: 700,
            }}
          >
            Courses
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              mt: 1,
            }}
          >
            Create and manage LMS courses.
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: "#0056D2",
            height: 44,
            px: 2.5,
          }}
        >
          Add Course
        </Button>

      </Box>


      {/* Messages */}

      {error && (

        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>

      )}

      {success && (

        <Alert
          severity="success"
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>

      )}


      {/* Search */}

      <Box mb={3}>

        <TextField
          fullWidth
          placeholder="Search course..."
          label="Search course"
          value={search}
          sx={{ backgroundColor: "#334155",
            borderRadius: "50px",

    "& .MuiInputLabel-root": {
      color: "#94A3B8",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#0056D2",
    },

    "& .MuiOutlinedInput-root": {
      padding: "4px 6px",
    },

    "& .MuiOutlinedInput-input": {
      color: "#94A3B8",
     },
    }}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">

                <IconButton
                  onClick={handleSearch}
                  sx={{
                    style: {color: "#94A3B8 !important"},

                  }}
                >
                  <SearchIcon />
                </IconButton>

              </InputAdornment>
            ),
          }}
        />

      </Box>


      {/* Loading */}

      {loading ? (

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >

          <CircularProgress
            sx={{
              color: "#0056D2",
            }}
          />

        </Box>

      ) : courses.length === 0 ? (

        <Box
          sx={{
            backgroundColor: "#1E293B",
            border: "1px solid #334155",
            borderRadius: 3,
            p: 6,
            textAlign: "center",
          }}
        >

          <SchoolIcon
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
            No courses found
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              mt: 1,
            }}
          >
            Create your first course using
            the Add Course button.
          </Typography>

        </Box>

      ) : (

        <Grid
          container
          spacing={3}
        >

          {courses.map((course) => (

            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={
                course.course_code ||
                course._id
              }
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
                    alignItems="flex-start"
                  >

                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor:
                          "#0056D220",
                        display: "flex",
                        justifyContent:
                          "center",
                        alignItems:
                          "center",
                      }}
                    >

                      <SchoolIcon
                        sx={{
                          color: "#0056D2",
                        }}
                      />

                    </Box>

                    <Box>

                      <IconButton
                        onClick={() =>
                          handleEdit(course)
                        }
                        sx={{
                          color: "#34D399",
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          handleDelete(course)
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
                      mt: 3,
                    }}
                  >
                    {course.course_name}
                  </Typography>


                  <Typography
                    sx={{
                      color: "#0056D2",
                      fontWeight: 600,
                      mt: 1,
                    }}
                  >
                    {course.course_code}
                  </Typography>


                  <Typography
                    sx={{
                      color: "#94A3B8",
                      mt: 2,
                      minHeight: 48,
                    }}
                  >
                    {course.description ||
                      "No description available."}
                  </Typography>


                  {course.instructor_email && (

                    <Typography
                      sx={{
                        color: "#64748B",
                        fontSize: 13,
                        mt: 2,
                      }}
                    >
                      Instructor:{" "}
                      {course.instructor_email}
                    </Typography>

                  )}

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      )}


      {/* Course Form */}

      <CourseForm
        open={openForm}
        onClose={() => {
          if (!saving) {
            setOpenForm(false);
          }
        }}
        onSubmit={handleSubmit}
        course={selectedCourse}
        loading={saving}
      />

    </AdminLayout>
  );
}