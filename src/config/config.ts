import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbUri: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  accessExpires: string;
  refreshExpires: string;
  clientOrigin: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  dbUri: process.env.CONNECTION_STRING!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  accessExpires: process.env.ACCESS_EXPIRES!,
  refreshExpires: process.env.REFRESH_EXPIRES!,
  clientOrigin: process.env.CLIENT_ORIGIN!,
};

export default config;
