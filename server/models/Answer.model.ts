import mongoose from "mongoose";
import { Answer } from "../interfaces/interfaces";

const answerSchema = new mongoose.Schema<Answer>(
  {
    content: { type: String, required: true, trim: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        type: new mongoose.Schema(
          {
            content: String,
            owner: mongoose.Schema.Types.ObjectId,
          },
          {
            timestamps: true,
          }
        ),
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Answer>("Answer", answerSchema);
