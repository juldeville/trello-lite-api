import express from "express";
import authRouter from "./routes/auth";
import indexRouter from "./routes/index";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // your frontend
    credentials: true, // only if you’ll use cookies
  })
);

app.use(express.json());
app.use("/", indexRouter);
app.use("/auth", authRouter);

export default app;
