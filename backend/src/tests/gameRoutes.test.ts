import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "..";
import bcrypt from "bcrypt";
import { prismaClient } from "../__mocks__/db";
import jwt from "jsonwebtoken";
import * as utils from "../utils";

vi.mock("../db");

describe("Game Routes", () => {
  it("should return zero points response with 400 status", async () => {
    vi.spyOn(jwt, "verify").mockImplementation(() => {
      return Promise.resolve({
        userId: "1234568799",
      });
    });
    prismaClient.user.findFirst.mockResolvedValue({
      id: 1,
      points: 0,
      password: "12ddddd",
      email: "mail@mail.com",
      userName: "asdasdasd",
    });
    const resp = await request(app)
      .post("/game/play")
      .set("Authorization", `Bearer mock_jwt`)
      .send({
        selectedOption: "BELOW_7",
        bet: "100",
      });
    expect(resp.statusCode).toBe(400);
    expect(resp.body.message).toBe("ponts are zero");
  });

  it("should return with bet won and newpoints as 5200 for 200 bet", async () => {
    vi.spyOn(jwt, "verify").mockImplementation(() => {
      return Promise.resolve({
        userId: "1234568799",
      });
    });
    vi.spyOn(utils, "randomNumFromInterval")
      .mockImplementationOnce(() => 2)
      .mockImplementationOnce(() => 3);

    prismaClient.user.findFirst.mockResolvedValue({
      id: 1,
      points: 5000,
      password: "12ddddd",
      email: "mail@mail.com",
      userName: "asdasdasd",
    });

    prismaClient.user.update.mockResolvedValue({
      id: 1,
      points: 5200,
      password: "12ddddd",
      email: "mail@mail.com",
      userName: "asdasdasd",
    });

    const resp = await request(app)
      .post("/game/play")
      .set("Authorization", `Bearer mock_jwt`)
      .send({
        selectedOption: "BELOW_7",
        bet: "200",
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.result).toEqual([2, 3]);
    expect(resp.body.newPoints).toBe(5200);
    expect(resp.body.userWon).toBe(true);
  });
  it("should return with bet lost and newpoints as 4800 for 200 bet", async () => {
    vi.spyOn(jwt, "verify").mockImplementation(() => {
      return Promise.resolve({
        userId: "1234568799",
      });
    });
    vi.spyOn(utils, "randomNumFromInterval")
      .mockImplementationOnce(() => 5)
      .mockImplementationOnce(() => 3);

    prismaClient.user.findFirst.mockResolvedValue({
      id: 1,
      points: 5000,
      password: "12ddddd",
      email: "mail@mail.com",
      userName: "asdasdasd",
    });

    prismaClient.user.update.mockResolvedValue({
      id: 1,
      points: 4800,
      password: "12ddddd",
      email: "mail@mail.com",
      userName: "asdasdasd",
    });

    const resp = await request(app)
      .post("/game/play")
      .set("Authorization", `Bearer mock_jwt`)
      .send({
        selectedOption: "BELOW_7",
        bet: "200",
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.result).toEqual([5, 3]);
    expect(resp.body.newPoints).toBe(4800);
    expect(resp.body.userWon).toBe(false);
  });
});
