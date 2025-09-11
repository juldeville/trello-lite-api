import express from "express";
import authRouter from "./routes/auth";
import boardsRouter from "./routes/boards";
import indexRouter from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // your frontend
    credentials: true, // only if you’ll use cookies
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/boards", boardsRouter);

export default app;
