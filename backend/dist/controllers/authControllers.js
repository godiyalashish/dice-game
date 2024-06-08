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
exports.SignUpController = exports.validateToken = exports.loginController = void 0;
const db_1 = require("../db");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    userName: zod_1.z.string(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = loginSchema.parse(req.body);
            const user = yield db_1.prismaClient.user.findFirst({
                where: {
                    email,
                },
            });
            if (user) {
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (isPasswordValid) {
                    const jwtToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
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
        }
        catch (error) {
            console.log(error);
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({
                    message: "Validation error",
                    errors: error.errors,
                });
            }
            else {
                res.status(500).json({
                    message: "Internal server error",
                });
            }
        }
    });
}
exports.loginController = loginController;
function validateToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.user.userId) {
            const user = yield db_1.prismaClient.user.findFirst({
                where: { id: req.user.userId },
            });
            if (user) {
                res.status(200).json({ points: user.points });
            }
            else {
                res.status(401).json({ message: "invalid token" });
            }
        }
    });
}
exports.validateToken = validateToken;
function SignUpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, userName } = signUpSchema.parse(req.body);
            const userAlreadExists = yield db_1.prismaClient.user.findFirst({
                where: { email },
            });
            if (userAlreadExists) {
                return res.status(409).json({
                    message: "User already exists",
                });
            }
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            yield db_1.prismaClient.user.create({
                data: { email, password: passwordHash, userName, points: 5000 },
            });
            res.status(200).json({ message: "User created" });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({
                    message: "Validation error",
                    errors: error.errors,
                });
            }
            else {
                console.log(error);
                res.status(500).json({
                    message: "Internal server error",
                });
            }
        }
    });
}
exports.SignUpController = SignUpController;
