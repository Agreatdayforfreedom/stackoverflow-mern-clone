import { AnyAction } from "redux";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { authThunk, loginThunk, signupThunk } from "./authApi";

interface User {
  username: string;
  email: string;
  createdAt: string;
}

// Define a type for the slice state
interface AuthState {
  user: User | undefined;
  token: string;
  loading: boolean;
  error: string | undefined;
}

const token: string = localStorage.getItem("token") as string | "";

// Define the initial state using that type
const initialState: AuthState = {
  user: undefined,
  token,
  loading: true,
  error: undefined,
};
//TODO: validate username or email from back and there is a error in 'comparePassword'
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = undefined;
      state.loading = false;
      state.error = undefined;
    },
    noAuthState: (state) => {
      state.loading = false;
      state.error = undefined;
    },
    showError: (state, action) => {
      state.error = action.payload;
    },
    hideError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload as string;
        state.loading = false;
      });
    builder
      .addCase(signupThunk.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    builder
      .addCase(authThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, hideError, showError, noAuthState } = authSlice.actions;

export default authSlice.reducer;
