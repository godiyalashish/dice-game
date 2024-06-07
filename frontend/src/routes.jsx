import { createBrowserRouter } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import GameScreen from "./screens/Game";

const Routes = {
  privateRoutes: createBrowserRouter([
    {
      path: "/*",
      element: <GameScreen />,
    },
  ]),

  publiRoutes: createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]),
};

export default Routes;
