import { createSlice } from "@reduxjs/toolkit";
import { Question } from "../../interfaces/interfaces";
import {
  editQuestionThunk,
  getQuestionsThunk,
  getQuestionThunk,
} from "./questionApi";

interface InitialState {
  questions: Question[] | [];
  question: Question | undefined;
  loading: boolean;
  token: string;
  error: undefined | string;
}

const token: string = localStorage.getItem("token") as string | "";

const initialState: InitialState = {
  questions: [],
  question: undefined,
  token,
  loading: true,
  error: undefined,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    clearState: (state) => {
      state.question = undefined;
      // state.loading = true;
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getQuestionsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      });
    builder
      .addCase(getQuestionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload;
      });
    builder
      .addCase(editQuestionThunk.pending, (state) => {
        state.question = undefined;
        state.loading = true;
      })
      .addCase(editQuestionThunk.fulfilled, (state, action) => {
        state.question = undefined;
        state.loading = false;
      });
  },
});

export const { clearState } = questionSlice.actions;

export default questionSlice.reducer;
