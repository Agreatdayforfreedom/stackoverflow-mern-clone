import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { voteThunk } from "../features/vote/voteApi";
import { Vote } from "../interfaces/interfaces";
import { configAxios } from "../utils/configAxios";
import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";
import Blank from "./Blank";

export enum VoteType_enum {
  upvote = 1,
  downvote = -1,
  unvote = 0,
}

interface Props {
  postId: string;
}

interface Votes {
  total: number;
  score: number;
  votes: Vote[];
}

const Voting = ({ postId }: Props) => {
  const [voteType, setVoteType] = useState<number>(VoteType_enum.unvote);
  const [votes, setVotes] = useState<Votes>({} as Votes);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [initialScore, setInitialScore] = useState<number>(0);
  const [loadingVotes, setLoadingVotes] = useState(true);

  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const config = configAxios(token);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(`http://localhost:4000/api/vote/${postId}`);
      if (data) {
        if (data.votes[0]) setVoteType(data.votes[0].vote);
        setInitialScore(data.score);
        setVotes(data);
        setLoadingVotes(false);
      }
    };
    fetch();
  }, []);
  const sendVote = (type: VoteType_enum, position?: VoteType_enum) => {
    if (!user) {
      return navigate("/login");
    }

    setVoteType(type);
    setInitialScore((prev) => {
      if (voteType) prev += type;
      if (type === VoteType_enum.downvote) {
        return (prev += VoteType_enum.downvote);
      } else if (type === VoteType_enum.upvote) {
        return (prev += VoteType_enum.upvote);
      } else {
        if (position) return (prev += position);
      }
      return (prev += 0);
    });
    dispatch(voteThunk({ postId, config, type, position }));
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  if (loadingVotes) return <Blank />;
  return (
    <div className="flex flex-col justify-start items-center text-[#aab0b4]">
      <ArrowUp
        setVoteType={setVoteType}
        voteType={voteType}
        disabled={disabled}
        sendVote={sendVote}
      />
      <span className="text-2xl block text-slate-600">{initialScore}</span>
      <ArrowDown
        setVoteType={setVoteType}
        voteType={voteType}
        disabled={disabled}
        sendVote={sendVote}
      />
    </div>
  );
};

export default Voting;
