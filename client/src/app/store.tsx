import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import questionSlice from "../features/question/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    question: questionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
