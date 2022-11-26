import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../interfaces/interfaces";

interface Payload {
  postId: string;
  config: Config;
  type: number;
  position?: number;
}

export const getVotesThunk = createAsyncThunk(
  "vote/getVotes",
  async (id: string) => {
    const { data } = await axios(
      `${import.meta.env.VITE_BACKEND_URL}/vote/${id}`
    );
    return data;
  }
);

export const voteThunk = createAsyncThunk(
  "vote/vote",
  async ({ postId, config, type, position }: Payload) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/vote/${postId}/${type}`,
      { position },
      config
    );

    console.log(data);
    return data;
  }
);

// export const upvoteThunk = createAsyncThunk(
//   "vote/upvote",
//   async ({ id, config }: Payload) => {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/vote/up/${id}`,
//       {},
//       config
//     );
//     return data;
//   }
// );

// export const downvoteThunk = createAsyncThunk(
//   "vote/downvote",
//   async ({ id, config }: Payload) => {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/vote/down/${id}`,
//       {},
//       config
//     );
//     return data;
//   }
// );

// export const unvoteThunk = createAsyncThunk(
//   "vote/unvote",
//   async ({ id, config }: Payload) => {
//     const { data } = await axios.delete(
//       `${import.meta.env.VITE_BACKEND_URL}/vote/unvote/${id}`,
//       config
//     );
//     return data;
//   }
// );
