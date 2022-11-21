import mongoose, { Types } from "mongoose";
import { Question, Comment } from "../interfaces/interfaces";

interface QuestionMethods {
  Authorized: (reqId: Types.ObjectId) => boolean;
}

type QuestionModel = mongoose.Model<Question, {}, QuestionMethods>;

const questionSchema = new mongoose.Schema<
  Question,
  QuestionModel,
  QuestionMethods
>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const cb = async function (this: any, next: any): Promise<void> {
  this.populate("owner", "-password");
  next();
};

questionSchema.pre<Question>("findOne", cb);
questionSchema.pre<Question>("find", cb);

questionSchema.methods.Authorized = function (reqId: Types.ObjectId): boolean {
  if (this.owner._id.toString() === reqId.toString()) {
    return true;
  } else {
    return false;
  }
};

questionSchema.virtual("votes", {
  ref: "Vote",
  localField: "_id",
  foreignField: "voteTo",
  count: true,
});

questionSchema.virtual("answers", {
  ref: "Answer",
  localField: "_id",
  foreignField: "question",
  count: true,
});

export default mongoose.model<Question, QuestionModel>(
  "Question",
  questionSchema
);
