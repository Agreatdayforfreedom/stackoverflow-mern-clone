import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import questionSlice from "../features/question/questionSlice";
import commentSlice from "../features/comment/commentSlice";
import voteSlice from "../features/vote/voteSlice";
import answerSlice from "../features/answer/answerSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    question: questionSlice,
    comments: commentSlice,
    votes: voteSlice,
    answers: answerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
