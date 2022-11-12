import { createSlice } from "@reduxjs/toolkit";
import { getQuestionsThunk } from "./quesionApi";

const initialState: any = {
  question: [],
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
        state.question = action.payload;
      });
  },
});

export default questionSlice.reducer;
