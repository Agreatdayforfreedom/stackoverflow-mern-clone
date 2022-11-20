import { Router } from "express";
import {
  deleteAnswer,
  editAnswer,
  editComment,
  getAnswer,
  getAnswers,
  sendAnswer,
  sendComment,
} from "../controllers/answer.controller";
import checkAuth from "../middlewares/checkAuth";

const answerRouter = Router();

answerRouter.get("/:id", getAnswers);
answerRouter.get("/get/:id", checkAuth, getAnswer);
answerRouter.post("/new/:id", checkAuth, sendAnswer);
answerRouter.put("/edit/:id", checkAuth, editAnswer);
answerRouter.delete("/delete/:id", checkAuth, deleteAnswer);
answerRouter.post("/comment/new/:id", checkAuth, sendComment);
answerRouter.put("/comment/edit/:id", checkAuth, editComment);

export default answerRouter;
