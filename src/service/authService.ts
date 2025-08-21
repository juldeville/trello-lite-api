import User from "../models/User";
import bcrypt from "bcrypt";
import { UserDocument } from "../models/User";
import jwt from "jsonwebtoken";

async function findUserByEmail(email: string): Promise<UserDocument | null> {
  return User.findOne({ email });
}

async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

function authenticate(plainPassword: string, dbPassword: string): boolean {
  return bcrypt.compareSync(plainPassword, dbPassword);
}

function generateToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export { findUserByEmail, hashPassword, authenticate, generateToken };
