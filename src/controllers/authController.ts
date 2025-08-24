import { Request, Response } from "express";
import { findUserByEmail, hashPassword, generateToken, authenticate } from "../service/authService";
import { User } from "../models/User";
async function registerUser(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body;

    // Validate and create user logic here
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    // Create user in the database
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();
    const token = generateToken({ id: newUser._id });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Validate and login user logic here
    const user = await findUserByEmail(email);
    if (!user || !authenticate(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user._id });
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { registerUser, loginUser };
