import mongoose from "mongoose";
import { Answer } from "../interfaces/interfaces";
import CommentModel from "./Comment.model";

const answerSchema = new mongoose.Schema<Answer>(
  {
    content: { type: String, required: true, trim: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accepted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

answerSchema.pre(
  "deleteMany",
  { document: false, query: true },
  async function (this: any, next) {
    const docs = await this.model.find(this.getFilter());
    const comments = docs.map((item: any) => item._id);

    await CommentModel.deleteMany({ post: { $in: comments } }).exec();

    next();
  }
);

answerSchema.virtual("votes", {
  ref: "Vote",
  localField: "_id",
  foreignField: "voteTo",
  count: true,
});

export default mongoose.model<Answer>("Answer", answerSchema);
