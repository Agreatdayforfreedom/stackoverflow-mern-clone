import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Comment, Config } from "../../interfaces/interfaces";

interface Payload {
  id?: string;
  payload?: {
    commentId?: string;
    content?: string;
  };
  config?: Config;
}

export const createCommentThunk = createAsyncThunk(
  "comment/createComment",
  async ({ id, payload, config }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/new/${id}`,
        { content: payload && payload.content },
        config
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const editCommentThunk = createAsyncThunk(
  "comment/editComment",
  async ({ id, payload, config }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/comment/edit/${id}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "comment/deleteComment",
  async ({ id, config }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/comment/delete/${id}`,
        config
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
