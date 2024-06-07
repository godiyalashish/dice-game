import express from "express";
import authRouter from "./routes/authRoutes";
import gameRouter from "./routes/gameRouter";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/auth", authRouter);
app.use("/game", gameRouter);
