import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestionsThunk = createAsyncThunk(
  "question/getQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios("http://localhost:4000/api/question");

      return data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const getQuestionThunk = createAsyncThunk(
  "question/getQuestion",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios(`http://localhost:4000/api/question/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const createQuestionThunk = createAsyncThunk(
  "question/createQuestion",
  async ({ payload, config }: any, { rejectWithValue }) => {
    console.log(payload, config, "create");
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/question/new`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const editQuestionThunk = createAsyncThunk(
  "question/editQuestion",
  async ({ payload, id, config }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/question/update/${id}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

// export const createCommentThunk = createAsyncThunk(
//   "question/getQuestion",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const { data } = await axios(`http://localhost:4000/api/question/${id}`);
//       return data;
//     } catch (error) {
//       return rejectWithValue("error");
//     }
//   }
// );
