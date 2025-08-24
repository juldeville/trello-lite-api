import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { checkBody } from "../middlewares/checkBodyMiddleware";
const router = Router();

router.post("/register", checkBody(["email", "name", "password"]), registerUser);
router.post("/login", checkBody(["email", "password"]), loginUser);

export default router;
