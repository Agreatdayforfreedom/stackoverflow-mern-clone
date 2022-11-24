import { Request, Response, Router } from "express";
import HttpException from "../exceptions/http.exception";
import { Comment } from "../interfaces/interfaces";
import checkAuth from "../middlewares/checkAuth";
import CommentModel from "../models/Comment.model";
import QuestionModel from "../models/Question.model";

const commentRouter = Router();

commentRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const { limit } = request.query;

    let query: any = CommentModel.find({
      post: request.params.id,
    });

    const commentsLength = await query.clone().countDocuments();
    if (typeof limit === "string") {
      query = await query
        .sort({ createdAt: "desc" })
        .limit(parseInt(limit, 10))
        .populate("owner", "-password");
    }
    response.json({ query, commentsLength });
  } catch (error) {
    console.log(error);
  }
});

commentRouter.post(
  "/new/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    try {
      const comment: Comment = {
        content: request.body.content,
        owner: request.user._id,
        post: request.params.id,
      };

      const commentCreated = await CommentModel.create(comment);
      const _commentPopulated = await commentCreated.populate(
        "owner",
        "-password"
      );
      response.json(_commentPopulated);
    } catch (error) {
      console.log(error);
    }
  }
);

commentRouter.put(
  "/edit/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    try {
      const comment = await CommentModel.findOne({
        _id: request.params.id,
      }).populate("owner", "-password");
      if (!comment) return HttpException("Comment not found", 404, response);

      if (comment.owner._id.toString() !== request.user._id.toString()) {
        return HttpException("Not authorized", 401, response);
      }

      comment.content = request.body.content || comment.content;

      const commentEdited = await comment.save();
      const _commentPopulated = await commentEdited.populate(
        "owner",
        "-password"
      );
      return response.json(_commentPopulated);
    } catch (error) {
      console.log(error);
    }
  }
);

commentRouter.delete(
  "/delete/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    try {
      const comment = await CommentModel.findOne({
        _id: request.params.id,
      }).populate("owner", "-password");
      if (!comment) return HttpException("Comment not found", 404, response);

      if (comment.owner._id.toString() !== request.user._id.toString()) {
        return HttpException("Not authorized", 401, response);
      }
      const deleted = await CommentModel.deleteOne(
        { _id: comment._id },
        { returnDocument: "after" }
      );

      if (deleted.deletedCount === 1) {
        return response.json(comment);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default commentRouter;
