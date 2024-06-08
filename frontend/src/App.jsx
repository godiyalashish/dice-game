import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./fonts/SuperMaizen.ttf";
import { useContext, useEffect } from "react";
import { UserContext } from "./utils/userContext";
import Routes from "./routes.jsx";
import { validateToken } from "./services/validateToken.js";
import SnackBar from "./components/snackbar/index.jsx";
import { Box } from "@mui/material";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUserPoints } =
    useContext(UserContext);
  useEffect(() => {
    (() => {
      validateToken().then((resp) => {
        if (resp && resp.status !== "error") {
          setUserPoints(resp.data.points);
          setIsAuthenticated(true);
          return;
        }
        setIsAuthenticated(false);
      });
    })();
  }, []);
  return (
    <Box className="background">
      <RouterProvider
        router={isAuthenticated ? Routes.privateRoutes : Routes.publiRoutes}
      />
      <SnackBar />
    </Box>
  );
}

export default App;
