import mongoose from "mongoose";
import { Answer } from "../interfaces/interfaces";

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

answerSchema.virtual("votes", {
  ref: "Vote",
  localField: "_id",
  foreignField: "voteTo",
  count: true,
});

export default mongoose.model<Answer>("Answer", answerSchema);
