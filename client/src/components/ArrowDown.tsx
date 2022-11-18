import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { downvoteThunk, unvoteThunk } from "../features/vote/voteApi";
import { voteCached } from "../features/vote/voteSlice";
import { configAxios } from "../utils/configAxios";

interface Props {
  className?: string;
  voteType?: number;
  id: string;
}

const ArrowDown = ({ className, voteType = 0, id }: Props) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.votes);

  const config = configAxios(token);

  const downvote = () => {
    if (id) {
      if (voteType === -1) {
        return dispatch(unvoteThunk({ id: id, config }));
      }
      dispatch(downvoteThunk({ id: id, config }));
      dispatch(voteCached(-1));
    }
  };

  return (
    <button onClick={downvote}>
      <svg
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        fill="none"
        className={` cursor-pointer ${voteType === -1 && className}`}
      >
        <path d="M2 10h32L18 26 2 10z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ArrowDown;
