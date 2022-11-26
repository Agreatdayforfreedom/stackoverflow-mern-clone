import { Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { Comment } from "../interfaces/interfaces";
import CommentModel from "../models/Comment.model";

export const getComments = async (request: Request, response: Response) => {
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
    return HttpException("Internal Server Error", 500, response);
  }
};

export const createComment = async (request: Request, response: Response) => {
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
    return HttpException("Internal Server Error", 500, response);
  }
};

export const editComment = async (request: Request, response: Response) => {
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
    return HttpException("Internal Server Error", 500, response);
  }
};

export const deleteComment = async (request: Request, response: Response) => {
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
    return HttpException("Internal Server Error", 500, response);
  }
};
