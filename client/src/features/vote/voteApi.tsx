import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../interfaces/interfaces";

interface Payload {
  id: string;
  config: Config;
}

// export const getVotesThunk = createAsyncThunk(
//   "vote/getVotes",
//   async (id: string) => {
//     const { data } = await axios(`http://localhost:4000/api/vote/${id}`);
//     return data;
//   }
// );

export const upvoteThunk = createAsyncThunk(
  "vote/upvote",
  async ({ id, config }: Payload) => {
    console.log(id, config);
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/vote/up/${id}`,
      {},
      config
    );
    return data;
  }
);

export const downvoteThunk = createAsyncThunk(
  "vote/downvote",
  async ({ id, config }: Payload) => {
    console.log(id, config);
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/vote/down/${id}`,
      {},
      config
    );
    return data;
  }
);

export const unvoteThunk = createAsyncThunk(
  "vote/unvote",
  async ({ id, config }: Payload) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/vote/unvote/${id}`,
      config
    );
    console.log(data);
    return data;
  }
);
