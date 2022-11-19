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
  setDisabled: (state: boolean) => void;
  chachedScore: (score?: number | undefined) => void;
}

const ArrowUp = ({
  className,
  setVoted,
  voted,
  id,
  disabled,
  setDisabled,
  chachedScore,
}: Props) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.votes);

  // useEffect(() => {
  //   console.log(voted, "down");
  // }, [voted]);

  const config = configAxios(token);

  // useEffect(() => {
  //   console.log(voted);
  // }, []);

  const upvote = () => {
    if (id) {
      if (voted === 1) {
        chachedScore(-1);
        setVoted(2);
        dispatch(unvoteThunk({ id: id, config }));
      } else {
        chachedScore(1);
        setVoted(1);
        dispatch(upvoteThunk({ id: id, config }));
      }
    }
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
