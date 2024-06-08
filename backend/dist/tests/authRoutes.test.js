"use strict";
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../__mocks__/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
vitest_1.vi.mock("../db");
(0, vitest_1.describe)("Auth routes", () => {
    (0, vitest_1.describe)("Login route", () => {
        (0, vitest_1.it)("Should return status 400 with validation error", () => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(__1.app)
                .post("/auth/login")
                .send({ email: "", password: "" });
            (0, vitest_1.expect)(resp.statusCode).toBe(400);
            (0, vitest_1.expect)(resp.body.message).toBe("Validation error");
        }));
        (0, vitest_1.it)("should return jwt token", () => __awaiter(void 0, void 0, void 0, function* () {
            db_1.prismaClient.user.findFirst.mockResolvedValue({
                id: 1,
                points: 500,
                password: "12ddddd",
                email: "mail@mail.com",
                userName: "asdasdasd",
            });
            vitest_1.vi.spyOn(db_1.prismaClient.user, "findFirst");
            vitest_1.vi.spyOn(bcrypt_1.default, "compare").mockImplementation(() => Promise.resolve(true));
            vitest_1.vi.spyOn(jsonwebtoken_1.default, "sign").mockImplementation(() => "fakeJwtToken");
            const resp = yield (0, supertest_1.default)(__1.app).post("/auth/login").send({
                email: "mail@mail.com",
                password: "1234567890",
            });
            (0, vitest_1.expect)(db_1.prismaClient.user.findFirst).toHaveBeenCalledWith({
                where: {
                    email: "mail@mail.com",
                },
            });
            (0, vitest_1.expect)(resp.statusCode).toBe(200);
            (0, vitest_1.expect)(resp.body.points).toBe(500);
            (0, vitest_1.expect)(resp.body.userName).toBe("asdasdasd");
            (0, vitest_1.expect)(resp.body.jwt).toBe("fakeJwtToken");
            console.log(resp.body);
        }));
    });
    (0, vitest_1.describe)("signup route", () => {
        (0, vitest_1.it)("should return 400 with validation error", () => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield (0, supertest_1.default)(__1.app).post("/auth/signup").send({
                email: "",
                password: "",
                userName: "",
            });
            (0, vitest_1.expect)(resp.statusCode).toBe(400);
            (0, vitest_1.expect)(resp.body.message).toBe("Validation error");
        }));
        (0, vitest_1.it)("should return email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            db_1.prismaClient.user.findFirst.mockResolvedValue({
                id: 1,
                points: 500,
                password: "12ddddd",
                email: "mail@mail.com",
                userName: "asdasdasd",
            });
            const resp = yield (0, supertest_1.default)(__1.app).post("/auth/signup").send({
                email: "user@mail.com",
                password: "123432",
                userName: "userAAA",
            });
            (0, vitest_1.expect)(resp.statusCode).toBe(409);
            (0, vitest_1.expect)(resp.body.message).toBe("User already exists");
        }));
        (0, vitest_1.it)("should return user created", () => __awaiter(void 0, void 0, void 0, function* () {
            db_1.prismaClient.user.findFirst.mockResolvedValue(null);
            db_1.prismaClient.user.create.mockResolvedValue({
                id: 1,
                points: 500,
                password: "12ddddd",
                email: "mail@mail.com",
                userName: "asdasdasd",
            });
            vitest_1.vi.spyOn(db_1.prismaClient.user, "findFirst");
            vitest_1.vi.spyOn(bcrypt_1.default, "hash").mockImplementation(() => {
                return Promise.resolve("hashedPassword");
            });
            const resp = yield (0, supertest_1.default)(__1.app).post("/auth/signup").send({
                email: "user@mail.com",
                password: "123432",
                userName: "userAAA",
            });
            (0, vitest_1.expect)(db_1.prismaClient.user.create).toHaveBeenCalledWith({
                data: {
                    email: "user@mail.com",
                    password: "hashedPassword",
                    userName: "userAAA",
                    points: 5000,
                },
            });
            (0, vitest_1.expect)(resp.statusCode).toBe(200);
            (0, vitest_1.expect)(resp.body.message).toBe("User created");
        }));
    });
});
