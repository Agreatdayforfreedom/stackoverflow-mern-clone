import { Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { Tag } from "../interfaces/interfaces";
import AnswerModel from "../models/Answer.model";
import QuestionModel from "../models/Question.model";
import TagModel from "../models/Tag.model";

export const getQuestions = async (
  request: Request<{}, {}, {}, { limit: string; skip: string }>,
  response: Response
) => {
  try {
    const { limit, skip } = request.query;
    let questions: any = QuestionModel.find();

    const questionsCount = await questions.clone().countDocuments();
    if (skip != "0") {
      questions = questions.skip(parseInt(skip, 10));
    }
    if (limit != "0") {
      questions = questions.limit(parseInt(limit, 10));
    }
    questions = await questions
      .sort([["createdAt", -1]])
      .populate("votes")
      .populate("answers")
      .populate("tags")
      .populate("answerAccepted");

    response.json({ questionsCount, questions });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (request: Request, response: Response) => {
  try {
    const question = await QuestionModel.findOne({
      _id: request.params.id,
    }).populate("tags");
    return response.json(question);
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsByTag = async (
  request: Request<{ id: string }, {}, {}, { limit: string; skip: string }>,
  response: Response
) => {
  const { id } = request.params;
  const { limit, skip } = request.query;
  try {
    let questions: any = QuestionModel.find({
      tags: { $all: [id] },
    });

    const questionsCount = await questions.clone().countDocuments();
    if (skip != "0") {
      questions = questions.skip(parseInt(skip, 10));
    }
    if (limit != "0") {
      questions = questions.limit(parseInt(limit, 10));
    }
    questions = await questions.sort([["createdAt", -1]]).populate("tags");
    return response.json({ questionsCount, questions });
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedQuestions = async (
  request: Request<{ id: string }, {}, {}, { limit: string }>,
  response: Response
) => {
  const { limit } = request.query;

  try {
    const questions = await QuestionModel.find({
      owner: request.params.id,
    })
      .limit(parseInt(limit, 10) | 0)
      .populate("votes");
    return response.json(questions);
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

    question.tags.push(...tags);
    question.owner = request.user._id;

    const questionCreated = await question.save();
    const questionPopulated = await questionCreated.populate("owner");
    const _questionPopulated = await questionPopulated.populate("tags");
    return response.json(_questionPopulated);
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

  let tagsIds: string[] = [];
  let newTagIds: string[] = [];

  if (tagExists) {
    let tagIds = tagExists.map((t: Tag) => t._id.toString());
    tagsIds = tagIds;
  }

  if (intersection.length > 0) {
    newTagIds = await Promise.all(
      intersection.map(async (tag) => {
        const tags = await TagModel.create({
          name: tag,
        });
        return tags._id.toString();
      })
    );
  }
  return tagsIds.concat(newTagIds);
}

export const updateQuestion = async (request: Request, response: Response) => {
  const { title, content, tags } = request.body;
  console.log({ title, content, tags });
  try {
    const question = await QuestionModel.findOne({ _id: request.params.id });
    if (!question) return HttpException("Question not found", 404, response);

    question.title = title || question.title;
    question.content = content || question.content;
    console.log(question.comments);

    const uniqueTags = await mergeTag(tags);
    const questionTagIds = question.tags.map((x) => x._id.toString());

    const tagToRemove = questionTagIds.filter(
      (x) => uniqueTags.indexOf(x) == -1
    );
    const newTag = uniqueTags.filter((x) => questionTagIds.indexOf(x) == -1);

    if (tagToRemove.length >= 1) {
      await QuestionModel.updateOne(
        { _id: question._id },
        { $pull: { tags: { $in: [...tagToRemove] } } }
      );
    }

    if (uniqueTags) {
      await QuestionModel.updateOne(
        { _id: question._id },
        { $addToSet: { tags: { $each: [...newTag] } } }
      );
    }
    const questionSaved = await question.save();
    const _questionPopulated = await questionSaved.populate("tags");
    response.json(_questionPopulated);
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
    return response.json({ id: question._id });
  } catch (error) {
    console.log(error);
  }
};
