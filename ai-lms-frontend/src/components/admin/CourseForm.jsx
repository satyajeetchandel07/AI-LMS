import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";

const initialForm = {
  course_name: "",
  course_code: "",
  description: "",
  category: "",
  instructor: "",
  duration: "",
  level: "",
};

export default function CourseForm({
  open,
  onClose,
  onSubmit,
  course,
  loading,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (course) {
      setForm({
        course_name: course.course_name || "",
        course_code: course.course_code || "",
        description: course.description || "",
        category: course.category || "",
        instructor: course.instructor || "",
        duration: course.duration || "",
        level: course.level || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [course, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  const editing = Boolean(course);

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
      borderColor: "#475569",
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

  "& .MuiSelect-select": {
    color: "#94A3B8",
  },
};
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        {editing ? "Edit Course" : "Add New Course"}
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
            label="Course Name"
            name="course_name"
            value={form.course_name}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            required
            label="Course Code"
            name="course_code"
            value={form.course_code}
            onChange={handleChange}
            disabled={editing}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            required
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            required
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            required
            select
            label="Instructor"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            placeholder="Instructor name"
            sx={textFieldStyle}
            >
            <MenuItem value="Admin">
            Admin
            </MenuItem>
            <MenuItem value="Other">
              Other
            </MenuItem>
            </TextField>
          

          <TextField
            fullWidth
            required
            select
            label="Duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="e.g. 12 Weeks"
            sx={textFieldStyle}
            >
            <MenuItem value="2 week">
              2 week
            </MenuItem>
            <MenuItem value="4 week">
              4 week
            </MenuItem>

            <MenuItem value="6 week">
              6 week
            </MenuItem>

            <MenuItem value="8 week">
              8 week
            </MenuItem>
            <MenuItem value="12 week">
              12 week
            </MenuItem>
          </TextField>
          

          <TextField
            fullWidth
            required
            select
            label="Level"
            name="level"
            value={form.level}
            onChange={handleChange}
            // sx={textFieldStyle}
          >
            <MenuItem value="Beginner">
              Beginner
            </MenuItem>

            <MenuItem value="Intermediate">
              Intermediate
            </MenuItem>

            <MenuItem value="Advanced">
              Advanced
            </MenuItem>
          </TextField>

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
          onClick={onClose}
          disabled={loading}
          sx={{
            color: "#94A3B8",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            backgroundColor: "#0056D2",
            "&:hover": {
              backgroundColor: "#0045A8",
            },
          }}
        >
          {loading
            ? "Saving..."
            : editing
            ? "Update Course"
            : "Create Course"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}