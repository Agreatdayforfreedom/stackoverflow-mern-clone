import mongoose from "mongoose";
import { Comment } from "../interfaces/interfaces";

const commentSchema = new mongoose.Schema<Comment>(
  {
    content: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Comment>("Comment", commentSchema);
