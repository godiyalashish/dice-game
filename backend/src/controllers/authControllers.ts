import express from "express";
import { prismaClient } from "../db";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  userName: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function loginController(
  req: express.Request,
  res: express.Response
) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        return res.status(200).json({
          jwt: jwtToken,
          userName: user.userName,
          points: user.points,
        });
      }
    }
    return res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export async function validateToken(
  req: express.Request,
  res: express.Response
) {
  if (req.user.userId) {
    const user = await prismaClient.user.findFirst({
      where: { id: req.user.userId },
    });
    if (user) {
      res.status(200).json({ points: user.points });
    } else {
      res.status(401).json({ message: "invalid token" });
    }
  }
}

export async function SignUpController(
  req: express.Request,
  res: express.Response
) {
  try {
    const { email, password, userName } = signUpSchema.parse(req.body);
    const userAlreadExists = await prismaClient.user.findFirst({
      where: { email },
    });
    if (userAlreadExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await prismaClient.user.create({
      data: { email, password: passwordHash, userName, points: 5000 },
    });
    res.status(200).json({ message: "User created" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
