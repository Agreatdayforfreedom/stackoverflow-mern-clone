import express, { Request, Response } from "express";
import authRouter from "./routes/auth.router";
import dotenv from "dotenv";
import questionRouter from "./routes/question.router";
import answerRouter from "./routes/answer.router";
import cors from "cors";
import voteRouter from "./routes/vote.router";
import commentRouter from "./routes/comment.router";
import tagRouter from "./routes/tag.router";
import userRouter from "./routes/user.router";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/healthz", (_request: Request, response: Response) => {
  return response.sendStatus(200);
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);
app.use("/api/vote", voteRouter);
app.use("/api/comment", commentRouter);
app.use("/api/tags", tagRouter);

export default app;
