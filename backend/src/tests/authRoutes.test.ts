import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "..";
import bcrypt from "bcrypt";
import { prismaClient } from "../__mocks__/db";
import jwt from "jsonwebtoken";

vi.mock("../db");

describe("Auth routes", () => {
  describe("Login route", () => {
    it("Should return status 400 with validation error", async () => {
      const resp = await request(app)
        .post("/auth/login")
        .send({ email: "", password: "" });
      expect(resp.statusCode).toBe(400);
      expect(resp.body.message).toBe("Validation error");
    });

    it("should return jwt token", async () => {
      prismaClient.user.findFirst.mockResolvedValue({
        id: 1,
        points: 500,
        password: "12ddddd",
        email: "mail@mail.com",
        userName: "asdasdasd",
      });

      vi.spyOn(prismaClient.user, "findFirst");
      vi.spyOn(bcrypt, "compare").mockImplementation(() =>
        Promise.resolve(true)
      );
      vi.spyOn(jwt, "sign").mockImplementation(() => "fakeJwtToken");
      const resp = await request(app).post("/auth/login").send({
        email: "mail@mail.com",
        password: "1234567890",
      });

      expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
        where: {
          email: "mail@mail.com",
        },
      });

      expect(resp.statusCode).toBe(200);
      expect(resp.body.points).toBe(500);
      expect(resp.body.userName).toBe("asdasdasd");
      expect(resp.body.jwt).toBe("fakeJwtToken");
      console.log(resp.body);
    });
  });

  describe("signup route", () => {
    it("should return 400 with validation error", async () => {
      const resp = await request(app).post("/auth/signup").send({
        email: "",
        password: "",
        userName: "",
      });
      expect(resp.statusCode).toBe(400);
      expect(resp.body.message).toBe("Validation error");
    });

    it("should return email already exists", async () => {
      prismaClient.user.findFirst.mockResolvedValue({
        id: 1,
        points: 500,
        password: "12ddddd",
        email: "mail@mail.com",
        userName: "asdasdasd",
      });

      const resp = await request(app).post("/auth/signup").send({
        email: "user@mail.com",
        password: "123432",
        userName: "userAAA",
      });

      expect(resp.statusCode).toBe(409);
      expect(resp.body.message).toBe("User already exists");
    });

    it("should return user created", async () => {
      prismaClient.user.findFirst.mockResolvedValue(null);
      prismaClient.user.create.mockResolvedValue({
        id: 1,
        points: 500,
        password: "12ddddd",
        email: "mail@mail.com",
        userName: "asdasdasd",
      });
      vi.spyOn(prismaClient.user, "findFirst");
      vi.spyOn(bcrypt, "hash").mockImplementation(() => {
        return Promise.resolve("hashedPassword");
      });
      const resp = await request(app).post("/auth/signup").send({
        email: "user@mail.com",
        password: "123432",
        userName: "userAAA",
      });
      expect(prismaClient.user.create).toHaveBeenCalledWith({
        data: {
          email: "user@mail.com",
          password: "hashedPassword",
          userName: "userAAA",
          points: 5000,
        },
      });
      expect(resp.statusCode).toBe(200);
      expect(resp.body.message).toBe("User created");
    });
  });
});
