"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const vote_controller_1 = require("../controllers/vote.controller");
const voteRouter = (0, express_1.Router)();
voteRouter.get("/:id", vote_controller_1.getVotes);
voteRouter.put("/:id/:vote", checkAuth_1.default, vote_controller_1.voting);
exports.default = voteRouter;
