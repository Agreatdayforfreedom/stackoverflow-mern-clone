"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteType_enum = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var VoteType_enum;
(function (VoteType_enum) {
    VoteType_enum[VoteType_enum["upvote"] = 1] = "upvote";
    VoteType_enum[VoteType_enum["downvote"] = -1] = "downvote";
    VoteType_enum[VoteType_enum["unvote"] = 0] = "unvote";
})(VoteType_enum = exports.VoteType_enum || (exports.VoteType_enum = {}));
const votesSchema = new mongoose_1.default.Schema({
    voter: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    voteTo: { type: mongoose_1.default.Schema.Types.ObjectId },
    vote: { type: Number, enum: VoteType_enum },
});
exports.default = mongoose_1.default.model("Vote", votesSchema);
