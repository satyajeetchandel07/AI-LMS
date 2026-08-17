import api from "../api/axios";

// ========================================
// GET ALL COURSES
// ========================================

export const getAllCourses = async () => {
  const response = await api.get("/courses/");
  return response.data;
};


// ========================================
// GET COURSE BY CODE
// ========================================

export const getCourseByCode = async (courseCode) => {
  const response = await api.get(
    `/courses/code/${encodeURIComponent(courseCode)}`
  );

  return response.data;
};


// ========================================
// CREATE COURSE
// ========================================

export const createCourse = async (courseData) => {
  const response = await api.post(
    "/courses/",
    courseData
  );

  return response.data;
};


// ========================================
// UPDATE COURSE
// ========================================

export const updateCourse = async (
  courseCode,
  courseData
) => {
  const response = await api.put(
    `/courses/${encodeURIComponent(courseCode)}`,
    courseData
  );

  return response.data;
};


// ========================================
// DELETE COURSE
// ========================================

export const deleteCourse = async (courseCode) => {
  const response = await api.delete(
    `/courses/${encodeURIComponent(courseCode)}`
  );

  return response.data;
};


// ========================================
// SEARCH COURSE
// ========================================

export const searchCourse = async (courseName) => {
  const response = await api.get(
    `/courses/search/${encodeURIComponent(courseName)}`
  );

  return response.data;
};