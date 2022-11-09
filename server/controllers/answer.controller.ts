import { Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import AnswerModel from "../models/Answer.model";
import QuestionModel from "../models/Question.model";

export const getAnswers = async (request: Request, response: Response) => {
  try {
    const answers = await AnswerModel.find({ question: request.params.id });
    return response.json(answers);
  } catch (error) {}
};

export const sendAnswer = async (request: Request, response: Response) => {
  try {
    const question = await QuestionModel.findOne({ _id: request.params.id });

    if (!question) return HttpException("There was a error", 400, response);

    const answer = new AnswerModel();
    answer.content = request.body.content;
    answer.question = question._id;
    answer.owner = request.user._id;

    const answerSent = await answer.save();

    response.status(201).json(answerSent);
  } catch (error) {
    console.log(error);
  }
};
