import express from "express";
import authRouter from "./routes/auth";
import indexRouter from "./routes/index";

const app = express();

app.use(express.json());
app.use("/", indexRouter);
app.use("/auth", authRouter);

export default app;
