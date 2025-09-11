import { Router } from "express";
import { registerUser, loginUser, logoutUser, refresh, currentUser } from "../controllers/authController";
import { checkBody } from "../middlewares/checkBody";
const router = Router();

router.post("/register", checkBody(["email", "username", "password"]), registerUser);
router.post("/login", checkBody(["email", "password"]), loginUser);
router.post("/refresh", refresh);
router.get("/current", currentUser);
router.post("/logout", logoutUser);

export default router;
