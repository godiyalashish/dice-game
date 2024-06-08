import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../services/login";
import { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import { Link } from "react-router-dom";
import "./styles.css";
import { textFieldStyles } from "../../utils/constants";
import { AppDataContext } from "../../utils/AppDataContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { setIsAuthenticated, setUserPoints } = useContext(UserContext);
  const { setAlertData } = useContext(AppDataContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const resp = await login(values);
      if (resp && resp.status !== "error") {
        setIsAuthenticated(true);
        localStorage.setItem("jwt", resp.data.jwt);
        localStorage.setItem("userName", resp.data.userName);
        setUserPoints(resp.data.points);
        return;
      }

      setIsAuthenticated(false);
      setAlertData({
        message: "Login failed",
        severity: "error",
        show: true,
      });
    },
  });

  return (
    <Box
      pt="3rem"
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h2" color="secondary">
        7UP7DOWN
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        alignItems="center"
        rowGap="2.5rem"
      >
        <Box className="loginBackground">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
            display={"flex"}
            flexDirection="column"
          >
            <TextField
              variant="outlined"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              color="secondary"
              sx={textFieldStyles}
            />
            {!(formik.touched.email && Boolean(formik.errors.email)) && (
              <p style={{ height: "19.91px" }}></p>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              color="secondary"
              sx={textFieldStyles}
            />
            {!(formik.touched.password && Boolean(formik.errors.password)) && (
              <p style={{ height: "19.91px" }}></p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Typography variant="h5">
          Don't have account{" "}
          <Link to="/signup" style={{ color: "#FFDC5D" }}>
            Sign up here
          </Link>{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
