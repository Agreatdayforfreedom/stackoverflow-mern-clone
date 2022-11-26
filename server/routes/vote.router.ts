import { Router } from "express";
import checkAuth from "../middlewares/checkAuth";
import { getVotes, voting } from "../controllers/vote.controller";

const voteRouter = Router();

voteRouter.get("/:id", getVotes);

voteRouter.put("/:id/:vote", checkAuth, voting);

export default voteRouter;
