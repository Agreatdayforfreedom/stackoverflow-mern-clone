import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/interfaces";
import { getUsersThunk, getUserThunk } from "./userApi";

interface InitialState {
  users: User[];
  userInfo: User | undefined;
  total: number;
  loading: boolean;
}

const initialState: InitialState = {
  users: [],
  userInfo: undefined,
  loading: true,
  total: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.total = 0;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.usersCount;
      });
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.userInfo = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      });
  },
});

export default userSlice.reducer;
