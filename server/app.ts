import express from "express";
import authRouter from "./routes/auth.router";
import dotenv from "dotenv";
import questionRouter from "./routes/question.router";
import answerRouter from "./routes/answer.router";
import cors from "cors";
import voteRouter from "./routes/vote.router";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// query1();

//routes
app.use("/api/auth", authRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);
app.use("/api/vote", voteRouter);

export default app;
