import { Request, Response } from "express";
import { findUserByEmail, hashPassword, authenticate } from "../service/authService";
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "../service/jwtService";
import { setRefreshCookie, clearRefreshCookie } from "../service/cookieService";
import { User } from "../models/User";
import { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  id: string;
}

async function registerUser(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;

    // Validate and create user logic here
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ result: false, message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    // Create user in the database
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    const refreshToken = signRefreshToken({ id: newUser._id });
    setRefreshCookie(res, refreshToken);

    const accessToken = signAccessToken({ id: newUser._id });

    res.status(201).json({ result: true, accessToken });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Validate and login user logic here
    const user = await findUserByEmail(email);
    if (!user || !authenticate(password, user.password)) {
      return res.status(401).json({ result: false, message: "Invalid email or password" });
    }

    const refreshToken = signRefreshToken({ id: user._id });
    setRefreshCookie(res, refreshToken);

    const accessToken = signAccessToken({ id: user._id });
    res.status(200).json({ result: true, accessToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
}

async function refresh(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ result: false, message: "No refresh token provided" });

  try {
    const payload = verifyRefreshToken(token) as TokenPayload;
    const newRefresh = signRefreshToken({ id: payload.id });
    setRefreshCookie(res, newRefresh);

    const accessToken = signAccessToken({ id: payload.id });
    res.status(200).json({ result: true, accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    clearRefreshCookie(res);
    res.status(500).json({ result: false, message: "Internal server error" });
  }
}

async function currentUser(req: Request, res: Response) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ result: false, message: "No token provided" });
  }
  try {
    const payload = verifyAccessToken(auth.split(" ")[1]) as TokenPayload;
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }
    res.status(200).json({ result: true, user: { id: user._id, email: user.email, username: user.username } });
  } catch (error) {
    console.error("Error fetching current user:", error);

    res.status(401).json({ result: false, message: "Invalid or expired token" });
  }
}

async function logoutUser(req: Request, res: Response) {
  clearRefreshCookie(res);
  res.status(200).json({ result: true });
}

export { registerUser, loginUser, refresh, currentUser, logoutUser };
