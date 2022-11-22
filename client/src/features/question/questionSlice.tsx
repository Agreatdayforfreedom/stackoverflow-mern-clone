import { createSlice } from "@reduxjs/toolkit";
import { Question } from "../../interfaces/interfaces";
import {
  createQuestionThunk,
  editQuestionThunk,
  getQuestionsByTagThunk,
  getQuestionsThunk,
  getQuestionThunk,
  removeQuestionThunk,
} from "./questionApi";

interface InitialState {
  questions: Question[] | [];
  question: Question | undefined;
  loading: boolean;
  token: string;
  total: number;
  error: undefined | string;
}

const token: string = localStorage.getItem("token") as string | "";

const initialState: InitialState = {
  questions: [],
  question: undefined,
  token,
  total: 0,
  loading: true,
  error: undefined,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getQuestionsThunk.pending, (state) => {
        state.questions = [];
        state.loading = true;
        state.total = 0;
      })
      .addCase(getQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions;
        state.total = action.payload.questionsCount;
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
      .addCase(getQuestionsByTagThunk.pending, (state) => {
        state.loading = true;
        state.questions = [];
        state.total = 0;
      })
      .addCase(getQuestionsByTagThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions;
        state.total = action.payload.questionsCount;
      });
    builder
      .addCase(createQuestionThunk.pending, (state) => {
        state.question = undefined;
        state.loading = true;
      })
      .addCase(createQuestionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload;
      });
    builder
      .addCase(editQuestionThunk.pending, (state) => {
        state.question = undefined;
        state.loading = true;
      })
      .addCase(editQuestionThunk.fulfilled, (state, action) => {
        state.question = action.payload;
        state.loading = false;
      });
    builder
      .addCase(removeQuestionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeQuestionThunk.fulfilled, (state, action) => {
        state.question = undefined;
        state.questions = state.questions.filter(
          (x) => x._id !== action.payload.id
        );
        state.loading = false;
      });
  },
});

export const { clearState } = questionSlice.actions;

export default questionSlice.reducer;
