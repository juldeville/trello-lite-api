export {}; // ensure it's a module

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
