import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../interfaces/interfaces";

interface InitialState {
  comment: Comment | undefined;
  token: string;
  loading: boolean;
}

const token: string = localStorage.getItem("token") as string | "";

const initialState: InitialState = {
  comment: undefined,
  token,
  loading: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
});

export default commentSlice.reducer;
