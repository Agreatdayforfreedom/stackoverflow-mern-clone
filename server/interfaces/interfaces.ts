export interface User {
  username: string;
  password: string;
  email: string;
}

export interface Thread {
  user: User;
}

export interface Post {
  title: string;
  description: string;
  user: User;
  threads: Thread;
}
