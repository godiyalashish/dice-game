import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../../services/signup";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppDataContext } from "../../utils/AppDataContext";
import { textFieldStyles } from "../../utils/constants";
import "./styles.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  userName: Yup.string()
    .min(6, "Username should be of minimum 6 characters")
    .max(12, "username should be less than 13 characters")
    .required("username is required"),
  password: Yup.string()
    .min(6, "password should be of atleast of 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const { setAlertData } = useContext(AppDataContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const resp = await signup(values);
      if (
        resp &&
        resp.status !== "error" &&
        resp.status !== "registeredEmail"
      ) {
        setAlertData({
          show: true,
          message: "Signup Successfully now login to continue.",
          severity: "success",
        });
        return;
      } else if (resp.status === "registeredEmail") {
        setAlertData({
          show: true,
          message: "Email already registered",
          severity: "error",
        });
        return;
      }
      setAlertData({
        show: true,
        message: "Failed to Signup please try again later!",
        severity: "error",
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
        <Box className="signUpBackground">
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
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
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              color="secondary"
              sx={textFieldStyles}
            />
            {!(formik.touched.userName && Boolean(formik.errors.userName)) && (
              <p style={{ height: "19.91px" }}></p>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
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
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Typography variant="h5">
          Already have account{" "}
          <Link to="/" style={{ color: "#FFDC5D" }}>
            Login here
          </Link>{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
