import { Request, Response } from "express";
import { Types } from "mongoose";
import HttpException from "../exceptions/http.exception";
import { Comment, Tag } from "../interfaces/interfaces";
import AnswerModel from "../models/Answer.model";
import QuestionModel from "../models/Question.model";
import TagModel from "../models/Tag.model";

export const getQuestions = async (request: Request, response: Response) => {
  try {
    const questions = await QuestionModel.find()
      .sort([["createdAt", -1]])
      .populate("votes")
      .populate("tags");
    response.json(questions);
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (request: Request, response: Response) => {
  try {
    const question = await QuestionModel.findOne({
      _id: request.params.id,
    })
      .populate({
        path: "comments.owner",
        select: "-password",
        model: "User",
      })
      .populate("tags");
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

    const tags = await mergeTag(request.body.tags);

    console.log(tags);
    question.tags.push(...tags);
    question.owner = request.user._id;

    await question.save();
  } catch (error) {
    console.log(error);
  }
};

async function mergeTag(tags: string[]) {
  const tagExists = await TagModel.find({
    name: [...tags],
  });

  const tagsExistNames = tagExists.map((t: any) => t.name);
  let intersection = tags.filter((x: string) => !tagsExistNames.includes(x));

  let tagsIds: Types.ObjectId[] = [];
  let newTagIds: Types.ObjectId[] = [];

  if (tagExists) {
    let tagIds = tagExists.map((t: Tag) => t._id);
    tagsIds = tagIds;
  }

  if (intersection.length > 0) {
    newTagIds = await Promise.all(
      intersection.map(async (tag) => {
        const tags = await TagModel.create({
          name: tag,
        });
        return tags._id;
      })
    );
  }
  return tagsIds.concat(newTagIds);
}

export const updateQuestion = async (request: Request, response: Response) => {
  const { title, content, tags } = request.body;

  try {
    const question = await QuestionModel.findOne({ _id: request.params.id });
    if (!question) return HttpException("Question not found", 404, response);

    question.title = title || question.title;
    question.content = content || question.content;

    const uniqueTags = await mergeTag(tags);
    if (uniqueTags) {
      question.tags.addToSet(...uniqueTags);
    }
    const questionSaved = await question.save();
    response.json(questionSaved);
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
