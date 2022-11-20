import { json, Request, Response, Router } from "express";
import { Types } from "mongoose";
import HttpException from "../exceptions/http.exception";
import checkAuth from "../middlewares/checkAuth";
import AnswerModel from "../models/Answer.model";
import QuestionModel from "../models/Question.model";
import UserModel from "../models/User.model";
import VotesModel, { Vote, VoteType_enum } from "../models/Votes.model";

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

voteRouter.put(
  "/:id/:vote",
  checkAuth,
  async (request: Request, response: Response) => {
    try {
      const { id, vote } = request.params;
      let objectId = new Types.ObjectId(id);
      await query(objectId, request, response, parseInt(vote, 10));
    } catch (error) {
      return HttpException("Internal server error", 500, response);
    }
  }
);

async function query(
  postId: Types.ObjectId,
  request: Request,
  response: Response,
  vote: number
) {
  // is there vote? then delete it;
  //if not, continue
  //if vote is type 0 delete it and return
  await VotesModel.deleteOne({
    voteTo: postId,
    voter: request.user._id,
  });
  if (vote === VoteType_enum.unvote) {
    return HttpException("ok", 200, response);
  }
  const newVote = new VotesModel();

  newVote.voter = request.user._id;
  newVote.voteTo = postId;
  newVote.vote = vote;

  const voted = await newVote.save();
  return response.json(voted);
}

export default voteRouter;
