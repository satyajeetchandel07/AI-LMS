import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";

import QuizIcon from "@mui/icons-material/Quiz";

import StudentLayout from "../../layouts/StudentLayout";

import { generateQuiz } from "../../services/aiQuizService";


// =====================================================
// CONSTANTS
// =====================================================

const QUIZ_WINDOW_ROUTE =
  "/student/ai-quiz-window";

const QUIZ_STORAGE_KEY =
  "ai_quiz_popup_data";

const QUIZ_STATUS_KEY =
  "ai_quiz_popup_status";


// =====================================================
// TEXT FIELD STYLE
// =====================================================

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
      borderColor: "#64748B",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#0056D2",
    },
  },

  "& .MuiSelect-icon": {
    color: "#94A3B8",
  },
};


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function AIQuiz() {

  /*
   * IMPORTANT
   *
   * We use the SAME AIQuiz.jsx for both routes.
   *
   * /student/ai-quiz
   *       -> Generator
   *
   * /student/ai-quiz-window
   *       -> Popup quiz window
   */

  const isQuizWindow =
    window.location.pathname ===
    QUIZ_WINDOW_ROUTE;


  // ===================================================
  // IF THIS IS THE NEW QUIZ WINDOW
  // ===================================================

  if (isQuizWindow) {
    return <AIQuizWindow />;
  }


  // ===================================================
  // OTHERWISE SHOW NORMAL GENERATOR
  // ===================================================

  return <AIQuizGenerator />;
}


// =====================================================
// AI QUIZ GENERATOR
// =====================================================

function AIQuizGenerator() {

  const [topic, setTopic] =
    useState("");

  const [numberOfQuestions, setNumberOfQuestions] =
    useState(5);

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ===================================================
  // OPEN MAXIMIZED-SIZE QUIZ WINDOW
  // ===================================================

  const openQuizWindow =
    () => {

      /*
       * IMPORTANT:
       *
       * window.open MUST happen directly
       * inside the button click event.
       *
       * If we wait for the API first,
       * the browser may block the popup.
       */

      const width =
        window.screen.availWidth;

      const height =
        window.screen.availHeight;

      const left = 0;

      const top = 0;


      const features =
        [
          `width=${width}`,
          `height=${height}`,
          `left=${left}`,
          `top=${top}`,
          "menubar=no",
          "toolbar=no",
          "location=no",
          "status=no",
          "resizable=yes",
          "scrollbars=yes"
        ].join(",");


      const quizWindow =
        window.open(
          QUIZ_WINDOW_ROUTE,
          "AIQuizWindow",
          features
        );


      return quizWindow;
    };


  // ===================================================
  // GENERATE QUIZ
  // ===================================================

  const handleGenerateQuiz =
    async () => {

      // -----------------------------------------------
      // VALIDATION
      // -----------------------------------------------

      if (!topic.trim()) {

        setError(
          "Please enter a topic."
        );

        return;
      }


      // -----------------------------------------------
      // RESET UI
      // -----------------------------------------------

      setError("");

      setSuccess("");

      setLoading(true);


      // -----------------------------------------------
      // OPEN POPUP FIRST
      // -----------------------------------------------

      const quizWindow =
        openQuizWindow();


      /*
       * If browser blocked the popup,
       * stop here.
       */

      if (!quizWindow) {

        setLoading(false);

        setError(
          "Please allow popups for this website to open the quiz window."
        );

        return;
      }


      // -----------------------------------------------
      // TELL POPUP THAT GENERATION STARTED
      // -----------------------------------------------

      try {

        localStorage.setItem(
          QUIZ_STATUS_KEY,
          "generating"
        );

        localStorage.removeItem(
          QUIZ_STORAGE_KEY
        );


        /*
         * Send generating message.
         *
         * The popup may not have finished loading yet,
         * so localStorage is also used as backup.
         */

        quizWindow.postMessage(
          {
            type:
              "AI_QUIZ_GENERATING",
          },
          window.location.origin
        );

      } catch (storageError) {

        console.error(
          "Popup initialization error:",
          storageError
        );
      }


      // -----------------------------------------------
      // API REQUEST STARTS ONLY NOW
      // -----------------------------------------------

      try {

        const response =
          await generateQuiz({

            topic:
              topic.trim(),

            number_of_questions:
              Number(
                numberOfQuestions
              ),

            difficulty,

          });


        console.log(
          "AI Quiz Response:",
          response
        );


        // ---------------------------------------------
        // VALIDATE RESPONSE
        // ---------------------------------------------

        if (
          response?.success &&
          response?.data?.questions
        ) {

          const generatedQuiz =
            response.data;


          // -------------------------------------------
          // SAVE QUIZ FOR POPUP
          // -------------------------------------------

          localStorage.setItem(
            QUIZ_STORAGE_KEY,
            JSON.stringify(
              generatedQuiz
            )
          );


          localStorage.setItem(
            QUIZ_STATUS_KEY,
            "generated"
          );


          // -------------------------------------------
          // SEND QUIZ TO POPUP
          // -------------------------------------------

          try {

            quizWindow.postMessage(
              {
                type:
                  "AI_QUIZ_GENERATED",

                quiz:
                  generatedQuiz,
              },
              window.location.origin
            );

          } catch (postError) {

            console.error(
              "Error sending quiz to popup:",
              postError
            );
          }


          // -------------------------------------------
          // FOCUS POPUP
          // -------------------------------------------

          try {

            quizWindow.focus();

          } catch (focusError) {

            console.error(
              "Unable to focus quiz window:",
              focusError
            );
          }


          setSuccess(
            "Quiz generated successfully."
          );

        } else {

          // -------------------------------------------
          // API FAILED
          // -------------------------------------------

          localStorage.setItem(
            QUIZ_STATUS_KEY,
            "error"
          );


          localStorage.setItem(
            QUIZ_STORAGE_KEY,
            JSON.stringify({
              message:
                response?.message ||
                "Unable to generate quiz.",
            })
          );


          try {

            quizWindow.postMessage(
              {
                type:
                  "AI_QUIZ_ERROR",

                message:
                  response?.message ||
                  "Unable to generate quiz.",
              },
              window.location.origin
            );

          } catch (postError) {

            console.error(
              postError
            );
          }


          setError(
            response?.message ||
            "Unable to generate quiz."
          );
        }


      } catch (err) {

        console.error(
          "AI Quiz Error:",
          err
        );


        // ---------------------------------------------
        // API ERROR
        // ---------------------------------------------

        const errorMessage =
          err?.response?.data?.detail ||
          "Unable to connect to AI Quiz service.";


        localStorage.setItem(
          QUIZ_STATUS_KEY,
          "error"
        );


        localStorage.setItem(
          QUIZ_STORAGE_KEY,
          JSON.stringify({
            message:
              errorMessage,
          })
        );


        try {

          quizWindow.postMessage(
            {
              type:
                "AI_QUIZ_ERROR",

              message:
                errorMessage,
            },
            window.location.origin
          );

        } catch (postError) {

          console.error(
            postError
          );
        }


        setError(
          errorMessage
        );

      } finally {

        setLoading(false);

      }
    };


  // ===================================================
  // GENERATOR UI
  // ===================================================

  return (
    <StudentLayout>

      {/* =================================================
          HEADER
      ================================================= */}

      <Box mb={4}>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: "#F8FAFC",
          }}
        >
          AI Quiz
        </Typography>


        <Typography
          sx={{
            color: "#94A3B8",
            mt: 1,
          }}
        >
          Generate an AI-powered quiz
          based on your selected topic.
        </Typography>

      </Box>


      {/* =================================================
          GENERATOR CARD
      ================================================= */}

      <Card
        sx={{
          backgroundColor:
            "#1E293B",

          border:
            "1px solid #334155",

          borderRadius: 3,

          mb: 4,
        }}
      >

        <CardContent>

          {/* ---------------------------------------------
              TITLE
          --------------------------------------------- */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >

            <QuizIcon
              sx={{
                fontSize: 40,
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
              Generate Quiz
            </Typography>

          </Box>


          {/* ---------------------------------------------
              ERROR
          --------------------------------------------- */}

          {error && (

            <Alert
              severity="error"
              sx={{
                mb: 3,
              }}
            >
              {error}
            </Alert>

          )}


          {/* ---------------------------------------------
              SUCCESS
          --------------------------------------------- */}

          {success && (

            <Alert
              severity="success"
              sx={{
                mb: 3,
              }}
            >
              {success}
            </Alert>

          )}


          {/* ---------------------------------------------
              INPUTS
          --------------------------------------------- */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md:
                  "2fr 1fr 1fr",
              },

              gap: 2,
            }}
          >

            {/* TOPIC */}

            <TextField
              fullWidth
              label="Topic"
              placeholder="e.g. Agentic AI"
              value={topic}
              onChange={(e) =>
                setTopic(
                  e.target.value
                )
              }
              sx={textFieldStyle}
            />


            {/* QUESTIONS */}

            <TextField
              select
              fullWidth
              label="Questions"
              value={
                numberOfQuestions
              }
              onChange={(e) =>
                setNumberOfQuestions(
                  e.target.value
                )
              }
              sx={textFieldStyle}
            >

              {[
                5,
                10,
                15,
                20,
                25,
                30,
              ].map(
                (number) => (

                  <MenuItem
                    key={number}
                    value={number}
                  >
                    {number}
                  </MenuItem>

                )
              )}

            </TextField>


            {/* DIFFICULTY */}

            <TextField
              select
              fullWidth
              label="Difficulty"
              value={
                difficulty
              }
              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }
              sx={textFieldStyle}
            >

              <MenuItem value="Easy">
                Basic
              </MenuItem>

              <MenuItem value="Medium">
                Intermediate
              </MenuItem>

              <MenuItem value="Hard">
                Advanced
              </MenuItem>

            </TextField>

          </Box>


          {/* ---------------------------------------------
              GENERATE BUTTON
          --------------------------------------------- */}

          <Button
            variant="contained"
            onClick={
              handleGenerateQuiz
            }
            disabled={
              loading
            }
            sx={{
              mt: 3,

              backgroundColor:
                "#6F42C1",

              "&:hover": {
                backgroundColor:
                  "#5B34A4",
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

              "Generate Quiz"

            )}

          </Button>

        </CardContent>

      </Card>

    </StudentLayout>
  );
}


// =====================================================
// QUIZ WINDOW
// =====================================================

function AIQuizWindow() {

  const [quiz, setQuiz] =
    useState(null);

  const [answers, setAnswers] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const [generating, setGenerating] =
    useState(true);

  const [error, setError] =
    useState("");


  // ===================================================
  // LOAD QUIZ DATA
  // ===================================================

  useEffect(() => {

    // -----------------------------------------------
    // CHECK EXISTING STATUS
    // -----------------------------------------------

    try {

      const status =
        localStorage.getItem(
          QUIZ_STATUS_KEY
        );


      const savedQuiz =
        localStorage.getItem(
          QUIZ_STORAGE_KEY
        );


      /*
       * If quiz already exists,
       * show it immediately.
       */

      if (
        status === "generated" &&
        savedQuiz
      ) {

        const parsedQuiz =
          JSON.parse(
            savedQuiz
          );


        if (
          parsedQuiz?.questions
        ) {

          setQuiz(
            parsedQuiz
          );

          setGenerating(
            false
          );

        }

      }


      /*
       * If previous generation failed,
       * show error.
       */

      if (
        status === "error" &&
        savedQuiz
      ) {

        const parsedError =
          JSON.parse(
            savedQuiz
          );


        setError(
          parsedError?.message ||
          "Unable to generate quiz."
        );

        setGenerating(
          false
        );

      }

    } catch (storageError) {

      console.error(
        "Popup storage error:",
        storageError
      );
    }


    // =================================================
    // RECEIVE DATA FROM PARENT WINDOW
    // =================================================

    const handleMessage =
      (event) => {

        /*
         * Security:
         * only accept messages
         * from our own origin.
         */

        if (
          event.origin !==
          window.location.origin
        ) {
          return;
        }


        const data =
          event.data;


        // ---------------------------------------------
        // GENERATING
        // ---------------------------------------------

        if (
          data?.type ===
          "AI_QUIZ_GENERATING"
        ) {

          setGenerating(
            true
          );

          setQuiz(
            null
          );

          setError("");

          setSubmitted(
            false
          );

          setAnswers({});

          return;
        }


        // ---------------------------------------------
        // QUIZ GENERATED
        // ---------------------------------------------

        if (
          data?.type ===
          "AI_QUIZ_GENERATED"
        ) {

          if (
            data?.quiz?.questions
          ) {

            setQuiz(
              data.quiz
            );

            setGenerating(
              false
            );

            setError("");

            setAnswers({});

            setSubmitted(
              false
            );


            /*
             * Remove stored result after
             * it has reached the popup.
             */

            try {

              localStorage.removeItem(
                QUIZ_STORAGE_KEY
              );

              localStorage.removeItem(
                QUIZ_STATUS_KEY
              );

            } catch (
              storageError
            ) {

              console.error(
                storageError
              );
            }

          }

          return;
        }


        // ---------------------------------------------
        // ERROR
        // ---------------------------------------------

        if (
          data?.type ===
          "AI_QUIZ_ERROR"
        ) {

          setGenerating(
            false
          );

          setError(
            data?.message ||
            "Unable to generate quiz."
          );

        }

      };


    window.addEventListener(
      "message",
      handleMessage
    );


    // =================================================
    // STORAGE EVENT
    // =================================================

    const handleStorage =
      (event) => {

        if (
          event.key !==
          QUIZ_STATUS_KEY
        ) {
          return;
        }


        const status =
          event.newValue;


        // ---------------------------------------------
        // GENERATING
        // ---------------------------------------------

        if (
          status ===
          "generating"
        ) {

          setGenerating(
            true
          );

          setQuiz(
            null
          );

          setError("");

          return;
        }


        // ---------------------------------------------
        // GENERATED
        // ---------------------------------------------

        if (
          status ===
          "generated"
        ) {

          try {

            const savedQuiz =
              localStorage.getItem(
                QUIZ_STORAGE_KEY
              );


            if (
              savedQuiz
            ) {

              const parsedQuiz =
                JSON.parse(
                  savedQuiz
                );


              if (
                parsedQuiz?.questions
              ) {

                setQuiz(
                  parsedQuiz
                );

                setGenerating(
                  false
                );

                setError("");

                setAnswers({});

                setSubmitted(
                  false
                );

              }

            }

          } catch (
            storageError
          ) {

            console.error(
              storageError
            );
          }

          return;
        }


        // ---------------------------------------------
        // ERROR
        // ---------------------------------------------

        if (
          status ===
          "error"
        ) {

          try {

            const savedError =
              localStorage.getItem(
                QUIZ_STORAGE_KEY
              );


            if (
              savedError
            ) {

              const parsedError =
                JSON.parse(
                  savedError
                );


              setError(
                parsedError?.message ||
                "Unable to generate quiz."
              );

            }

          } catch (
            storageError
          ) {

            console.error(
              storageError
            );
          }


          setGenerating(
            false
          );
        }

      };


    window.addEventListener(
      "storage",
      handleStorage
    );


    // =================================================
    // CLEANUP
    // =================================================

    return () => {

      window.removeEventListener(
        "message",
        handleMessage
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );

    };

  }, []);


  // ===================================================
  // ANSWER CHANGE
  // ===================================================

  const handleAnswerChange =
    (
      questionId,
      answer
    ) => {

      /*
       * Do not allow changing
       * answers after submit.
       */

      if (
        submitted
      ) {
        return;
      }


      setAnswers(
        (previous) => ({
          ...previous,

          [questionId]:
            answer,
        })
      );

    };


  // ===================================================
  // SUBMIT QUIZ
  // ===================================================

  const handleSubmit =
    () => {

      setSubmitted(
        true
      );

      /*
       * Scroll to top so
       * the result is visible.
       */

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };


  // ===================================================
  // CALCULATE SCORE
  // ===================================================

  const score =
    quiz?.questions?.reduce(
      (
        total,
        question
      ) => {

        if (
          answers[
            question.id
          ] ===
          question.answer
        ) {

          return total + 1;

        }

        return total;

      },
      0
    ) || 0;


  // ===================================================
  // ROCKET LOADING SCREEN
  // ===================================================

  if (
    generating &&
    !quiz
  ) {

    return (
      <Box
        sx={{
          minHeight:
            "100vh",

          width:
            "100vw",

          background:
            "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",

          color:
            "#F8FAFC",

          overflow:
            "hidden",

          position:
            "relative",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >

        {/* =============================================
            STARS
        ============================================= */}

        <Box
          sx={{
            position:
              "absolute",

            inset: 0,

            backgroundImage:
              `
              radial-gradient(
                circle at 15% 20%,
                rgba(255,255,255,0.8) 0px,
                rgba(255,255,255,0.8) 1px,
                transparent 2px
              ),
              radial-gradient(
                circle at 80% 30%,
                rgba(255,255,255,0.7) 0px,
                rgba(255,255,255,0.7) 1px,
                transparent 2px
              ),
              radial-gradient(
                circle at 45% 70%,
                rgba(255,255,255,0.7) 0px,
                rgba(255,255,255,0.7) 1px,
                transparent 2px
              ),
              radial-gradient(
                circle at 70% 85%,
                rgba(255,255,255,0.8) 0px,
                rgba(255,255,255,0.8) 1px,
                transparent 2px
              )
              `,

            backgroundSize:
              "180px 180px",

            opacity:
              0.7,
          }}
        />


        {/* =============================================
            ROCKET
        ============================================= */}

        <Box
          className="rocket-animation"
          sx={{
            position:
              "absolute",

            left:
              "50%",

            top:
              "50%",

            transform:
              "translate(-50%, -50%)",

            zIndex:
              10,

            display:
              "flex",

            flexDirection:
              "column",

            alignItems:
              "center",

            animation:
              "rocketFloat 1.8s ease-in-out infinite",

            "@keyframes rocketFloat":
              {

                "0%": {
                  transform:
                    "translate(-50%, -55%)",
                },

                "50%": {
                  transform:
                    "translate(-50%, -45%)",
                },

                "100%": {
                  transform:
                    "translate(-50%, -55%)",
                },

              },
          }}
        >

          {/* ROCKET */}

          <Typography
            sx={{
              fontSize: {
                xs: 140,
                sm: 180,
                md: 240,
              },

              lineHeight: 1,

              transform:
                "rotate(-45deg)",

              filter:
                "drop-shadow(0 0 30px rgba(56,189,248,0.95))",

              textShadow:
                "0 0 40px rgba(248,113,113,0.7)",
            }}
          >
            🚀
          </Typography>


          {/* ===========================================
              THRUST
          =========================================== */}

          <Box
            sx={{
              position:
                "relative",

              width:
                160,

              height:
                280,

              mt:
                -2,
            }}
          >

            <Box
              className="rocket-flame flame-one"
              sx={{
                position:
                  "absolute",

                left:
                  "50%",

                top:
                  0,

                width:
                  32,

                height:
                  130,

                borderRadius:
                  "50%",

                background:
                  "linear-gradient(180deg, #FDE047, #F97316, transparent)",

                transform:
                  "translateX(-50%)",

                filter:
                  "blur(5px)",

                animation:
                  "flameOne 0.45s ease-in-out infinite alternate",

                "@keyframes flameOne":
                  {

                    "0%": {
                      height:
                        90,
                      opacity:
                        0.7,
                    },

                    "100%": {
                      height:
                        160,
                      opacity:
                        1,
                    },

                  },
              }}
            />


            <Box
              sx={{
                position:
                  "absolute",

                left:
                  "30%",

                top:
                  15,

                width:
                  24,

                height:
                  100,

                borderRadius:
                  "50%",

                background:
                  "linear-gradient(180deg, #FFFFFF, #38BDF8, transparent)",

                filter:
                  "blur(6px)",

                animation:
                  "flameSide 0.35s ease-in-out infinite alternate",

                "@keyframes flameSide":
                  {

                    "0%": {
                      transform:
                        "scaleY(0.7)",
                    },

                    "100%": {
                      transform:
                        "scaleY(1.3)",
                    },

                  },
              }}
            />


            <Box
              sx={{
                position:
                  "absolute",

                left:
                  "70%",

                top:
                  15,

                width:
                  24,

                height:
                  100,

                borderRadius:
                  "50%",

                background:
                  "linear-gradient(180deg, #FFFFFF, #38BDF8, transparent)",

                filter:
                  "blur(6px)",

                animation:
                  "flameSide 0.4s ease-in-out infinite alternate-reverse",
              }}
            />

          </Box>

        </Box>


        {/* =============================================
            TEXT
        ============================================= */}

        <Box
          sx={{
            position:
              "absolute",

            bottom:
              "10%",

            textAlign:
              "center",

            zIndex:
              20,
          }}
        >

          <Typography
            sx={{
              fontSize:
                {
                  xs: 22,
                  sm: 28,
                  md: 34,
                },

              fontWeight:
                800,

              color:
                "#F8FAFC",

              textShadow:
                "0 0 20px rgba(56,189,248,0.6)",
            }}
          >
            Generating your AI Quiz...
          </Typography>


          <Typography
            sx={{
              mt:
                1,

              color:
                "#94A3B8",

              fontSize:
                {
                  xs: 13,
                  sm: 15,
                },
            }}
          >
            Your questions are being prepared.
          </Typography>

        </Box>


        {/* =============================================
            ROCKET ANIMATION
        ============================================= */}

        <style>
          {`

            @keyframes rocketExit {

              0% {
                transform:
                  translate(-50%, -50%);
              }

              100% {
                transform:
                  translate(-50%, -150vh);
              }

            }

          `}
        </style>

      </Box>
    );
  }


  // ===================================================
  // ERROR SCREEN
  // ===================================================

  if (
    error &&
    !quiz
  ) {

    return (
      <Box
        sx={{
          minHeight:
            "100vh",

          width:
            "100vw",

          background:
            "#020617",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          p:
            3,
        }}
      >

        <Card
          sx={{
            width:
              "100%",

            maxWidth:
              600,

            backgroundColor:
              "#1E293B",

            border:
              "1px solid #334155",

            borderRadius:
              3,
          }}
        >

          <CardContent>

            <Alert
              severity="error"
            >
              {error}
            </Alert>

          </CardContent>

        </Card>

      </Box>
    );
  }


  // ===================================================
  // QUIZ SCREEN
  // ===================================================

  if (
    !quiz
  ) {

    return null;

  }


  // ===================================================
  // QUIZ UI
  // ===================================================

  return (
    <Box
      sx={{
        minHeight:
          "100vh",

        width:
          "100vw",

        background:
          "#020617",

        color:
          "#F8FAFC",

        p:
          {
            xs: 2,
            sm: 3,
            md: 5,
          },
      }}
    >

      {/* ===============================================
          QUIZ HEADER
      =============================================== */}

      <Box
        sx={{
          maxWidth:
            1000,

          mx:
            "auto",

          mb:
            4,
        }}
      >

        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            color:
              "#F8FAFC",

            fontSize:
              {
                xs: 28,
                sm: 36,
                md: 44,
              },
          }}
        >
          {quiz.topic}
        </Typography>


        <Typography
          sx={{
            color:
              "#94A3B8",

            mt:
              1,

            fontSize:
              16,
          }}
        >
          Difficulty:{" "}
          {quiz.difficulty}
        </Typography>


        {/* =============================================
            RESULT
        ============================================= */}

        {submitted && (

          <Card
            sx={{
              mt:
                3,

              background:
                "linear-gradient(135deg, #172554, #1E293B)",

              border:
                "1px solid #334155",

              borderRadius:
                3,
            }}
          >

            <CardContent>

              <Typography
                sx={{
                  color:
                    "#38BDF8",

                  fontSize:
                    18,

                  fontWeight:
                    700,
                }}
              >
                Quiz Completed
              </Typography>


              <Typography
                sx={{
                  color:
                    "#F8FAFC",

                  fontSize:
                    32,

                  fontWeight:
                    800,

                  mt:
                    0.5,
                }}
              >
                {score} /{" "}
                {quiz.questions.length}
              </Typography>


              <Typography
                sx={{
                  color:
                    "#94A3B8",

                  mt:
                    0.5,
                }}
              >
                {Math.round(
                  (
                    score /
                    quiz.questions.length
                  ) * 100
                )}
                % correct
              </Typography>

            </CardContent>

          </Card>

        )}

      </Box>


      {/* ===============================================
          QUESTIONS
      =============================================== */}

      <Box
        sx={{
          maxWidth:
            1000,

          mx:
            "auto",
        }}
      >

        {quiz.questions.map(
          (
            question,
            index
          ) => {

            const selectedAnswer =
              answers[
                question.id
              ];

            const correctAnswer =
              question.answer;


            return (
              <Card
                key={
                  question.id
                }
                sx={{
                  backgroundColor:
                    "#1E293B",

                  border:
                    "1px solid #334155",

                  borderRadius:
                    3,

                  mb:
                    3,

                  overflow:
                    "hidden",
                }}
              >

                <CardContent
                  sx={{
                    p:
                      {
                        xs: 2,
                        sm: 3,
                        md: 4,
                      },
                  }}
                >

                  {/* QUESTION */}

                  <Typography
                    sx={{
                      color:
                        "#F8FAFC",

                      fontSize:
                        {
                          xs: 17,
                          sm: 19,
                          md: 21,
                        },

                      fontWeight:
                        700,

                      mb:
                        2,
                    }}
                  >
                    {index + 1}.{" "}
                    {
                      question.question
                    }
                  </Typography>


                  <Divider
                    sx={{
                      borderColor:
                        "#334155",

                      mb:
                        2,
                    }}
                  />


                  {/* OPTIONS */}

                  <RadioGroup
                    value={
                      selectedAnswer ||
                      ""
                    }
                    onChange={(e) =>
                      handleAnswerChange(
                        question.id,
                        e.target.value
                      )
                    }
                  >

                    {Object.entries(
                      question.options
                    ).map(
                      (
                        [
                          key,
                          value,
                        ]
                      ) => {

                        const isCorrect =
                          submitted &&
                          key ===
                            correctAnswer;


                        const isWrongSelected =
                          submitted &&
                          key ===
                            selectedAnswer &&
                          key !==
                            correctAnswer;


                        let optionBackground =
                          "transparent";


                        let optionBorder =
                          "#334155";


                        let optionText =
                          "#CBD5E1";


                        let radioColor =
                          "#64748B";


                        // --------------------------------
                        // CORRECT = GREEN
                        // --------------------------------

                        if (
                          isCorrect
                        ) {

                          optionBackground =
                            "rgba(34,197,94,0.12)";

                          optionBorder =
                            "#22C55E";

                          optionText =
                            "#4ADE80";

                          radioColor =
                            "#22C55E";
                        }


                        // --------------------------------
                        // WRONG SELECTED = RED
                        // --------------------------------

                        if (
                          isWrongSelected
                        ) {

                          optionBackground =
                            "rgba(239,68,68,0.12)";

                          optionBorder =
                            "#EF4444";

                          optionText =
                            "#F87171";

                          radioColor =
                            "#EF4444";
                        }


                        return (
                          <Box
                            key={
                              key
                            }
                            sx={{
                              mb:
                                1,

                              border:
                                `1px solid ${optionBorder}`,

                              backgroundColor:
                                optionBackground,

                              borderRadius:
                                2,

                              transition:
                                "all 0.25s ease",

                              "&:hover":
                                !submitted
                                  ? {
                                      borderColor:
                                        "#6F42C1",

                                      backgroundColor:
                                        "rgba(111,66,193,0.08)",
                                    }
                                  : {},
                            }}
                          >

                            <FormControlLabel
                              value={
                                key
                              }

                              disabled={
                                submitted
                              }

                              control={
                                <Radio
                                  sx={{
                                    color:
                                      radioColor,

                                    "&.Mui-checked":
                                      {
                                        color:
                                          radioColor,
                                      },
                                  }}
                                />
                              }

                              sx={{
                                width:
                                  "100%",

                                m:
                                  0,

                                px:
                                  1,

                                py:
                                  0.5,
                              }}

                              label={
                                <Typography
                                  sx={{
                                    color:
                                      optionText,

                                    fontSize:
                                      {
                                        xs: 14,
                                        sm: 16,
                                      },

                                    fontWeight:
                                      isCorrect ||
                                      isWrongSelected
                                        ? 700
                                        : 400,
                                  }}
                                >
                                  {key}.{" "}
                                  {value}


                                  {/* =================================
                                      CORRECT LABEL
                                  ================================= */}

                                  {isCorrect && (
                                    <Box
                                      component="span"
                                      sx={{
                                        ml:
                                          1,

                                        color:
                                          "#4ADE80",

                                        fontWeight:
                                          800,
                                      }}
                                    >
                                      ✓ Correct
                                    </Box>
                                  )}


                                  {/* =================================
                                      WRONG LABEL
                                  ================================= */}

                                  {isWrongSelected && (
                                    <Box
                                      component="span"
                                      sx={{
                                        ml:
                                          1,

                                        color:
                                          "#F87171",

                                        fontWeight:
                                          800,
                                      }}
                                    >
                                      ✕ Incorrect
                                    </Box>
                                  )}

                                </Typography>
                              }
                            />

                          </Box>
                        );

                      }
                    )}

                  </RadioGroup>

                </CardContent>

              </Card>
            );

          }
        )}


        {/* =============================================
            SUBMIT BUTTON
        ============================================= */}

        {!submitted && (

          <Box
            sx={{
              display:
                "flex",

              justifyContent:
                "center",

              mt:
                4,

              mb:
                6,
            }}
          >

            <Button
              variant="contained"
              onClick={
                handleSubmit
              }
              disabled={
                Object.keys(
                  answers
                ).length === 0
              }
              sx={{
                minWidth:
                  220,

                py:
                  1.5,

                px:
                  4,

                fontSize:
                  17,

                fontWeight:
                  700,

                backgroundColor:
                  "#6F42C1",

                "&:hover": {
                  backgroundColor:
                    "#5B34A4",
                },

                "&:disabled": {
                  backgroundColor:
                    "#334155",

                  color:
                    "#64748B",
                },
              }}
            >
              Submit Quiz
            </Button>

          </Box>

        )}


        {/* =============================================
            AFTER SUBMISSION
        ============================================= */}

        {submitted && (

          <Box
            sx={{
              textAlign:
                "center",

              py:
                5,

              mb:
                5,
            }}
          >

            <Typography
              sx={{
                color:
                  "#4ADE80",

                fontSize:
                  24,

                fontWeight:
                  800,
              }}
            >
              ✓ Answers Checked
            </Typography>


            <Typography
              sx={{
                color:
                  "#94A3B8",

                mt:
                  1,
              }}
            >
              Correct answers are shown
              in green and your selected
              incorrect answers are shown
              in red.
            </Typography>

          </Box>

        )}

      </Box>

    </Box>
  );
}