import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        payload
      );
      localStorage.setItem("token", data.access_token);
      return data.user;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.err);
      }
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/signup",
        payload
      );
      localStorage.setItem("token", data.access_token);
      return data.user;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.err);
      }
    }
  }
);

export const authThunk = createAsyncThunk("auth/auth", async (config: any) => {
  const { data } = await axios(
    "http://localhost:4000/api/auth/profile",
    config
  );
  return data;
});
