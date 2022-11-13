export interface User {
  _id: string;
  username: string;
  email: string;
  reputation: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  _id: string;

  title: string;
  content: string;
  tags: Array<string>;
  comments: Array<Comment>;
  owner: User; //user
}

export interface Answer {
  _id: string;

  content: string;
  question: Question;
  owner: User;
}

export interface Comment {
  content: string;
  owner: User;
}

export type Tag = {
  tag: string;
};
