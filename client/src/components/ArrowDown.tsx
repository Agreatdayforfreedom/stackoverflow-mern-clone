import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { downvoteThunk, unvoteThunk } from "../features/vote/voteApi";
import { voteCached } from "../features/vote/voteSlice";
import { configAxios } from "../utils/configAxios";

interface Props {
  className?: string;
  setVoted: (state: number) => void;
  voted: number;
  id: string;
  initialScore: number;
  disabled: boolean;
  setDisabled: (state: boolean) => void;
  chachedScore: ({
    score,
    initialScore,
  }: {
    score?: number;
    initialScore?: number;
  }) => void;
}

const ArrowDown = ({
  className,
  setVoted,
  voted,
  id,
  disabled,
  initialScore,
  setDisabled,
  chachedScore,
}: Props) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.votes);
  const config = configAxios(token);

  const downvote = () => {
    if (id) {
      if (voted === -1) {
        chachedScore({ initialScore });
        setVoted(2);
        dispatch(unvoteThunk({ id: id, config }));
      } else {
        chachedScore({ score: -1 });
        setVoted(-1);
        dispatch(downvoteThunk({ id: id, config }));
      }
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 2000);
    }
  };

  return (
    <button onClick={downvote} className="arrow" disabled={disabled}>
      <svg
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        fill="none"
        className={` cursor-pointer  ${voted === -1 && className}`}
      >
        <path d="M2 10h32L18 26 2 10z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ArrowDown;
