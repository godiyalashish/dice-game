import express from "express";
import {
  SignUpController,
  loginController,
  validateToken,
} from "../controllers/authControllers";
import validUser from "../middlewares/validUser";
const authRouter = express.Router();

authRouter.post("/login", loginController);

authRouter.get("/validate-token", validUser, validateToken);

authRouter.post("/signup", SignUpController);

export default authRouter;
