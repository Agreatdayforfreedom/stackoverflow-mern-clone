import { createSlice, Observable } from "@reduxjs/toolkit";
import { Comment } from "../../interfaces/interfaces";
import {
  createCommentThunk,
  deleteCommentThunk,
  editCommentThunk,
} from "./commentsApi";

interface InitialState {
  comment: Comment;
  token: string;
  commentStatus: CommentStatus_enum;
}

export enum CommentStatus_enum {
  created = "CREATED",
  edited = "EDITED",
  deleted = "DELETED",
  empty = "_",
}

const token: string = localStorage.getItem("token") as string | "";

const initialState: InitialState = {
  comment: {} as Comment,
  commentStatus: CommentStatus_enum.empty,
  token,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentThunk.pending, (state) => {
        state.comment = {} as Comment;
        state.commentStatus = CommentStatus_enum.created;
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.commentStatus = CommentStatus_enum.created;
      });
    builder
      .addCase(editCommentThunk.pending, (state) => {
        state.comment = {} as Comment;
        state.commentStatus = CommentStatus_enum.edited;
      })
      .addCase(editCommentThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.comment = action.payload;
          state.commentStatus = CommentStatus_enum.edited;
        }
      });
    builder
      .addCase(deleteCommentThunk.pending, (state) => {
        state.comment = {} as Comment;
        state.commentStatus = CommentStatus_enum.deleted;
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.comment = action.payload;
          state.commentStatus = CommentStatus_enum.deleted;
        }
      });
  },
});

export default commentSlice.reducer;
