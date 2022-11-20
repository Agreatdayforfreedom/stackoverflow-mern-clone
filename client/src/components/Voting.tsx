import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Vote } from "../interfaces/interfaces";
import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";

interface Props {
  id: string;
}

interface Votes {
  total: number;
  score: number;
  votes: Vote[];
}

const Voting = ({ id }: Props) => {
  const [voted, setVoted] = useState<number>(2);
  const [votes, setVotes] = useState<Votes>({} as Votes);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [initialScore, setInitialScore] = useState<number>(0);
  const [loadingVotes, setLoadingVotes] = useState(true);

  const chachedScore = ({
    score,
    initialScore,
  }: {
    score?: number;
    initialScore?: number;
  }) => {
    if (score) {
      setVotes({ ...votes, score: (votes.score += score) });
    } else if (initialScore) {
      setVotes({ ...votes, score: initialScore });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `http://localhost:4000/api/vote/${id && id}`
      );

      if (data) {
        const votedit = data.votes.map((v: any) => {
          if (v.vote === 1) {
            return { id: v.voter.toString(), vote: v.vote };
          } else if (v.vote === -1) {
            return { id: v.voter.toString(), vote: v.vote };
          }
        });

        const voted = votedit.filter(
          (v: any) => v?.id === user?._id.toString()
        )[0] || { vote: 2 };

        setVoted(voted.vote);
        setInitialScore(data.score);
        setLoadingVotes(false);
        setVotes(data);
      }
    };
    fetch();
  }, []);
  const { user } = useAppSelector((state) => state.auth);
  let className = "text-orange-400";
  if (loadingVotes || !voted || !user) return <></>;

  return (
    <div className="flex flex-col justify-start items-center text-[#aab0b4]">
      <ArrowUp
        className={className && className}
        setVoted={setVoted}
        initialScore={initialScore}
        voted={voted}
        disabled={disabled}
        setDisabled={setDisabled}
        chachedScore={chachedScore}
        id={id}
      />

      <span className="text-2xl block text-slate-600">
        {votes && votes.score}
      </span>
      <ArrowDown
        className={className && className}
        initialScore={initialScore}
        disabled={disabled}
        setDisabled={setDisabled}
        setVoted={setVoted}
        voted={voted}
        chachedScore={chachedScore}
        id={id}
      />
    </div>
  );
};

export default Voting;
