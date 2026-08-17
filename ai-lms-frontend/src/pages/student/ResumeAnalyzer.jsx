import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Divider,
  LinearProgress,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";

import StudentLayout from "../../layouts/StudentLayout";

import { analyzeResume } from "../../services/resumeService";

export default function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const MAX_FILE_SIZE = 3 * 1024 * 1024;

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (!allowedTypes.includes(file.type)) {
    setError(
      "Only PDF, DOCX, and TXT files are allowed."
    );

    setSelectedFile(null);
    event.target.value = "";

    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    setError(
      "Resume file size must not exceed 3 MB."
    );

    setSelectedFile(null);
    event.target.value = "";

    return;
  }

  setError("");
  setSelectedFile(file);
};

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select your resume first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setAnalysis(null);

      const response = await analyzeResume(
        selectedFile
      );

      console.log(
        "Resume Analysis Response:",
        response
      );

      setAnalysis(response);

      setSuccess(
        "Resume analyzed successfully."
      );
    } catch (err) {
      console.error(
        "Resume Analysis Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to analyze resume."
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
          Resume Analyzer
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mt: 1,
          }}
        >
          Upload your resume and get AI-powered
          feedback about your skills, strengths,
          weaknesses and suitable roles.
        </Typography>
      </Box>

      {/* UPLOAD CARD */}

      <Card
        sx={{
          backgroundColor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 3,
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
            <DescriptionIcon
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
              Upload Resume
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

          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            fullWidth
            sx={{
              height: 60,
              mt: 1,
              fontSize: 13,
              color: "#94A3B8",
              borderColor: "#334155",

              "&:hover": {
                borderColor: "#6F42C1",
              },
            }}
          >
            Choose Resume (Supported formats: PDF, DOCX, TXT)
            <br />
               Maximum file size: 3 MB

            <input
              type="file"
              hidden
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
            />
          </Button>

          {selectedFile && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: "#0F172A",
                borderRadius: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#F8FAFC",
                  fontWeight: 600,
                }}
              >
                Selected File
              </Typography>

              <Typography
                sx={{
                  color: "#94A3B8",
                  mt: 0.5,
                }}
              >
                {selectedFile.name}
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  fontSize: 13,
                  mt: 0.5,
                }}
              >
                {(
                  selectedFile.size /
                  1024
                ).toFixed(2)}{" "}
                KB
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleAnalyze}
            disabled={
              !selectedFile || loading
            }
            sx={{
              mt: 3,
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
              "Analyze Resume"
              
            )}<br />
            {/* <Typography
               sx={{
                 color: "#64748B",
                 mt: 1,
                 fontSize: 13,
               }}
             >
               Supported formats: PDF, DOCX, TXT
               <br />
               Maximum file size: 3 MB
            </Typography> */}
          </Button>
        </CardContent>
      </Card>

      {/* ANALYSIS RESULT */}

      {analysis && (
        <Box>
          {/* SCORE */}

          <Card
            sx={{
              backgroundColor: "#1E293B",
              border: "1px solid #334155",
              borderRadius: 3,
              mb: 3,
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
                Resume Score
              </Typography>

              <Typography
                sx={{
                  color: "#6F42C1",
                  fontSize: 42,
                  fontWeight: 800,
                }}
              >
                {analysis.resume_score}/100
              </Typography>

              <LinearProgress
                variant="determinate"
                value={Math.min(
                  Number(
                    analysis.resume_score || 0
                  ),
                  100
                )}
                sx={{
                  mt: 2,
                  height: 8,
                  borderRadius: 5,
                  backgroundColor:
                    "#334155",

                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      "#6F42C1",
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* SKILLS */}

          <ResultCard
            title="Skills"
            items={analysis.skills}
          />

          {/* STRENGTHS */}

          <ResultCard
            title="Strengths"
            items={analysis.strengths}
          />

          {/* WEAKNESSES */}

          <ResultCard
            title="Weaknesses"
            items={analysis.weaknesses}
          />

          {/* RECOMMENDED ROLES */}

          <ResultCard
            title="Recommended Roles"
            items={
              analysis.recommended_roles
            }
          />

          {/* SUGGESTIONS */}

          <ResultCard
            title="Suggestions"
            items={analysis.suggestions}
          />
        </Box>
      )}
    </StudentLayout>
  );
}


/* ========================================= */
/* RESULT CARD                               */
/* ========================================= */

function ResultCard({ title, items }) {
  return (
    <Card
      sx={{
        backgroundColor: "#1E293B",
        border: "1px solid #334155",
        borderRadius: 3,
        mb: 3,
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
          {title}
        </Typography>

        <Divider
          sx={{
            borderColor: "#334155",
            mb: 2,
          }}
        />

        {Array.isArray(items) &&
        items.length > 0 ? (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
          >
            {items.map((item, index) => (
              <Chip
                key={index}
                label={item}
                sx={{
                  color: "#F8FAFC",
                  backgroundColor:
                    "#334155",
                }}
              />
            ))}
          </Stack>
        ) : (
          <Typography
            sx={{
              color: "#64748B",
            }}
          >
            No information available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}