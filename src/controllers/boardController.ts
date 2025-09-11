import { Request, Response } from "express";
import Board from "../models/Board";
import validateBoardBody from "../utils/validateBoardBody";
import validateBoardUpdateFields from "../utils/validateBoardUpdateFields";
async function getBoards(req: Request, res: Response) {
  try {
    const boards = await Board.find({ ownerId: req.userId });
    return res.status(200).json({ result: true, boards });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ result: false, message: "Internal Server Error" });
  }
}

async function createBoard(req: Request, res: Response) {
  try {
    const result = validateBoardBody(req.body);
    if (!result.valid) {
      return res.status(400).json({ result: false, message: "Invalid board data", errors: result.errors });
    }
    const newBoard = new Board({
      ownerId: req.userId,
      name: result.data.name,
      members: result.data.members,
    });
    await newBoard.save();
    return res.status(201).json({ result: true, board: newBoard });
  } catch (err) {
    return res.status(500).json({ result: false, message: "Internal Server Error" });
  }
}

async function updateBoard(req: Request, res: Response) {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({ result: false, message: "Board ID is required" });
    }
    const result = validateBoardUpdateFields(req.body);
    if (!result.valid) {
      return res.status(400).json({ result: false, message: "Invalid update data", errors: result.errors });
    }
    const board = await Board.findOne({ _id: boardId, ownerId: req.userId });
    if (!board) {
      return res.status(404).json({ result: false, message: "Board not found" });
    }

    board.name = result.data.name;
    board.members = result.data.members;
    await board.save();
    return res.status(200).json({ result: true, board });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ result: false, message: "Internal Server Error" });
  }
}

async function deleteBoard(req: Request, res: Response) {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({ result: false, message: "Board ID is required" });
    }
    const deleteResult = await Board.deleteOne({ _id: boardId, ownerId: req.userId });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ result: false, message: "Board not found" });
    }
    return res.status(200).json({ result: true });
  } catch (err) {
    return res.status(500).json({ result: false, message: "Internal Server Error" });
  }
}

export { createBoard, getBoards, updateBoard, deleteBoard };
