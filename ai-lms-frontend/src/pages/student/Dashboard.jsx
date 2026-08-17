import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlagIcon from "@mui/icons-material/Flag";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TimerIcon from "@mui/icons-material/Timer";

import StudentLayout from "../../layouts/StudentLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import AIWidget from "../../components/dashboard/AIWidget";
import ActivityCard from "../../components/dashboard/ActivityCard";

import {
  getLatestStudyPlan,
} from "../../services/studyPlannerService";


// =====================================================
// COLORS
// =====================================================

const ACTIVE_COLORS = [
  "#0FFF50",
  "#00FFFF",
  "#00FFFF",
  "#9D00FF",
  "#FF69B4",
  "#FF007F",
];

const INACTIVE_COLORS = [
  "#163D32",
  "#112547",
  "#112547",
  "#2A1B40",
  "#3E1F30",
  "#421D29",
];


// =====================================================
// TIMELINE
// =====================================================

const TIMELINE_ITEMS = [
  "Schedule",
  "Hours Analysis",
  "Weekly Goal",
  "Plan",
  "Student Message",
  "Countdown",
];

const TIMELINE_ICONS = [
  CalendarMonthIcon,
  AccessTimeIcon,
  FlagIcon,
  EventNoteIcon,
  ChatBubbleIcon,
  TimerIcon,
];


// =====================================================
// TIME CONSTANTS
// =====================================================

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;


// =====================================================
// GET SCHEDULE DURATION
// =====================================================

function getScheduleDuration(scheduleDays) {
  const days = Number(scheduleDays);

  

  /*
   * Special case:
   *
   * 0 schedule days means:
   * Last-Minute Survival Mode
   * Give the student 6 hours.
   */

  if (days === 0) {
    return 6 * HOUR;
  }

  if (!Number.isFinite(days) || days < 0) {
    return 0;
  }

  return days * DAY;
}


// =====================================================
// FORMAT COUNTDOWN
// =====================================================

function formatCountdown(milliseconds) {
  if (!milliseconds || milliseconds <= 0) {
    return "Completed";
  }

  const totalSeconds = Math.floor(
    milliseconds / 1000
  );

  const days = Math.floor(
    totalSeconds / 86400
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return `${days}d ${String(hours).padStart(
    2,
    "0"
  )}h ${String(minutes).padStart(
    2,
    "0"
  )}m ${String(seconds).padStart(
    2,
    "0"
  )}s`;
}


// =====================================================
// TOOLTIP CONTENT
// =====================================================

function getTooltipContent(
  index,
  schedule,
  countdown
) {
  if (!schedule) {
    return (
      <Box sx={{ p: 1,
      minWidth: 0,
      height: 455,
      backgroundColor: "#1E293B",
      border: "1px solid #334155",
      borderRadius: 3,
      padding: 3,
      boxSizing: "border-box",
      overflow: "hidden",
      lineHeight: 1.5,
      mb: 2,
    
      }}>
        <Typography
          fontWeight={700}
          sx={{
            color: "#F8FAFC",
          }}
        >
          {TIMELINE_ITEMS[index]}
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: 12,
            mt: 0.5,
          }}
        >
          Generate a study schedule to activate
          this timeline.
        </Typography>
      </Box>
    );
  }

  switch (index) {

    // =================================================
    // CIRCLE 1
    // =================================================


    
    case 0:
      return (
        <Box
          sx={{
            p: 1.5,
            minWidth: 220,
          }}
        >
          <Typography
            sx={{
              color: "#0FFF50",
              mb: 1.5,
              fontWeight: 700,
            }}
          >
            SCHEDULE
          </Typography>

          <Typography
            variant="body2"
            sx={{ mb: 0.7 }}
          >
            <strong>Subject:</strong>{" "}
            {String(
              schedule?.subject ?? "—"
            )}
          </Typography>

          <Typography
            variant="body2"
            sx={{ mb: 0.7 }}
          >
            <strong>Exam Date:</strong>{" "}
            {String(
              schedule?.exam_date ?? "—"
            )}
          </Typography>

          <Typography
            variant="body2"
            sx={{ mb: 0.7 }}
          >
            <strong>Days Remaining:</strong>{" "}
            {String(
              schedule?.days_remaining ?? "—"
            )}
          </Typography>

          <Typography variant="body2">
            <strong>Schedule Days:</strong>{" "}
            {String(
              schedule?.schedule_days ?? "—"
            )}
          </Typography>
        </Box>
      );


    // =================================================
    // CIRCLE 2
    // =================================================

    case 1:
      return (
        <Box
          sx={{
            p: 1.5,
            minWidth: 240,
          }}
        >
          <Typography
            sx={{
              color: "#00FFFF",
              mb: 1.5,
              fontWeight: 700,
            }}
          >
            HOURS ANALYSIS
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#F8FAFC",
              mb: 2,
              lineHeight: 1.5,
              borderBottom:
                "1px solid #CBD3DE",
              pb: 1,
            }}
          >
            <strong>
              Daily Study Hours:
            </strong>{" "}
            {schedule
              ?.hours_analysis
              ?.provided_daily_hours ??
              "—"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#F8FAFC",
              mb: 2,
              lineHeight: 1.5,
              borderBottom:
                "1px solid #CBD3DE",
              pb: 1,
            }}
          >
            <strong>
              Recommended Hours:
            </strong>{" "}
            {schedule
              ?.hours_analysis
              ?.recommended_daily_hours ??
              "—"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#F8FAFC",
              mb: 2,
              lineHeight: 1.5,
              borderBottom:
                "1px solid #CBD3DE",
              pb: 1,
            }}
          >
            <strong>
              Hours Sufficient:
            </strong>{" "}
            {schedule
              ?.hours_analysis
              ?.hours_sufficient === true
              ? "Yes"
              : schedule
                  ?.hours_analysis
                  ?.hours_sufficient === false
              ? "No"
              : "—"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#94A3B8",
              mt: 1,
            }}
          >
            {schedule
              ?.hours_analysis
              ?.recommendation ??
              "No recommendation available."}
          </Typography>
        </Box>
      );


    // =================================================
    // CIRCLE 3
    // =================================================

    case 2:
      return (
        <Box
          sx={{
            p: 1.5,
            minWidth: 300,
            maxHeight: 400,
            overflowY: "auto",
          }}
        >
          <Typography
            sx={{
              color: "#00FFFF",
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            WEEKLY GOAL
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#F8FAFC",
              mb: 2,
              lineHeight: 1.5,
            }}
          >
            {schedule?.weekly_goal ||
              "Weekly goal not available."}
          </Typography>

          {Array.isArray(schedule?.plan) &&
            schedule.plan.length > 0 && (
              <>
                <Typography
                  sx={{
                    color: "#00FFFF",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  DAILY SCHEDULE
                </Typography>

                {schedule.plan.map(
                  (day, i) => (
                    <Box
                      key={i}
                      sx={{
                        mb: 1,
                        pb: 1,
                        borderBottom:
                          "1px solid #CBD3DE",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "#F8FAFC",
                        }}
                      >
                        Day{" "}
                        {day?.day ?? i + 1}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#CBD5E1",
                          mt: 0.3,
                        }}
                      >
                        {day?.topic ||
                          day?.focus ||
                          day?.title ||
                          "Study"}
                      </Typography>
                    </Box>
                  )
                )}
              </>
            )}
        </Box>
      );


    // =================================================
    // CIRCLE 4
    // =================================================

    case 3:
      return (
        <Box
          sx={{
            p: 1.5,
            minWidth: 220,
            maxHeight: 350,
            overflowY: "auto",
          }}
        >
          <Typography
            sx={{
              color: "#9D00FF",
              mb: 1.5,
              fontWeight: 700,
            }}
          >
            PLAN
          </Typography>

          {Array.isArray(schedule?.plan) ? (
            schedule.plan.map(
              (day, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  sx={{
                    mt: 0.8,
                    pb: 0.8,
                    borderBottom:
                      "1px solid #CBD3DE",
                  }}
                >
                  {day?.focus ||
                    day?.topic ||
                    day?.title ||
                    "Study"}
                </Typography>
              )
            )
          ) : (
            <Typography variant="body2">
              {schedule?.plan ||
                "Study plan not available."}
            </Typography>
          )}
        </Box>
      );


    // =================================================
    // CIRCLE 5
    // =================================================

    case 4:
      return (
        <Box
          sx={{
            p: 1.5,
            minWidth: 240,
          }}
        >
          <Typography
            sx={{
              color: "#FF69B4",
              mb: 1.5,
              fontWeight: 700,
            }}
          >
            STUDENT MESSAGE
          </Typography>

          <Typography variant="body2">
            {schedule?.student_message ||
              "Your study schedule is ready. Use the AI Chat option for further generation."}
          </Typography>
        </Box>
      );


    // =================================================
    // CIRCLE 6
    // =================================================

    case 5:
      return (
        <Box
          sx={{
            p: 1.5,
            minWidth: 240,
          }}
        >
          <Typography
            sx={{
              color: "#FF007F",
              mb: 1.5,
              fontWeight: 700,
            }}
          >
            COUNTDOWN
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#F8FAFC",
            }}
          >
            {formatCountdown(countdown)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#94A3B8",
              mt: 1,
            }}
          >
            {Number(
              schedule?.schedule_days
            ) === 0
              ? "Last-Minute Survival Mode."
              : "Remaining time based on your schedule days."}
          </Typography>
        </Box>
      );

    default:
      return null;
  }
}

const pieData = [
  {
    name: "Assignments",
    value: 14,
  },
  {
    name: "Attendance",
    value: 92,
  },
  {
    name: "Courses",
    value: 8,
  },
  {
    name: "Results",
    value: 8.9,
  },
];

const pieColors = [
  "#FF69B4",
  "#34D399",
  "#0056D2",
  "#6F42C1",
];


// =====================================================
// DASHBOARD
// =====================================================

export default function Dashboard() {

  const [studyPlan, setStudyPlan] =
    useState(null);

  const [countdown, setCountdown] =
    useState(0);


  // ===================================================
  // LOAD LATEST STUDY PLAN
  // ===================================================

  useEffect(() => {

    const loadStudyPlan = async () => {

      try {

        const response =
          await getLatestStudyPlan();

        console.log(
          "STUDY PLAN RESPONSE:",
          response
        );

        const mongoPlan =
          response?.data;

        if (mongoPlan?.plan) {

          setStudyPlan({
            ...mongoPlan.plan,

            student_email:
              mongoPlan.student_email,

            daily_study_hours:
              mongoPlan.daily_study_hours,

            days_generated:
              mongoPlan.days_generated,

            expires_at:
              mongoPlan.expires_at,

            created_at:
              mongoPlan.created_at,
          });

        }

      } catch (error) {

        console.error(
          "Error loading study plan:",
          error
        );

      }
    };

    loadStudyPlan();

  }, []);


  // ===================================================
  // TOTAL SCHEDULE DURATION
  // ===================================================

  const totalDuration =
    useMemo(() => {

      return getScheduleDuration(
        studyPlan?.schedule_days
      );

    }, [studyPlan]);


  // ===================================================
  // COUNTDOWN
  //
  // schedule_days = 0 -> 6 HOURS
  // schedule_days > 0 -> schedule_days * 24 HOURS
  //
  // IMPORTANT:
  // Does NOT use expires_at.
  // ===================================================

  useEffect(() => {

    if (!studyPlan) {
      setCountdown(0);
      return;
    }


    const scheduleDays =
      Number(
        studyPlan?.schedule_days
      );


    // -----------------------------------------------
    // Validate schedule days
    // -----------------------------------------------

    if (
      !Number.isFinite(scheduleDays) ||
      scheduleDays < 0
    ) {
      setCountdown(0);
      return;
    }


    // -----------------------------------------------
    // IMPORTANT:
    //
    // If schedule_days = 0:
    // Give exactly 6 hours.
    // -----------------------------------------------

    const duration =
      scheduleDays === 0
        ? 6 * HOUR
        : scheduleDays * DAY;


    // -----------------------------------------------
    // Schedule starts when study plan was created.
    // -----------------------------------------------

    const startTime =
      studyPlan?.created_at
        ? new Date(
            studyPlan.created_at
          ).getTime()
        : Date.now();


    // -----------------------------------------------
    // Protect against invalid created_at
    // -----------------------------------------------

    const validStartTime =
      Number.isFinite(startTime)
        ? startTime
        : Date.now();


    // -----------------------------------------------
    // Calculate end time
    // -----------------------------------------------

    const endTime =
      validStartTime + duration;


    // -----------------------------------------------
    // Update countdown
    // -----------------------------------------------

    const updateCountdown = () => {

      const remaining =
        Math.max(
          0,
          endTime - Date.now()
        );

      setCountdown(remaining);

    };


    // Run immediately
    updateCountdown();


    // Update every second
    const interval =
      setInterval(
        updateCountdown,
        1000
      );


    return () => {
      clearInterval(interval);
    };

  }, [studyPlan]);


  // ===================================================
  // SCHEDULE PROGRESS
  // ===================================================

  const progress =
    useMemo(() => {

      if (
        !studyPlan ||
        !totalDuration
      ) {
        return 0;
      }


      if (countdown <= 0) {
        return 100;
      }


      const elapsed =
        totalDuration -
        countdown;


      return Math.min(
        100,
        Math.max(
          0,
          (elapsed /
            totalDuration) *
            100
        )
      );

    }, [
      studyPlan,
      totalDuration,
      countdown,
    ]);


  // ===================================================
  // ACTIVE CIRCLE COUNT
  // ===================================================

  const activeCircleCount =
    studyPlan
      ? Math.max(
          1,
          Math.min(
            6,
            Math.ceil(
              progress /
                (100 / 6)
            )
          )
        )
      : 0;


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <StudentLayout>

      {/* =================================================
          STUDY PLANNER TIMELINE
      ================================================= */}

<Box
  sx={{
    width: "100%",
    mb: 4,
    p: {
      xs: 1,
      sm: 1,
      md: 1,
    },

    backgroundColor: "#1E293B",

    border: "1px solid #334155",

    borderRadius: "12px",

    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.25)",

    overflow: "visible",
  }}
>

        {/* =================================================
            TIMELINE
        ================================================= */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            px: {
              xs: 0,
              sm: 1,
            },
          }}
        >

          {TIMELINE_ITEMS.map(
            (title, index) => {

              const isActive =
                Boolean(studyPlan) &&
                index <
                  activeCircleCount;


              const circleColor =
                isActive
                  ? ACTIVE_COLORS[index]
                  : INACTIVE_COLORS[index];


              const HoverIcon =
                TIMELINE_ICONS[index];


              return (
                <Box
                  key={title}
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    minWidth: 0,
                  }}
                >

                  {/* =====================================
                      ARROW + HOVER ICON
                  ===================================== */}

                  <Tooltip
                    arrow
                    placement="top"
                    title={getTooltipContent(
                      index,
                      studyPlan,
                      countdown
                    )}
                    slotProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#0F172A",
                          color: "#F8FAFC",
                          border:
                            "1px solid #334155",
                          maxWidth: 320,
                          p: 1,
                        },
                      },
                    }}
                  >

                    <Box
                      sx={{
                        position: "relative",

                        width: {
                          xs: 30,
                          sm: 38,
                          md: 46,
                        },

                        height: {
                          xs: 30,
                          sm: 38,
                          md: 46,
                        },

                        minWidth: {
                          xs: 30,
                          sm: 38,
                          md: 46,
                        },

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        cursor: "pointer",

                        "&:hover .default-arrow": {
                          opacity: 0,
                          transform: "scale(0.5)",
                        },

                        "&:hover .hover-icon": {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                      }}
                    >

                      {/* =================================
                          DEFAULT DOUBLE ARROW
                      ================================= */}

                      <DoubleArrowIcon
                        className="default-arrow"
                        sx={{
                          position: "absolute",

                          fontSize: {
                            xs: 22,
                            sm: 28,
                            md: 34,
                          },

                          color: circleColor,

                          opacity: 1,

                          transform: "scale(1)",

                          transition:
                            "opacity 0.25s ease, transform 0.25s ease",

                          filter: isActive
                            ? `
                              drop-shadow(
                                0 0 6px ${circleColor}
                              )
                            `
                            : "none",
                        }}
                      />


                      {/* =================================
                          HOVER ICON
                      ================================= */}

                      <HoverIcon
                        className="hover-icon"
                        sx={{
                          position: "absolute",

                          fontSize: {
                            xs: 22,
                            sm: 28,
                            md: 34,
                          },

                          color: circleColor,

                          opacity: 0,

                          transform: "scale(0.5)",

                          transition:
                            "opacity 0.25s ease, transform 0.25s ease",

                          filter: isActive
                            ? `
                              drop-shadow(
                                0 0 8px ${circleColor}
                              )
                            `
                            : "none",
                        }}
                      />

                    </Box>

                  </Tooltip>


                  {/* =====================================
                      CONNECTING LINE
                  ===================================== */}

                  {index <
                    TIMELINE_ITEMS.length - 1 && (
                    <Box
                      sx={{
                        flex: 1,

                        height: 2,

                        mx: {
                          xs: 0.5,
                          sm: 1,
                          md: 1.5,
                        },

                        backgroundColor:
                          studyPlan
                            ? "#64748B"
                            : "#334155",

                        boxShadow:
                          studyPlan
                            ? "0 0 6px rgba(100,116,139,0.35)"
                            : "none",

                        transition:
                          "all 1s ease",
                      }}
                    />
                  )}

                </Box>
              );
            }
          )}

        </Box>


        {/* =================================================
            TIMELINE LABELS
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            mt: 1,
          }}
        >

          {TIMELINE_ITEMS.map(
            (title) => (

              <Typography
                key={title}
                sx={{
                  width: `${
                    100 /
                    TIMELINE_ITEMS.length
                  }%`,

                  textAlign: "center",

                  color: "#64748B",

                  fontSize: {
                    xs: 7,
                    sm: 9,
                    md: 11,
                  },

                  fontWeight: 600,

                  whiteSpace: "nowrap",

                  overflow: "hidden",

                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </Typography>

            )
          )}

        </Box>

      </Box>


      {/* =================================================
          WELCOME
      ================================================= */}

      <Box mb={4}>

        <Typography
          variant="h4"
          fontWeight={700}
          color="#F8FAFC"
          sx={{
            mb: 2,
            lineHeight: 1,
            color: "#94A3B8",
          }}
        >

          Welcome Back 👋
        </Typography>

        <Typography 
        sx={{
            mb: 2,
            lineHeight: 1,
            color: "#94A3B8",
          }}>
          Ready to continue your
          learning journey?
        </Typography>

      </Box>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "minmax(0, 1.8fr) minmax(480px, 1fr)",
    },
    gap: 1.5,
    width: "100%",
    alignItems: "stretch",
  }}
>
  {/* =========================================
      LEFT SIDE - 2 x 2 STAT CARDS
      ========================================= */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr",
      },
      gap: 1.5,
    }}
  >

    {/* ASSIGNMENTS */}
    <Box sx={{ height: 200, width: 180  }}>
      <StatCard
        title="Assignments"
        value="14"
        subtitle="3 Pending"
        color="#FF69B4"
        icon={
          <AssignmentIcon
            sx={{
              fontSize: 45,
              color: "#FF69B4",
            }}
          />
        }
      />
    </Box>


    {/* ATTENDANCE */}
    <Box sx={{ height: 200, width: 180}}>
      <StatCard
        title="Attendance"
        value="92%"
        subtitle="Excellent"
        color="#34D399"
        icon={
          <FactCheckIcon
            sx={{
              fontSize: 45,
              color: "#34D399",
            }}
          />
        }
      />
    </Box>


    {/* COURSES */}
    <Box sx={{ height: 200, width: 180 }}>
      <StatCard
        title="Courses"
        value="8"
        subtitle="+2 This Semester"
        color="#0056D2"
        icon={
          <SchoolIcon
            sx={{
              fontSize: 45,
              color: "#0056D2",
            }}
          />
        }
      />
    </Box>


    {/* RESULTS */}
    <Box sx={{ height: 200, width: 180 }}>
      <StatCard
        title="Results"
        value="8.9"
        subtitle="Current CGPA"
        color="#6F42C1"
        icon={
          <EmojiEventsIcon
            sx={{
              fontSize: 45,
              color: "#6F42C1",
            }}
          />
        }
      />
    </Box>

  </Box>


  {/* =========================================
      RIGHT SIDE - LEARNING OVERVIEW
      ========================================= */}
  <Box
    sx={{
      minWidth: 0,
      height: 455,
      backgroundColor: "#1E293B",
      border: "1px solid #334155",
      borderRadius: 3,
      padding: 3,
      boxSizing: "border-box",
      overflow: "hidden",
      lineHeight: 1.5,
      mb: 2,
    }}
  >

    <Typography
      sx={{
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: 700,
        mb: 0.5,
        
      }}
    >
      Learning Overview
    </Typography>


    <Typography
      sx={{
        color: "#94A3B8",
        fontSize: 16,
        mb: 1,
      }}
    >
      Your current learning statistics
    </Typography>


    {/* PIE CHART */}
    <Box
      sx={{
        width: "100%",
        height: 405,
      }}
    >
      <ResponsiveContainer
        width="100%"
        
      >
        <PieChart>

          <Pie
            data={pieData}
            cx="50%"
            cy="35%"
            innerRadius={0}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pieColors[index % pieColors.length]}
              />
            ))}
          </Pie>


          <RechartsTooltip
            contentStyle={{
              backgroundColor: "#0F172A",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#FFFFFF",
            }}
          />


          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              fontSize: "14px",
              paddingTop: "10px",
              height:80,
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </Box>

  </Box>

</Box>
      
      



      {/* =================================================
          BOTTOM
      ================================================= */}

      <Grid
        container
        spacing={3}
        mt={1}
        sx={{
          mb: 2,
          lineHeight: 2,
          
        }}

      >

        <Grid
          item
          xs={12}
          lg={6}
        >
          <AIWidget />
        </Grid>


        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            width: 360,
            
          }}
        >
          <ActivityCard />
        </Grid>

      </Grid>


       {/* =================================================
          CHARTS
      ================================================= */}


      
      <Grid
        container
        spacing={6}
        mt={1}
        sx={{
          mb: 0,
          lineHeight: 1,
          height: "100%",
          
        }}
      >

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            
            width: 425,
          }}
        >
          <ChartCard
            title="Attendance Overview"
          />
        </Grid>


        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            width: 425,
          }}
        >
          <ChartCard
            title="Assignment Progress"
          />
        </Grid>

      </Grid>

    </StudentLayout>
  );
}