import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./fonts/SuperMaizen.ttf";
import { useContext, useEffect } from "react";
import { UserContext } from "./utils/userContext";
import Routes from "./routes.jsx";
import { validateToken } from "./services/validateToken.js";
import SnackBar from "./components/snackbar/index.jsx";
import { Box } from "@mui/material";
import Loader from "./components/Backdrop/index.jsx";
import { AppDataContext } from "./utils/AppDataContext.jsx";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUserPoints } =
    useContext(UserContext);
  const { setShowLoading } = useContext(AppDataContext);
  useEffect(() => {
    (() => {
      setShowLoading(true);
      validateToken().then((resp) => {
        if (resp && resp.status !== "error") {
          setUserPoints(resp.data.points);
          setIsAuthenticated(true);
          setShowLoading(false);
          return;
        }
        setShowLoading(false);
        setIsAuthenticated(false);
      });
    })();
  }, []);
  return (
    <>
      <Loader />
      <Box className="background">
        <RouterProvider
          router={isAuthenticated ? Routes.privateRoutes : Routes.publiRoutes}
        />
        <SnackBar />
      </Box>
    </>
  );
}

export default App;
