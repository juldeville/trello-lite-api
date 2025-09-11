import { Router } from "express";
import { checkBody } from "../middlewares/checkBody";
import { requireAuth } from "../middlewares/auth";
import { createBoard, getBoards, updateBoard, deleteBoard } from "../controllers/boardController";
const router = Router();

router.get("/", requireAuth, getBoards);
router.post("/new", requireAuth, checkBody(["name"]), createBoard);
router.put("/update/:boardId", requireAuth, updateBoard);
router.delete("/delete/:boardId", requireAuth, deleteBoard);

export default router;
