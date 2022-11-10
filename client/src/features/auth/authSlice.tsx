import { AnyAction } from "redux";
import axios from "axios";
// balcon.ruby.cuento
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { authThunk, loginThunk } from "./authApi";

// Define a type for the slice state
interface AuthState {
  user: any;
}

// Define the initial state using that type
const initialState = {
  user: {},
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(loginThunk.pending, (state, action) => {})
    //   .addCase(loginThunk.fulfilled, (state, action) => {});
    builder
      .addCase(authThunk.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(authThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("end loading");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
