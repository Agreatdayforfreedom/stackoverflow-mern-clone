import { json, Request, Response, Router } from "express";
import { Types } from "mongoose";
import HttpException from "../exceptions/http.exception";
import checkAuth from "../middlewares/checkAuth";
import AnswerModel from "../models/Answer.model";
import QuestionModel from "../models/Question.model";
import UserModel from "../models/User.model";
import VotesModel, { Vote, voteEnum } from "../models/Votes.model";

const voteRouter = Router();

voteRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const votes = await VotesModel.find({ voteTo: id });

    const score = votes.reduce((pv, cv) => pv + cv.vote, 0);
    const total = votes.length;
    response.json({ total, score, votes });
  } catch (error) {
    return HttpException("Internal server error", 500, response);
  }
});

//refactor this

//upvote
voteRouter.post(
  "/up/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      if (request.user.reputation < 15) {
        return HttpException("You need at least 15 reputation", 401, response);
      }
      await query(id, request, response, voteEnum.upvote);
    } catch (error) {
      return HttpException("Internal server error", 500, response);
    }
  }
);

type Query = {
  objectId: Types.ObjectId;
  ownerId: Types.ObjectId;
};

//downvote
voteRouter.post(
  "/down/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      if (request.user.reputation < 125) {
        return HttpException("You need at least 125 reputation", 401, response);
      }

      await query(id, request, response, voteEnum.downvote);
    } catch (error) {
      return HttpException("Internal server error", 500, response);
    }
  }
);

voteRouter.delete(
  "/unvote/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const owner = await VotesModel.findOne({ voter: request.user._id });

    if (!owner) return response.sendStatus(401);
    await VotesModel.deleteOne({
      voteTo: request.params.id,
      voter: request.user._id,
    });
    return response.sendStatus(204);
  }
);

async function query(
  id: string,
  request: Request,
  response: Response,
  vote: voteEnum
) {
  let AorQ = {} as Query;

  const question = await QuestionModel.findOne({ _id: id });
  if (!question) {
    const answer = await AnswerModel.findOne({ _id: id });
    if (!answer) return HttpException("There's a problem.", 400, response);
    AorQ.objectId = answer._id;
    AorQ.ownerId = answer.owner._id;
  } else {
    AorQ.objectId = question._id;
    AorQ.ownerId = question.owner._id;
  }

  const alreadyVoted = await VotesModel.findOne({
    voteTo: AorQ.objectId,
    voter: request.user._id,
  });
  if (alreadyVoted) {
    if (alreadyVoted.vote === vote) return;
    alreadyVoted.vote = vote;
    await alreadyVoted.save();
    return;
  }
  const newVote = new VotesModel();

  newVote.voter = request.user._id;
  newVote.voteTo = AorQ.objectId;
  newVote.vote = vote;

  await newVote.save();
}

export default voteRouter;
