import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./utils/userContext.jsx";
import { AppDataProvider } from "./utils/AppDataContext.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppDataProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserProvider>
    </AppDataProvider>
  </React.StrictMode>
);
