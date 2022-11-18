import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Config } from "../../interfaces/interfaces";

interface PayloadLogin {
  findBy: string;
  password: string;
}

interface PayloadSignup {
  username: string;
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: PayloadLogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
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
  async (payload: PayloadSignup, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
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

export const authThunk = createAsyncThunk(
  "auth/auth",
  async (config: Config) => {
    const { data } = await axios(
      `${import.meta.env.VITE_BACKEND_URL}/auth/profile`,
      config
    );
    return data;
  }
);
