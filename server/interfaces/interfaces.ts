import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  avatar: string;
  reputation: number;
}

export interface Tag {
  _id: Types.ObjectId;
  name: string;
  infoTag: string;
}

export interface Question {
  title: string;
  content: string;
  tags: Types.Array<Tag>;
  comments: Types.DocumentArray<Comment>;
  owner: Types.ObjectId; //user
}

export interface Answer {
  content: string;
  question: Types.ObjectId;
  owner: Types.ObjectId;
  comments: Types.DocumentArray<Comment>;
}

export interface Comment {
  content: string;
  owner: Types.ObjectId;
  post: Types.ObjectId | string;
}
