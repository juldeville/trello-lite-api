import { Router } from "express";
import { checkBody } from "../middlewares/checkBodyMiddleware";
import { requireAuth } from "../middlewares/auth";
import { createBoard } from "../controllers/boardController";
const router = Router();

router.get("/");
router.post("/new", requireAuth, checkBody(["name"]), createBoard);
router.post("/delete");
router.post("/update");

export default router;
