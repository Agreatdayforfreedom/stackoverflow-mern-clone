import { createSlice } from "@reduxjs/toolkit";
import { Vote } from "../../interfaces/interfaces";

export interface VoteAndCount {
  total: number;
  score: number;
  votes: Vote[];
}

interface InitialState {
  votes: VoteAndCount | undefined;
  _voteCached: number | undefined;
  token: string;
  loading: boolean;
}

const token: string = localStorage.getItem("token") as string | "";

const initialState: InitialState = {
  votes: undefined,
  _voteCached: undefined,
  token,
  loading: true,
};

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    voteCached: (state, action) => {
      state._voteCached = action.payload;
    },
    // clearState: (state) => {
    //   state.votes = undefined;
    //   state.loading = false;
    // },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(getVotesThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getVotesThunk.fulfilled, (state, action) => {
    //     state.votes = action.payload;
    //     state.loading = false;
    //   });
    // builder
    //   .addCase(upvoteThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(upvoteThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.votes = undefined;
    //   });
    // builder
    //   .addCase(downvoteThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(downvoteThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.votes = undefined;
    //   });
    // builder
    //   .addCase(unvoteThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(unvoteThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.votes = undefined;
    //   });
  },
});

export const { voteCached } = voteSlice.actions;

export default voteSlice.reducer;
