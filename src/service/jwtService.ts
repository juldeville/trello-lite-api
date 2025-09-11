import jwt from "jsonwebtoken";
import config from "../config/config";

export const signAccessToken = (payload: object): string => jwt.sign(payload, config.jwtSecret, { expiresIn: config.accessExpires });

export const signRefreshToken = (payload: object): string => jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: config.refreshExpires });

export const verifyAccessToken = (token: string) => jwt.verify(token, config.jwtSecret);

export const verifyRefreshToken = (token: string) => jwt.verify(token, config.jwtRefreshSecret);
