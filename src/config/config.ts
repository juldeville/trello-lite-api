import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbUri: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  accessExpires: jwt.SignOptions["expiresIn"];
  refreshExpires: jwt.SignOptions["expiresIn"];
  clientOrigin: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  dbUri: process.env.CONNECTION_STRING!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  accessExpires: process.env.ACCESS_EXPIRES! as jwt.SignOptions["expiresIn"],
  refreshExpires: process.env.REFRESH_EXPIRES! as jwt.SignOptions["expiresIn"],
  clientOrigin: process.env.CLIENT_ORIGIN!,
};

export default config;
