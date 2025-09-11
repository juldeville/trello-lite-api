import { Response, Request, NextFunction } from "express";
import type { TokenPayload } from "../controllers/authController";
import { verifyAccessToken } from "../service/jwtService";
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ message: "No token provided" });
  try {
    const payload = verifyAccessToken(auth.split(" ")[1]) as TokenPayload;
    req.userId = payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
export { requireAuth };
