// import { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   CircularProgress,
//   Link,
// } from "@mui/material";
// import { Link as RouterLink, useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../store/authSlice";
// import { login } from "../../services/authService"; 

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

// const handleLogin = async () => {
//   try {
//     setLoading(true);
//     setError("");

//     const response = await login(
//       form.email,
//       form.password
//     );

//     dispatch(
//       loginSuccess({
//         token: response.access_token,
//         user: response.user,
//       })
//     );

//     navigate("/dashboard");

//   } catch (err) {
//     setError(
//       err.response?.data?.detail ||
//       "Login Failed"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#0F172A",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           width: 450,
//           p: 5,
//           bgcolor: "#1E293B",
//           border: "1px solid #334155",
//           borderRadius: 4,
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight={700}
//           color="#F8FAFC"
//         >
//           Welcome Back
//         </Typography>

//         <Typography
//           mt={1}
//           mb={3}
//           color="#94A3B8"
//         >
//           Login to AI-LMS
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           type="password"
//           label="Password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//         />

//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             mt: 3,
//             height: 48,
//             bgcolor: "#0056D2",
//           }}
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <CircularProgress
//               size={24}
//               sx={{ color: "#fff" }}
//             />
//           ) : (
//             "Login"
//           )}
//         </Button>

//         <Box
//           mt={3}
//           display="flex"
//           justifyContent="space-between"
//         >
//           <Link
//             component={RouterLink}
//             to="/forgot-password"
//             underline="none"
//           >
//             Forgot Password?
//           </Link>

//           <Link
//             component={RouterLink}
//             to="/register"
//             underline="none"
//           >
//             Register
//           </Link>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Psychology,
  Description,
  Quiz,
  School,
  Timeline,
  WorkspacePremium,
} from "@mui/icons-material";

import { loginUser } from "../../api/authApi";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {

      setLoading(true);
      setError("");

      const response = await loginUser(form);

      localStorage.setItem(
        "access_token",
        response.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.detail ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0F172A",
        display: "flex",
      }}
    >

      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >

        {/* LEFT PANEL */}

        <Box
          component={motion.div}
          initial={{
            x: -60,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: .7,
          }}
          sx={{
            width: {
              xs: "100%",
              md: "40%",
            },
            bgcolor: "#1E293B",
            color: "#F8FAFC",
            p: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: {
              md: "1px solid #334155",
            },
            borderBottom: {
              xs: "1px solid #334155",
              md: "none",
            },
          }}
        >

          <Typography
            variant="h3"
            fontWeight={700}
          >
            AI-LMS
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#94A3B8",
              fontSize: 22,
            }}
          >
            Learn. Build. Grow.
          </Typography>

          <Typography
            sx={{
              mt: 4,
              color: "#94A3B8",
              lineHeight: 1.8,
            }}
          >
            Your Intelligent Learning Companion
          </Typography>

          <Divider
            sx={{
              my: 4,
              borderColor: "#334155",
            }}
          />

          {/* <Feature
            icon={<Psychology />}
            title="AI Interview Preparation"
          />

          <Feature
            icon={<Description />}
            title="Resume Analysis"
          />

          <Feature
            icon={<School />}
            title="Personalized Study Planner"
          />

          <Feature
            icon={<Quiz />}
            title="Mock Tests & Quiz Practice"
          />

          <Feature
            icon={<Timeline />}
            title="Smart Course Management"
          />

          <Feature
            icon={<WorkspacePremium />}
            title="Progress Tracking"
          />

          <Feature
            icon={<WorkspacePremium />}
            title="Digital Certificates"
          /> */}

          {/* <Divider
            sx={{
              my: 4,
              borderColor: "#334155",
            }}
          /> */}

          <Typography
            color="#64748B" 
            fontStyle="italic"
          >
            "Education Powered by
            Artificial Intelligence"
          </Typography>

        </Box>

                {/* RIGHT PANEL */}

        <Box
          component={motion.div}
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          sx={{
            width: {
              xs: "100%",
              md: "60%",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            bgcolor: "#0F172A",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: {
                xs: "100%",
                sm: 480,
              },
              p: 5,
              borderRadius: 4,
              bgcolor: "#1E293B",
              color: "#F8FAFC",
              border: "1px solid #334155",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              color="#F8FAFC"
            >
              Welcome Back 👋
            </Typography>

            <Typography
              sx={{
                mt: 1,
                mb: 4,
                color: "#94A3B8",
              }}
            >
              Login to continue learning
            </Typography>

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

            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                    sx={{
                      color: "#94A3B8",

                      "&.Mui-checked": {
                        color: "#0056D2",
                      },
                    }}
                  />
                }
                label="Remember Me"
              />

              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="hover"
                color="#0056D2"
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                bgcolor: "#0056D2",
                height: 52,
                borderRadius: 2,

                "&:hover": {
                  bgcolor: "#0046B0",
                },
              }}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Login"
              )}
            </Button>

            <Typography
              mt={4}
              textAlign="center"
              color="#94A3B8"
            >
              Don't have an account?{" "}

              <Link
                component={RouterLink}
                to="/register"
                underline="hover"
                color="#0056D2"
              >
                Register
              </Link>
            </Typography>

          </Paper>

        </Box>

      </Box>

    </Box>

  );
}

function Feature({ icon, title }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={3}
    >
      <Box
        sx={{
          width: 45,
          height: 45,
          bgcolor: "#0056D2",
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#F8FAFC",
        }}
      >
        {icon}
      </Box>

      <Typography
        color="#F8FAFC"
        fontSize={16}
      >
        {title}
      </Typography>

    </Box>
  );
}