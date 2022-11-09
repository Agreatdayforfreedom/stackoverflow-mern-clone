import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
}

export interface Question {
  title: string;
  content: string;
  tags: Types.Array<string>;
  comments: Types.DocumentArray<Comment>;
  owner: Types.ObjectId; //user
}

export interface Answer {
  content: string;
  question: Types.ObjectId;
  owner: Types.ObjectId;
}

export interface Comment {
  content: string;
  owner: Types.ObjectId;
}
