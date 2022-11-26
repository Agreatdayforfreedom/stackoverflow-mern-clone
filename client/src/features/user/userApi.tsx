import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Payload {
  id?: string;
  limit?: number;
  skip?: number;
}
export const getUsersThunk = createAsyncThunk(
  "user/getUsers",
  async ({ limit, skip }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/user?limit=${limit}&skip=${skip}`
      );

      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async ({ id }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios(`http://localhost:4000/api/user/${id}`);

      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
