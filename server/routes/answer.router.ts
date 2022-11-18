import { Router } from "express";
import {
  deleteAnswer,
  editAnswer,
  getAnswer,
  getAnswers,
  sendAnswer,
} from "../controllers/answer.controller";
import checkAuth from "../middlewares/checkAuth";

const answerRouter = Router();

answerRouter.get("/:id", getAnswers);
answerRouter.get("/get/:id", checkAuth, getAnswer);
answerRouter.post("/new/:id", checkAuth, sendAnswer);
answerRouter.put("/edit/:id", checkAuth, editAnswer);
answerRouter.delete("/delete/:id", checkAuth, deleteAnswer);

export default answerRouter;
