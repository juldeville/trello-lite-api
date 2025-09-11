// types/express/index.d.ts (or anywhere picked up by TS)
import "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
