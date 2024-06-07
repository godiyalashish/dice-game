import jwt from "jsonwebtoken";
import express from "express";
import * as dotenv from "dotenv";
import { decode } from "punycode";
dotenv.config();

interface User {
  userId: number;
}

interface jwtPayload {
  userId: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}

const validUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }
  token = token.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwtPayload;
    req.user = {
      userId: decoded.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default validUser;
