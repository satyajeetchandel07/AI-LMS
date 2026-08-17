import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import StudentLayout from "../../layouts/StudentLayout";

import { generateStudyPlan } from "../../services/studyPlannerService";

const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "#94A3B8",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#0056D2",
  },

  "& .MuiOutlinedInput-root": {
    color: "#F8FAFC",

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
};

export default function StudyPlanner() {
  const [form, setForm] = useState({
    subject: "",
    exam_date: "",
    daily_study_hours: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [studyPlan, setStudyPlan] = useState(null);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenerate = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    if (!form.exam_date) {
      setError("Please select your exam date.");
      return;
    }

    if (
      !form.daily_study_hours ||
      Number(form.daily_study_hours) <= 0
    ) {
      setError(
        "Please enter valid daily study hours."
      );
      return;
    }

    try {
      setLoading(true);

      /*
       * For now your backend requires student_id.
       * We are using localStorage if available.
       * Otherwise we use "123" for testing.
       */
      const studentId =
        localStorage.getItem("student_id") || "123";

      const plannerData = {
        student_id: studentId,
        subject: form.subject.trim(),
        exam_date: form.exam_date,
        daily_study_hours: Number(
          form.daily_study_hours
        ),
      };

      console.log(
        "Study Planner Request:",
        plannerData
      );

      const response =
        await generateStudyPlan(plannerData);

      console.log(
        "Study Planner Response:",
        response
      );

      if (response?.success) {
        setStudyPlan(response.data);

        setSuccess(
          response.message ||
            "Study plan generated successfully."
        );
      } else {
        setError(
          response?.message ||
            "Unable to generate study plan."
        );
      }
    } catch (err) {
      console.error(
        "Study Planner Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to generate study plan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      {/* HEADER */}

      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: "#F8FAFC",
          }}
        >
          Study Planner
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mt: 2,
            lineHeight: 5,
          }}
        >
          Generate an AI-powered study plan
          based on your subject, exam date and
          available study time.
        </Typography>
      </Box>

      {/* FORM */}

      <Card
        sx={{
          backgroundColor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 3,
          maxWidth: 700,
          mb: 4,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <CalendarMonthIcon
              sx={{
                fontSize: 42,
                color: "#6F42C1",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: "#F8FAFC",
              }}
            >
              Create Study Plan
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

          {success && (
            <Alert
              severity="success"
              sx={{ mb: 3 }}
            >
              {success}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleGenerate}
          >
            <TextField
              fullWidth
              required
              label="Subject"
              name="subject"
              placeholder="e.g. Data Structures"
              value={form.subject}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              required
              type="date"
              label="Exam Date"
              name="exam_date"
              placeholder="dd-mm-yyyy"
              value={form.exam_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                ...textFieldStyle,
                mt: 2.5,
              }}
            />

            <TextField
              fullWidth
              required
              type="number"
              label="Daily Study Hours"
              name="daily_study_hours"
              value={form.daily_study_hours}
              onChange={handleChange}
              inputProps={{
                min: 1,
                max: 24,
              }}
              sx={{
                ...textFieldStyle,
                mt: 2.5,
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                height: 50,
                backgroundColor: "#6F42C1",

                "&:hover": {
                  backgroundColor: "#5B34A4",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={22}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Generate Study Plan"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* STUDY PLAN */}

      {studyPlan && (
        <Card
          sx={{
            backgroundColor: "#1E293B",
            border: "1px solid #334155",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: "#F8FAFC",
                mb: 2,
              }}
            >
              Your AI Study Plan
            </Typography>

            <Divider
              sx={{
                borderColor: "#334155",
                mb: 3,
              }}
            />

            {typeof studyPlan === "string" ? (
              <Typography
                sx={{
                  color: "#CBD5E1",
                  whiteSpace: "pre-line",
                  lineHeight: 1.8,
                }}
              >
                {studyPlan}
              </Typography>
            ) : (
              <StudyPlanData
                plan={studyPlan}
              />
            )}
          </CardContent>
        </Card>
      )}
    </StudentLayout>
  );
}


/* ========================================= */
/* STUDY PLAN DATA                           */
/* ========================================= */

function StudyPlanData({ plan }) {
  if (!plan) {
    return (
      <Typography
        sx={{
          color: "#94A3B8",
        }}
      >
        No study plan available.
      </Typography>
    );
  }

  if (typeof plan !== "object") {
    return (
      <Typography
        sx={{
          color: "#CBD5E1",
          whiteSpace: "pre-line",
        }}
      >
        {String(plan)}
      </Typography>
    );
  }

  return (
    <Box>
      {Object.entries(plan).map(
        ([key, value]) => (
          <Box key={key} mb={3}>
            <Typography
              sx={{
                color: "#6F42C1",
                fontWeight: 700,
                mb: 1,
                textTransform: "capitalize",
              }}
            >
              {key.replaceAll("_", " ")}
            </Typography>

            {Array.isArray(value) ? (
              value.map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    color: "#CBD5E1",
                    mb: 1,
                    ml: 2,
                  }}
                >
                  •{" "}
                  {typeof item ===
                  "object"
                    ? JSON.stringify(item)
                    : item}
                </Typography>
              ))
            ) : (
              <Typography
                sx={{
                  color: "#CBD5E1",
                  whiteSpace: "pre-line",
                }}
              >
                {typeof value ===
                "object"
                  ? JSON.stringify(
                      value,
                      null,
                      2
                    )
                  : value}
              </Typography>
            )}
          </Box>

          
        )
      )}{/* =====================================================
      RIGHT SIDE - PLAN PREVIEW
  ===================================================== */}

  <Card
    sx={{
      background:
        "linear-gradient(145deg, #17233A 0%, #111B31 100%)",
      border: "1px solid #263858",
      borderRadius: 3,
      color: "#F8FAFC",
      overflow: "hidden",
    }}
  >
    <CardContent sx={{ p: 3 }}>

      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "rgba(157, 92, 255, 0.12)",
          }}
        >
          <AutoAwesomeIcon
            sx={{
              fontSize: 28,
              color: "#B88CFF",
            }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#C4B5FD",
          }}
        >
          Plan Preview
        </Typography>
      </Box>


      {/* =================================================
          TOTAL ESTIMATED TIME
      ================================================= */}

      <Box
        sx={{
          p: 2.5,
          mb: 2.5,
          borderRadius: 3,
          background:
            "rgba(5, 12, 30, 0.65)",
          border: "1px solid #293B5F",
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1,
          }}
        >
          <AccessTimeIcon
            sx={{
              color: "#D78CFF",
              fontSize: 32,
            }}
          />

          <Typography
            sx={{
              color: "#B8A7D9",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 1.5,
            }}
          >
            TOTAL ESTIMATED TIME
          </Typography>
        </Box>


        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 700,
            color: "#F8FAFC",
            mt: 1,
          }}
        >
          {studyPlan?.total_estimated_hours ?? "—"}
          <Box
            component="span"
            sx={{
              fontSize: 20,
              color: "#A5B4FC",
              ml: 1,
              fontWeight: 500,
            }}
          >
            hours
          </Box>
        </Typography>

      </Box>


      {/* =================================================
          PACE
      ================================================= */}

      <Box
        sx={{
          p: 2.5,
          mb: 2.5,
          borderRadius: 3,
          background:
            "rgba(5, 12, 30, 0.65)",
          border: "1px solid #293B5F",
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
          }}
        >

          <TrendingUpIcon
            sx={{
              color: "#2DE2B3",
              fontSize: 34,
            }}
          />

          <Typography
            sx={{
              color: "#B8A7D9",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 1.5,
            }}
          >
            PACE
          </Typography>

        </Box>


        <Typography
          sx={{
            color: "#F8FAFC",
            fontSize: 20,
            lineHeight: 1.5,
          }}
        >
          {studyPlan?.pace ??
            "Steady, covering ~3 topics per session."}
        </Typography>

      </Box>


      {/* =================================================
          AI OPTIMIZATION
      ================================================= */}

      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          background:
            "rgba(5, 12, 30, 0.65)",
          border: "1px solid #293B5F",
        }}
      >

        <Typography
          sx={{
            color: "#B8A7D9",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 1.5,
            mb: 2,
          }}
        >
          AI OPTIMIZATION
        </Typography>


        {/* PROGRESS */}

        <Box
          sx={{
            width: "100%",
            height: 10,
            borderRadius: 10,
            backgroundColor: "#303B60",
            overflow: "hidden",
            mb: 2,
          }}
        >

          <Box
            sx={{
              width: "72%",
              height: "100%",
              borderRadius: 10,
              background:
                "linear-gradient(90deg, #A78BFA, #D8B4FE)",
            }}
          />

        </Box>


        <Typography
          sx={{
            color: "#A5A9C4",
            fontSize: 19,
            lineHeight: 1.5,
          }}
        >
          Adjusting plan dynamically based on your focused
          intensity setting...
        </Typography>

      </Box>

    </CardContent>
  </Card>


    </Box>
  );
}

 