import { Router } from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from "../controllers/comment.controller";
import checkAuth from "../middlewares/checkAuth";

const commentRouter = Router();

commentRouter.get("/:id", getComments);

commentRouter.post("/new/:id", checkAuth, createComment);

commentRouter.put("/edit/:id", checkAuth, editComment);

commentRouter.delete("/delete/:id", checkAuth, deleteComment);

export default commentRouter;
