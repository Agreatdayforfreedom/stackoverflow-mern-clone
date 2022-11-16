import { nanoid } from "@reduxjs/toolkit";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createCommentThunk } from "../features/comment/commentsApi";
import { formatDate } from "../utils/formatDate";
import Button from "./Button";
import {
  Comment as IComment,
  Question as IQuestion,
} from "../interfaces/interfaces";
import { getToken } from "../utils/getToken";

interface PropsComment {
  comment: IComment;
}

interface PropsCS {
  question: IQuestion;
}

const CommentSection = ({ question }: PropsCS) => {
  const [toggleComment, setToggleComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { user, loading } = useAppSelector((state) => state.auth);
  const { token } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const config = getToken(token);
  if (loading) return <></>;

  return (
    <>
      <div className="mt-5">
        {question.comments.map((comment: IComment) => (
          <Comment key={nanoid()} comment={comment} />
        ))}

        {toggleComment === false &&
          (!user ? (
            <Link to="/login" className="text-sm text-blue-500 p-3">
              Add a comment
            </Link>
          ) : (
            <button
              className="text-sm text-blue-500 p-3"
              onClick={() => setToggleComment((prev) => !prev)}
            >
              Add a comment
            </button>
          ))}
      </div>
      {toggleComment && (
        <div className="mt-3">
          <form
            className="flex"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              dispatch(
                createCommentThunk({
                  content: comment,
                  id: question._id,
                  config,
                })
              );
            }}
          >
            <textarea
              name="content"
              id="content"
              placeholder="add a useful comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-transparent p-2 border border-slate-300 placeholder:text-sm"
            ></textarea>
            <div className="mx-2">
              <Button name="Add comment" disabled={false} />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const Comment = ({ comment }: PropsComment) => {
  return (
    <div className="border-b border-gray-300 py-1 px-2 text-sm first-of-type:border-y">
      <p className="break-all">
        {comment.content}
        <span className="px-1">-</span>
        <span className="text-blue-500">{comment.owner.username}</span>
        <span className="px-1 text-xs text-gray-500">
          {formatDate(comment.createdAt)}
        </span>
      </p>
    </div>
  );
};

export default CommentSection;
