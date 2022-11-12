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
