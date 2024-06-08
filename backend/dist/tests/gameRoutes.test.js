"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const db_1 = require("../__mocks__/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils = __importStar(require("../utils"));
vitest_1.vi.mock("../db");
(0, vitest_1.describe)("Game Routes", () => {
    (0, vitest_1.it)("should return zero points response with 400 status", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(jsonwebtoken_1.default, "verify").mockImplementation(() => {
            return Promise.resolve({
                userId: "1234568799",
            });
        });
        db_1.prismaClient.user.findFirst.mockResolvedValue({
            id: 1,
            points: 0,
            password: "12ddddd",
            email: "mail@mail.com",
            userName: "asdasdasd",
        });
        const resp = yield (0, supertest_1.default)(__1.app)
            .post("/game/play")
            .set("Authorization", `Bearer mock_jwt`)
            .send({
            selectedOption: "BELOW_7",
            bet: "100",
        });
        (0, vitest_1.expect)(resp.statusCode).toBe(400);
        (0, vitest_1.expect)(resp.body.message).toBe("ponts are zero");
    }));
    (0, vitest_1.it)("should return with bet won and newpoints as 5200 for 200 bet", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(jsonwebtoken_1.default, "verify").mockImplementation(() => {
            return Promise.resolve({
                userId: "1234568799",
            });
        });
        vitest_1.vi.spyOn(utils, "randomNumFromInterval")
            .mockImplementationOnce(() => 2)
            .mockImplementationOnce(() => 3);
        db_1.prismaClient.user.findFirst.mockResolvedValue({
            id: 1,
            points: 5000,
            password: "12ddddd",
            email: "mail@mail.com",
            userName: "asdasdasd",
        });
        db_1.prismaClient.user.update.mockResolvedValue({
            id: 1,
            points: 5200,
            password: "12ddddd",
            email: "mail@mail.com",
            userName: "asdasdasd",
        });
        const resp = yield (0, supertest_1.default)(__1.app)
            .post("/game/play")
            .set("Authorization", `Bearer mock_jwt`)
            .send({
            selectedOption: "BELOW_7",
            bet: "200",
        });
        (0, vitest_1.expect)(resp.statusCode).toBe(200);
        (0, vitest_1.expect)(resp.body.result).toEqual([2, 3]);
        (0, vitest_1.expect)(resp.body.newPoints).toBe(5200);
        (0, vitest_1.expect)(resp.body.userWon).toBe(true);
    }));
    (0, vitest_1.it)("should return with bet lost and newpoints as 4800 for 200 bet", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(jsonwebtoken_1.default, "verify").mockImplementation(() => {
            return Promise.resolve({
                userId: "1234568799",
            });
        });
        vitest_1.vi.spyOn(utils, "randomNumFromInterval")
            .mockImplementationOnce(() => 5)
            .mockImplementationOnce(() => 3);
        db_1.prismaClient.user.findFirst.mockResolvedValue({
            id: 1,
            points: 5000,
            password: "12ddddd",
            email: "mail@mail.com",
            userName: "asdasdasd",
        });
        db_1.prismaClient.user.update.mockResolvedValue({
            id: 1,
            points: 4800,
            password: "12ddddd",
            email: "mail@mail.com",
            userName: "asdasdasd",
        });
        const resp = yield (0, supertest_1.default)(__1.app)
            .post("/game/play")
            .set("Authorization", `Bearer mock_jwt`)
            .send({
            selectedOption: "BELOW_7",
            bet: "200",
        });
        (0, vitest_1.expect)(resp.statusCode).toBe(200);
        (0, vitest_1.expect)(resp.body.result).toEqual([5, 3]);
        (0, vitest_1.expect)(resp.body.newPoints).toBe(4800);
        (0, vitest_1.expect)(resp.body.userWon).toBe(false);
    }));
});
