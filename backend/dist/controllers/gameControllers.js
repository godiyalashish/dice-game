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
Object.defineProperty(exports, "__esModule", { value: true });
exports.playController = void 0;
const utils_1 = require("../utils");
const zod_1 = require("zod");
const db_1 = require("../db");
const Selection = zod_1.z.enum(["BELOW_7", "EQUAL_7", "ABOVE_7"]);
const bet = zod_1.z.enum(["100", "200", "500"]);
const playSchema = zod_1.z.object({
    selectedOption: Selection,
    bet,
});
function playController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { selectedOption, bet } = playSchema.parse(req.body);
            const userId = req.user.userId;
            const user = yield db_1.prismaClient.user.findFirst({ where: { id: userId } });
            const userPoints = (user === null || user === void 0 ? void 0 : user.points) || 0;
            let newPoints = userPoints - parseInt(bet);
            if (userPoints === 0) {
                return res.status(400).json({
                    message: "ponts are zero",
                });
            }
            const firstDiceNumber = (0, utils_1.randomNumFromInterval)(1, 6);
            const secondDiceNumber = (0, utils_1.randomNumFromInterval)(1, 6);
            const result = firstDiceNumber + secondDiceNumber;
            let userWon = false;
            if (result === 7 && selectedOption === "EQUAL_7") {
                newPoints = newPoints + 5 * parseInt(bet);
                userWon = true;
            }
            else if ((result > 7 && selectedOption === "ABOVE_7") ||
                (result < 7 && selectedOption === "BELOW_7")) {
                newPoints = newPoints + 2 * parseInt(bet);
                userWon = true;
            }
            yield db_1.prismaClient.user.update({
                where: { id: userId },
                data: { points: newPoints },
            });
            res.status(200).json({
                result: [firstDiceNumber, secondDiceNumber],
                newPoints,
                userWon,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: error.errors,
                });
            }
            else {
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
        }
    });
}
exports.playController = playController;
