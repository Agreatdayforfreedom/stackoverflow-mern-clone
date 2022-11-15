import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Comment, Config } from "../../interfaces/interfaces";

interface Props {
  id: string;
  content: string;
  config: Config;
}

export const createCommentThunk = createAsyncThunk(
  "comment/createComment",
  async ({ id, content, config }: Props, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/question/comment/new/${id}`,
        { content },
        config
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
