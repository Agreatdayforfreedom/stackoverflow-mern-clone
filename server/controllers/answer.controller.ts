import { Request, Response } from "express";
import mongoose, { HydratedDocument, Query } from "mongoose";
import HttpException from "../exceptions/http.exception";
import { Answer, Comment } from "../interfaces/interfaces";
import AnswerModel from "../models/Answer.model";
import CommentModel from "../models/Comment.model";
import QuestionModel from "../models/Question.model";

export const getAnswers = async (request: Request, response: Response) => {
  try {
    const answers = await AnswerModel.find({
      question: request.params.id,
    }).populate("owner");

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
    return response.json(answers);
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedAnswers = async (
  request: Request<
    { id: string },
    {},
    {},
    { limit: "string"; newest: "string" }
  >,
  response: Response
) => {
  try {
    const { limit = "2" } = request.query;

    let answers = await AnswerModel.find({
      owner: request.params.id,
    })
      .populate("question")
      .populate("votes")
      .limit(parseInt(limit, 10) | 0);

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

export const acceptAnswer = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const answer = await AnswerModel.findOne({ _id: id });
    if (!answer) return HttpException("There was a problem", 400, response);

    const question = await QuestionModel.findOne({ _id: answer.question });
    if (!question) return HttpException("There was a problem", 400, response);

    if (!question.Authorized(request.user._id))
      return HttpException("Not authorized", 401, response);

    answer.accepted = true;

    await answer.save();
    return response.sendStatus(204);
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

  const [answerDeleted, _] = await Promise.all([
    await AnswerModel.deleteOne({ _id: answer._id }),
    await CommentModel.deleteMany({ post: answer._id }),
  ]);
  return response.json(answerDeleted);
};
