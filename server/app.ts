import express from "express";
import authRouter from "./routes/auth.router";
import dotenv from "dotenv";
import questionRouter from "./routes/question.router";
import answerRouter from "./routes/answer.router";

const app = express();

dotenv.config();
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);

export default app;
