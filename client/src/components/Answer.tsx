import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteAnswerThunk } from "../features/answer/answerApi";
import { Answer as IAnswer } from "../interfaces/interfaces";
import { configAxios } from "../utils/configAxios";
import AuthLink from "./AuthLink";
import CardUserInfo from "./CardUserInfo";
import CommentSection from "./CommentSection";
import { Spinner } from "./Spinner";
import Voting from "./Voting";

interface Props {
  answer: IAnswer;
}

const Answer = ({ answer }: Props) => {
  const { user, loading, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const config = configAxios(token);

  const handleDelete = () => {
    dispatch(deleteAnswerThunk({ id: answer._id, config }));
  };
  if (!answer || loading || !user) return <Spinner />;

  return (
    <div className="flex w-full border-b border-slate-300 mt-5">
      <Voting id={answer._id && answer._id} />
      <div className="w-full px-4">
        <p className="break-all">{answer.content}</p>
        <div className="flex justify-between mt-4">
          <div className="flex">
            <p className="text-sm text-slate-600 px-1 hover:cursor-pointer hover:text-slate-500 transition-all">
              Share
            </p>
            <AuthLink
              to={`/answer/${answer._id}/edit`}
              name="Edit"
              className="text-sm text-slate-600 px-1 hover:cursor-pointer hover:text-slate-500 transition-all"
            />
            {user && user._id === answer.owner._id && (
              <button
                className="text-sm text-slate-600 flex items-start px-1 hover:cursor-pointer hover:text-slate-500 transition-all"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
          <CardUserInfo user={answer.owner} from={answer} />
        </div>
        {/* //TODO ADD COMMENTS */}
        <CommentSection from={answer} type={"answer"} />
      </div>
    </div>
  );
};

export default Answer;
