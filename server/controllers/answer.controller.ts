import { Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { Comment } from "../interfaces/interfaces";
import AnswerModel from "../models/Answer.model";
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
