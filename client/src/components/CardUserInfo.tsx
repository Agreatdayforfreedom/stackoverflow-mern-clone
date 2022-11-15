import React from "react";
import { Question, User } from "../interfaces/interfaces";
import { formatDate } from "../utils/formatDate";

interface Props {
  user: User;
  question: Question;
}

const CardUserInfo = ({ user, question }: Props) => {
  return (
    <div className={`w-48 ${question && "bg-blue-200 px-2 py-1 rounded"}`}>
      <p className="text-xs text-slate-600">{formatDate(question.createdAt)}</p>
      <div className="flex ">
        <img
          src={user.avatar}
          className="w-8 h-8 rounded mt-1"
          alt={`${user.username} avatar`}
        />
        <div className="px-2 flex flex-col">
          <span className="text-blue-500 align-top w-fit text-sm">
            {user.username}
          </span>
          <span className="text-sm font-bold text-slate-600">
            {user.reputation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardUserInfo;
