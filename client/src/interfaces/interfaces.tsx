export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  reputation: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Array<Tag>;
  comments: Array<Comment>;
  owner: User; //user
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  _id: string;
  content: string;
  question: Question;
  comments: Array<Comment>;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  content: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Config {
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
}

export interface Tag {
  name: string;
  infoTag: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  vote: 1 | -1;
  voter: string;
  votedTo: string;
}
