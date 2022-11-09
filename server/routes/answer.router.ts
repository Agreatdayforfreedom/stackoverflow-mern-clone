import { Router } from "express";
import { getAnswers, sendAnswer } from "../controllers/answer.controller";
import checkAuth from "../middlewares/checkAuth";

const answerRouter = Router();

answerRouter.get("/:id", getAnswers);
answerRouter.post("/new/:id", checkAuth, sendAnswer);

export default answerRouter;
