import { Request, Response } from "express";
import Board from "../models/Board";
import validateBoardBody from "../utils/validateBoardBody";

async function createBoard(req: Request, res: Response) {
  try {
    const result = validateBoardBody(req.body);
    if (!result.valid) {
      return res.status(400).json({ message: "Invalid board data", errors: result.errors });
    }
    const newBoard = new Board({
      ownerId: req.userId,
      name: result.data.name,
      members: result.data.members,
    });
    await newBoard.save();
    return res.status(201).json({ message: "Board created successfully", board: newBoard });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createBoard };
