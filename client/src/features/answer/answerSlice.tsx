import { createSlice } from "@reduxjs/toolkit";
import { Answer } from "../../interfaces/interfaces";
import {
  createAnswerThunk,
  deleteAnswerThunk,
  getAnswersThunk,
  getAnswerThunk,
} from "./answerApi";

interface InitialState {
  answers: Answer[];
  answer: Answer | undefined;
  questionId: string | undefined;
  token: string;
  loading: boolean;
}

const token: string = localStorage.getItem("token") as string | "";

const initialState: InitialState = {
  answers: [],
  answer: undefined,
  questionId: undefined,
  token,
  loading: true,
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setQuestionId: (state, action) => {
      state.questionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnswersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnswersThunk.fulfilled, (state, action) => {
        state.answers = action.payload;
        state.loading = false;
      });
    builder
      .addCase(getAnswerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnswerThunk.fulfilled, (state, action) => {
        state.answer = action.payload;
        state.loading = false;
      });
    builder
      .addCase(createAnswerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAnswerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = [...state.answers, action.payload];
      });
    builder
      .addCase(deleteAnswerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteAnswerThunk.fulfilled, (state, action) => {
        state.answers = state.answers.filter(
          (x) => x._id !== action.payload.id
        );
        state.loading = false;
      });
  },
});

export const { setQuestionId } = answerSlice.actions;

export default answerSlice.reducer;
