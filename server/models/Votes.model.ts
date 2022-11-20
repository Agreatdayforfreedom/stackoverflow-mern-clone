import mongoose, { Types } from "mongoose";

export enum VoteType_enum {
  upvote = 1,
  downvote = -1,
  unvote = 0,
}

export interface Vote {
  voter: Types.ObjectId;
  voteTo: Types.ObjectId;
  vote: VoteType_enum;
}

const votesSchema = new mongoose.Schema<Vote>({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  voteTo: { type: mongoose.Schema.Types.ObjectId },
  vote: { type: Number, enum: VoteType_enum },
});

export default mongoose.model<Vote>("Vote", votesSchema);
