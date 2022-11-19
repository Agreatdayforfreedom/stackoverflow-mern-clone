import { Router } from "express";
import {
  deleteQuestion,
  editComment,
  getQuestion,
  getQuestions,
  newQuestion,
  sendComment,
  updateQuestion,
} from "../controllers/question.controller";
import checkAuth from "../middlewares/checkAuth";

const questionRouter = Router();

questionRouter.get("/", getQuestions);
questionRouter.get("/:id", getQuestion);
questionRouter.post("/new", checkAuth, newQuestion);
questionRouter.put("/update/:id", checkAuth, updateQuestion);
questionRouter.delete("/delete/:id", checkAuth, deleteQuestion);
questionRouter.post("/comment/new/:id", checkAuth, sendComment);
questionRouter.put("/comment/edit/:id", checkAuth, editComment);

export default questionRouter;
