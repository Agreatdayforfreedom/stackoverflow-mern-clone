import mongoose from "mongoose";
import { Tag } from "../interfaces/interfaces";

const tagSchema = new mongoose.Schema<Tag>(
  {
    name: { type: String, trim: true, require: true },
    infoTag: { type: String, trim: true, default: "No information" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<Tag>("Tag", tagSchema);
