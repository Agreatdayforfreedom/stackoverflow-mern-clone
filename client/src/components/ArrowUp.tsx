import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { unvoteThunk, upvoteThunk } from "../features/vote/voteApi";
import { configAxios } from "../utils/configAxios";

interface Props {
  className?: string;
  voteType?: number;
  id: string;
  chachedScore: (score: number) => void;
}

const ArrowUp = ({
  className,
  voteType: voteTypeProp,
  chachedScore,
  id,
}: Props) => {
  const [voteType, setVoteType] = useState(voteTypeProp);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.votes);

  const config = configAxios(token);

  const upvote = () => {
    if (id) {
      if (voteType === 1) {
        // setVoteType(undefined);
        // chachedScore(-1);
        return dispatch(unvoteThunk({ id: id, config }));
      }
      dispatch(upvoteThunk({ id: id, config }));
      // setVoteType(1);
    }
  };
  return (
    <button onClick={upvote}>
      <svg
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        fill="none"
        className={` cursor-pointer ${voteType === 1 && className}`}
      >
        <path d="M2 26h32L18 10 2 26z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ArrowUp;
