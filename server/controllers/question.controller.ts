import { Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { Comment } from "../interfaces/interfaces";
import AnswerModel from "../models/Answer.model";
import QuestionModel from "../models/Question.model";

export const getQuestions = async (request: Request, response: Response) => {
  try {
    const questions = await QuestionModel.find();
    response.json(questions);
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (request: Request, response: Response) => {
  try {
    const question = await QuestionModel.findOne({
      _id: request.params.id,
    }).populate({
      path: "comments.owner",
      select: "-password",
      model: "User",
    });
    return response.json(question);
  } catch (error) {
    console.log(error);
  }
};

export const newQuestion = async (request: Request, response: Response) => {
  try {
    const question = new QuestionModel({
      title: request.body.title,
      content: request.body.content,
    });
    question.tags.push(...request.body.tags);
    question.owner = request.user._id;

    await question.save();
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (request: Request, response: Response) => {
  const { title, content, tags } = request.body;

  try {
    const question = await QuestionModel.findOne({ _id: request.params.id });
    if (!question) return HttpException("Question not found", 404, response);

    question.title = title || question.title;
    question.content = content || question.content;

    if (request.body.tags) {
      question.tags.addToSet(...tags);
    }
    await question.save();
    response.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (request: Request, response: Response) => {
  try {
    const question = await QuestionModel.findOne({ _id: request.params.id });

    if (!question) {
      return HttpException("Question not found", 404, response);
    }

    if (question.Authorized(request.user._id) === false) {
      return HttpException("Not authorized", 401, response);
    }

    const answers = await AnswerModel.find({ question: request.params.id });

    await Promise.all([
      await QuestionModel.deleteOne({ _id: request.params.id }),
      answers &&
        (await AnswerModel.deleteMany({ question: request.params.id })),
    ]);
    return response.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

export const sendComment = async (request: Request, response: Response) => {
  try {
    console.log(request.params);
    const question = await QuestionModel.findOne({ _id: request.params.id });

    const comment: Comment = {
      content: request.body.content,
      owner: request.user._id,
    };
    if (!question) return HttpException("There was a error", 400, response);

    question.comments.push(comment);
    const commentSent = await question.save();

    response.json(commentSent);
  } catch (error) {
    console.log(error);
  }
};
