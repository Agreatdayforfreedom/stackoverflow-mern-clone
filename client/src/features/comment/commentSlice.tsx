import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../interfaces/interfaces";
import { createCommentThunk, editCommentThunk } from "./commentsApi";

interface InitialState {
  comment: Comment | undefined;
  token: string;
  commentEdited: boolean;
}

const token: string = localStorage.getItem("token") as string | "";

const initialState: InitialState = {
  comment: undefined,
  commentEdited: false,
  token,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentThunk.pending, (state) => {
        state.comment = undefined;
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.comment = action.payload;
      });
    builder
      .addCase(editCommentThunk.pending, (state) => {
        state.comment = undefined;
      })
      .addCase(editCommentThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.comment = action.payload.data;
          state.commentEdited = action.payload.updated;
        }
      });
  },
});

export default commentSlice.reducer;
