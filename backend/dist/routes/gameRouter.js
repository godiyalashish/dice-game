"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameControllers_1 = require("../controllers/gameControllers");
const validUser_1 = __importDefault(require("../middlewares/validUser"));
const gameRouter = express_1.default.Router();
gameRouter.use(validUser_1.default);
gameRouter.post("/play", gameControllers_1.playController);
exports.default = gameRouter;
