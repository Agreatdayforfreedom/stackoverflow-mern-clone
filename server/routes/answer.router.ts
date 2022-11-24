import { Router } from "express";
import {
  acceptAnswer,
  deleteAnswer,
  editAnswer,
  getAnswer,
  getAnswers,
  getRelatedAnswers,
  sendAnswer,
} from "../controllers/answer.controller";
import checkAuth from "../middlewares/checkAuth";

const answerRouter = Router();

answerRouter.get("/:id", getAnswers);
answerRouter.get("/get/:id", checkAuth, getAnswer);
answerRouter.get("/related/:id", getRelatedAnswers);
answerRouter.post("/new/:id", checkAuth, sendAnswer);
answerRouter.put("/edit/:id", checkAuth, editAnswer);
answerRouter.put("/accept/:id", checkAuth, acceptAnswer);
answerRouter.delete("/delete/:id", checkAuth, deleteAnswer);

export default answerRouter;
