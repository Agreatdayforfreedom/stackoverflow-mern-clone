import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Comment, Config } from "../../interfaces/interfaces";

interface Props {
  id?: string;
  payload?: {
    commentId?: string;
    content?: string;
  };
  config?: Config;
  type: "question" | "answer";
}

export const createCommentThunk = createAsyncThunk(
  "comment/createComment",
  async ({ id, payload, config, type }: Props, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/${type}/comment/new/${id}`,
        { content: payload && payload.content },
        config
      );
      console.log(data.comments.at(-1));
      return data.comments.at(-1);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const editCommentThunk = createAsyncThunk(
  "comment/editComment",
  async ({ id, payload, config, type }: Props, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/${type}/comment/edit/${id}`,
        payload,
        config
      );
      return {
        data: data.comments.find((x: Comment) => x._id === payload?.commentId),
        updated: true,
      };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
