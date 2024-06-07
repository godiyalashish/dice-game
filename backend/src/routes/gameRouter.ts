import express from "express";
import { playController } from "../controllers/gameControllers";
import validUser from "../middlewares/validUser";
const gameRouter = express.Router();

gameRouter.use(validUser);
gameRouter.post("/play", playController);

export default gameRouter;
