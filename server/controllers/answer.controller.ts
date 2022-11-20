import { Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { Comment } from "../interfaces/interfaces";
import AnswerModel from "../models/Answer.model";
import QuestionModel from "../models/Question.model";

export const getAnswers = async (request: Request, response: Response) => {
  try {
    const answers = await AnswerModel.find({
      question: request.params.id,
    })
      .populate("owner")
      .populate({
        path: "comments.owner",
        select: "-password",
        model: "User",
      });
    return response.json(answers);
  } catch (error) {
    console.log(error);
  }
};

export const getAnswer = async (request: Request, response: Response) => {
  try {
    const answers = await AnswerModel.findOne({
      _id: request.params.id,
    }).populate("owner");
    console.log(answers);
    return response.json(answers);
  } catch (error) {
    console.log(error);
  }
};

export const sendAnswer = async (request: Request, response: Response) => {
  try {
    const question = await QuestionModel.findOne({ _id: request.params.id });

    if (!question) return HttpException("There was a error", 400, response);

    const answer = new AnswerModel();
    answer.content = request.body.content;
    answer.question = question._id;
    answer.owner = request.user._id;

    const answerCreated = await answer.save();
    const _answerCreated = await answerCreated.populate("owner", "-password");
    response.status(201).json(_answerCreated);
  } catch (error) {
    console.log(error);
  }
};

export const editAnswer = async (request: Request, response: Response) => {
  const answer = await AnswerModel.findOne({ _id: request.params.id }).populate(
    "owner"
  );

  if (!answer) return HttpException("Answer not found", 404, response);
  if (answer.owner._id.toString() !== request.user._id.toString())
    return HttpException("Not authorized", 401, response);
  answer.content = request.body.content || answer.content;

  await answer.save();

  return response.sendStatus(204);
};

export const deleteAnswer = async (request: Request, response: Response) => {
  const answer = await AnswerModel.findOne({ _id: request.params.id }).populate(
    "owner"
  );
  if (!answer) return HttpException("Answer not found", 404, response);
  if (answer.owner._id.toString() !== request.user._id.toString())
    return HttpException("Not authorized", 401, response);

  const answerDeleted = await AnswerModel.deleteOne({ _id: answer._id });

  return response.json(answerDeleted);
};

export const sendComment = async (request: Request, response: Response) => {
  try {
    const answer = await AnswerModel.findOne({ _id: request.params.id });

    // const comment: Comment = {
    //   content: request.body.content,
    //   owner: request.user._id,
    // };
    if (!answer) return HttpException("Answer not found", 400, response);

    // answer.comments.push(comment);
    const commentSent = await answer.save();

    response.json(commentSent);
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (request: Request, response: Response) => {
  try {
    const answerEdited = await AnswerModel.findOneAndUpdate(
      { _id: request.params.id, "comments._id": request.body.commentId },
      {
        $set: {
          "comments.$.content": request.body.content,
        },
      },
      { returnDocument: "after" }
    );
    console.log(answerEdited);
    return response.json(answerEdited);
  } catch (error) {
    console.log(error);
  }
};
