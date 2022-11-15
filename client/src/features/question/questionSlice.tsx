import { createSlice } from "@reduxjs/toolkit";
import { Question } from "../../interfaces/interfaces";
import { getQuestionsThunk, getQuestionThunk } from "./questionApi";

interface InitialState {
  questions: Question[] | [];
  question: Question | undefined;
  loading: boolean;
  error: undefined | string;
}

const initialState: InitialState = {
  questions: [],
  question: undefined,
  loading: true,
  error: undefined,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
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
  },
});

export default questionSlice.reducer;
