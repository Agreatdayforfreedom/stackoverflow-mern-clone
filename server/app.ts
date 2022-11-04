import express from "express";
import authRouter from "./routes/auth.router";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(express.json());

//routes
app.use("/api/auth", authRouter);

export default app;
