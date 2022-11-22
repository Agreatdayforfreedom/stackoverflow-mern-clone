import { Router } from "express";
import {
  deleteQuestion,
  getQuestion,
  getQuestions,
  newQuestion,
  updateQuestion,
  getQuestionsByTag,
} from "../controllers/question.controller";
import checkAuth from "../middlewares/checkAuth";

const questionRouter = Router();

questionRouter.get("/", getQuestions);
questionRouter.get("/top", getQuestions);
questionRouter.get("/:id", getQuestion);
questionRouter.get("/tag/:id", getQuestionsByTag);
questionRouter.post("/new", checkAuth, newQuestion);
questionRouter.put("/update/:id", checkAuth, updateQuestion);
questionRouter.delete("/delete/:id", checkAuth, deleteQuestion);

export default questionRouter;
