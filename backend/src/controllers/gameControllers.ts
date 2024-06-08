import express from "express";
import { randomNumFromInterval } from "../utils";
import { number, z } from "zod";
import { prismaClient } from "../db";

const Selection = z.enum(["BELOW_7", "EQUAL_7", "ABOVE_7"]);
const bet = z.enum(["100", "200", "500"]);

const playSchema = z.object({
  selectedOption: Selection,
  bet,
});

export async function playController(
  req: express.Request,
  res: express.Response
) {
  try {
    const { selectedOption, bet } = playSchema.parse(req.body);
    const userId = req.user.userId;
    const user = await prismaClient.user.findFirst({ where: { id: userId } });
    const userPoints = user?.points || 0;
    let newPoints = userPoints - parseInt(bet);
    if (userPoints === 0) {
      return res.status(400).json({
        message: "ponts are zero",
      });
    }
    const firstDiceNumber = randomNumFromInterval(1, 6);
    const secondDiceNumber = randomNumFromInterval(1, 6);
    const result = firstDiceNumber + secondDiceNumber;
    let userWon = false;

    if (result === 7 && selectedOption === "EQUAL_7") {
      newPoints = newPoints + 5 * parseInt(bet);
      userWon = true;
    } else if (
      (result > 7 && selectedOption === "ABOVE_7") ||
      (result < 7 && selectedOption === "BELOW_7")
    ) {
      newPoints = newPoints + 2 * parseInt(bet);
      userWon = true;
    }
    await prismaClient.user.update({
      where: { id: userId },
      data: { points: newPoints },
    });
    res.status(200).json({
      result: [firstDiceNumber, secondDiceNumber],
      newPoints,
      userWon,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
