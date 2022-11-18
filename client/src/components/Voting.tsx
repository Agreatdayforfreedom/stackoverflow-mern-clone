import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { getVotesThunk } from "../features/vote/voteApi";
import { VoteAndCount } from "../features/vote/voteSlice";
import { Vote } from "../interfaces/interfaces";
import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";
import { Spinner } from "./Spinner";

interface Props {
  id: string;
}

interface Votes {
  total: number;
  score: number;
  votes: Vote[];
}

const Voting = ({ id }: Props) => {
  // const { votes: votesReducer, loading: loadingVotes } = useAppSelector(
  //   (state) => state.votes
  // );
  const [votes, setVotes] = useState<Votes>({} as Votes);
  const [loadingVotes, setLoadingVotes] = useState(true);

  const chachedScore = (score: number) => {
    setVotes({ ...votes, score: (votes.score += score) });
  };

  useEffect(() => {
    console.log(votes);
  }, [votes]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `http://localhost:4000/api/vote/${id && id}`
      );
      setVotes(data);
      setLoadingVotes(false);
      console.log("fetch");
    };
    fetch();
  }, []);
  const { user } = useAppSelector((state) => state.auth);
  if (loadingVotes) return <></>;

  let className = "text-orange-400";

  const votedit =
    votes &&
    votes.votes.map((v: any) => {
      if (v.vote === 1) {
        return { id: v.voter.toString(), vote: v.vote };
      } else if (v.vote === -1) {
        return { id: v.voter.toString(), vote: v.vote };
      } else {
        return { vote: 0 };
      }
    });

  const voted =
    (votedit &&
      votedit.filter((v: any) => v?.id === user?._id.toString())[0]) ||
    0;
  return (
    <div className="flex flex-col justify-start items-center text-[#aab0b4]">
      <ArrowUp
        className={className && className}
        voteType={voted && voted.vote}
        chachedScore={chachedScore}
        id={id}
      />
      <span className="text-2xl block text-slate-600">
        {votes && votes.score}
      </span>
      <ArrowDown
        className={className && className}
        voteType={voted && voted.vote}
        // setVotes={setVotes}
        id={id}
      />
    </div>
  );
};

export default Voting;
