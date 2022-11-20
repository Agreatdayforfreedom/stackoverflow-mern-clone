import mongoose, { Types } from "mongoose";

export enum voteEnum {
  upvote = 1,
  downvote = -1,
}

export interface Vote {
  voter: Types.ObjectId;
  voteTo: Types.ObjectId;
  vote: voteEnum;
}

const votesSchema = new mongoose.Schema<Vote>({
  voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  voteTo: { type: mongoose.Schema.Types.ObjectId },
  vote: { type: Number, enum: voteEnum },
});

export default mongoose.model<Vote>("Vote", votesSchema);
