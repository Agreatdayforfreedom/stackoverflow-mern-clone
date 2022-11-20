import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { voteCached } from "../features/vote/voteSlice";
import { Vote } from "../interfaces/interfaces";
import { configAxios } from "../utils/configAxios";
import { VoteType_enum } from "./Voting";

interface Props {
  setVoteType: (state: number) => void;
  voteType: number;
  disabled: boolean;

  sendVote: (type: VoteType_enum, position?: VoteType_enum) => void;
}

const ArrowDown = ({ voteType, disabled, sendVote }: Props) => {
  const handleVote = () => {
    if (voteType === -1) {
      return sendVote(VoteType_enum.unvote, VoteType_enum.downvote);
    }
    sendVote(VoteType_enum.downvote);
  };

  return (
    <button onClick={handleVote} className="arrow" disabled={disabled}>
      <svg
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        fill="none"
        className={` cursor-pointer  ${voteType === -1 && "text-orange-400"}`}
      >
        <path d="M2 10h32L18 26 2 10z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default ArrowDown;
