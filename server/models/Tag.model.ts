import mongoose from "mongoose";
import { Tag } from "../interfaces/interfaces";

const tagSchema = new mongoose.Schema<Tag>(
  {
    name: { type: String, trim: true, require: true, unique: true },
    infoTag: { type: String, trim: true, default: "No information" },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tagSchema.virtual("totalQuestions", {
  ref: "Question",
  localField: "_id",
  foreignField: "tags",
  count: true,
  match: (tags: Tag) => ({ tags }),
});

export default mongoose.model<Tag>("Tag", tagSchema);
