import { Response } from "express";
import config from "../config/config";

function setRefreshCookie(res: Response, token: string) {
  const isProd = config.nodeEnv === "production";

  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/auth",
  });
  res.cookie;
}

function clearRefreshCookie(res: Response) {
  res.clearCookie("refreshToken", { path: "/auth" });
}
export { setRefreshCookie, clearRefreshCookie };
