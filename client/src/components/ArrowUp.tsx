import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { unvoteThunk, upvoteThunk } from "../features/vote/voteApi";
import { configAxios } from "../utils/configAxios";

interface Props {
  className?: string;
  setVoted: (state: number) => void;
  voted: number;
  id: string;
  disabled: boolean;
  initialScore: number;
  setDisabled: (state: boolean) => void;
  chachedScore: ({
    score,
    initialScore,
  }: {
    score?: number;
    initialScore?: number;
  }) => void;
}

const ArrowUp = ({
  className,
  setVoted,
  voted,
  id,
  disabled,
  setDisabled,
  initialScore,
  chachedScore,
}: Props) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.votes);
  const config = configAxios(token);

  const upvote = () => {
    if (id) {
      if (voted === 1) {
        chachedScore({ initialScore });
        setVoted(2);
        dispatch(unvoteThunk({ id: id, config }));
      } else {
        chachedScore({ score: 1 });
        setVoted(1);
      }
    }
    dispatch(upvoteThunk({ id: id, config }));
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };
  return (
    <button onClick={upvote} className="arrow" disabled={disabled}>
      <svg
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        fill="none"
        className={` cursor-pointer  ${voted === 1 && className}`}
      >
        <path d="M2 26h32L18 10 2 26z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ArrowUp;
