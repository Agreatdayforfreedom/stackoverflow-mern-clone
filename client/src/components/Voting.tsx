import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { voteThunk } from "../features/vote/voteApi";
import { Vote } from "../interfaces/interfaces";
import { configAxios } from "../utils/configAxios";
import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";

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

  const config = configAxios(token);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(`http://localhost:4000/api/vote/${postId}`);

      if (data) {
        const voteType = data.votes.filter(
          (v: Vote) => v.voter.toString() === user?._id.toString()
        )[0];
        if (voteType) {
          setVoteType(voteType.vote);
        }
        setInitialScore(data.score);
        setLoadingVotes(false);
        setVotes(data);
      }
    };
    fetch();
  }, []);

  const sendVote = (type: VoteType_enum, position?: VoteType_enum) => {
    setVoteType(type);
    setInitialScore((prev) => {
      if ((prev += type) === 0 || (prev -= type) === 0) {
        prev = prev * 0;
      }
      if (type === VoteType_enum.unvote && position) {
        //todo: toggle between up and down doens't work
        //todo: limit the size of the comments
        return (prev = votes.score);
      }
      return (prev += type);
    });
    dispatch(voteThunk({ postId, config, type }));
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  let className = "text-orange-400";
  if (loadingVotes || !user) return <></>;

  return (
    <div className="flex flex-col justify-start items-center text-[#aab0b4]">
      <ArrowUp
        setVoteType={setVoteType}
        voteType={voteType}
        disabled={disabled}
        sendVote={sendVote}
        // id={id}
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
