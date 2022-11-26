"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voting = exports.getVotes = void 0;
const mongoose_1 = require("mongoose");
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const Answer_model_1 = __importDefault(require("../models/Answer.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const Votes_model_1 = __importStar(require("../models/Votes.model"));
const getVotes = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const votes = yield Votes_model_1.default.find({ voteTo: id });
        const score = votes.reduce((pv, cv) => pv + cv.vote, 0);
        const total = votes.length;
        response.json({ total, score, votes });
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal server error", 500, response);
    }
});
exports.getVotes = getVotes;
const voting = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, vote } = request.params;
        let objectId = new mongoose_1.Types.ObjectId(id);
        yield query(objectId, request, response, parseInt(vote, 10));
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal server error", 500, response);
    }
});
exports.voting = voting;
function query(postId, request, response, vote) {
    return __awaiter(this, void 0, void 0, function* () {
        const { position } = request.body;
        const userReputation = yield User_model_1.default.findOne({ _id: request.user._id });
        const postA = yield Answer_model_1.default.findOne({ _id: postId });
        const postQ = yield Question_model_1.default.findOne({ _id: postId });
        let post = postA || postQ;
        if (!userReputation || !post)
            return (0, http_exception_1.default)("Something is wrong!", 400, response);
        const ownerPost = yield User_model_1.default.findOne({ _id: post.owner });
        if (!ownerPost)
            return (0, http_exception_1.default)("Something is wrong!", 400, response);
        const alreadyVoted = yield Votes_model_1.default.findOne({
            voter: request.user._id,
            voteTo: post._id,
        });
        if (ownerPost._id.equals(request.user._id)) {
            return (0, http_exception_1.default)("You cannot vote your own post", 401, response);
        }
        if (vote === Votes_model_1.VoteType_enum.downvote && userReputation.reputation < 125) {
            return (0, http_exception_1.default)("You need at least 125 reputation", 401, response);
        }
        else if (vote === Votes_model_1.VoteType_enum.upvote && userReputation.reputation < 25) {
            return (0, http_exception_1.default)("You need at least 25 reputation", 401, response);
        }
        //check if it are voted and therefore rest or sum reputation
        // is there vote? then delete it;
        //if not, continue
        //if vote is type 0 delete it and return
        yield Votes_model_1.default.deleteOne({
            voteTo: postId,
            voter: request.user._id,
        });
        if (vote === Votes_model_1.VoteType_enum.unvote) {
            //request.body.position is the inverse
            const posCorrected = position * -1;
            if (posCorrected === Votes_model_1.VoteType_enum.downvote) {
                ownerPost.reputation = ownerPost.reputation += 2;
            }
            else if (posCorrected === Votes_model_1.VoteType_enum.upvote) {
                ownerPost.reputation = ownerPost.reputation -= 10;
            }
            yield ownerPost.save();
            return (0, http_exception_1.default)("ok", 200, response);
        }
        const newVote = new Votes_model_1.default();
        newVote.voter = request.user._id;
        newVote.voteTo = postId;
        newVote.vote = vote;
        if (alreadyVoted && !position) {
            if (alreadyVoted.vote === Votes_model_1.VoteType_enum.downvote) {
                ownerPost.reputation = ownerPost.reputation += 2;
            }
            else if (alreadyVoted.vote === Votes_model_1.VoteType_enum.upvote) {
                ownerPost.reputation = ownerPost.reputation -= 10;
            }
        }
        if (vote === Votes_model_1.VoteType_enum.downvote) {
            //request.body.position is the inverse
            ownerPost.reputation = ownerPost.reputation -= 2;
        }
        else if (vote === Votes_model_1.VoteType_enum.upvote) {
            ownerPost.reputation = ownerPost.reputation += 10;
        }
        console.log(ownerPost.reputation, 2);
        const [voted, _] = yield Promise.all([
            yield newVote.save(),
            yield ownerPost.save(),
        ]);
        return response.json(voted);
    });
}
