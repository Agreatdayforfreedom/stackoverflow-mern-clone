import { nanoid } from "@reduxjs/toolkit";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createCommentThunk,
  editCommentThunk,
} from "../features/comment/commentsApi";
import { formatDate } from "../utils/formatDate";
import Button from "./Button";
import {
  Answer,
  Comment as IComment,
  Question as IQuestion,
} from "../interfaces/interfaces";
import { configAxios } from "../utils/configAxios";
import {
  cacheComment,
  replaceComment,
} from "../features/question/questionSlice";
import { useForm } from "../hooks/useForm";

interface PropsComment {
  comment: IComment;
  setForm: (state: FormType) => void;
  setToggleComment: (state: boolean) => void;
}

interface PropsCS {
  from: IQuestion | Answer;
  type: "question" | "answer";
}

interface FormType {
  id?: string;
  content: string;
}

const CommentSection = ({ from, type }: PropsCS) => {
  const [toggleComment, setToggleComment] = useState<boolean>(false);
  const { form, handleChange, setForm } = useForm<FormType>();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { comment, commentEdited } = useAppSelector((state) => state.comments);
  const { token } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const config = configAxios(token);
  // if (loading) return <></>;

  useEffect(() => {
    console.log(comment);
    // setTimeout(() => {
    //   if (comment) {
    //     if (commentEdited) {
    //       dispatch(replaceComment(comment));
    //     } else {
    //       dispatch(cacheComment(comment));
    //     }
    //   }
    // }, 500);
  }, [comment]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.id) {
      const payload = {
        commentId: form.id,
        content: form.content,
      };
      dispatch(
        editCommentThunk({
          payload,
          id: from._id,
          config,
          type,
        })
      );
    } else {
      const payload = {
        content: form.content,
      };

      dispatch(
        createCommentThunk({
          payload,
          id: from._id,
          config,
          type,
        })
      );
    }
    setForm({ content: "" } as FormType);
    setToggleComment(false);
  };

  return (
    <>
      <div className="mt-5">
        {from.comments.map((comment: IComment) => (
          <Comment
            key={nanoid()}
            comment={comment}
            setForm={setForm}
            setToggleComment={setToggleComment}
          />
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
          <form className="flex" onSubmit={handleSubmit}>
            <textarea
              name="content"
              id="content"
              placeholder="add a useful comment"
              value={form && form.content}
              onChange={handleChange}
              className="w-full bg-transparent p-2 border border-slate-300 placeholder:text-sm"
              autoFocus
            ></textarea>
            <div className="mx-2">
              <Button
                name={form.id ? "Save edits" : "Add comment"}
                disabled={false}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const Comment = ({ comment, setForm, setToggleComment }: PropsComment) => {
  const { user } = useAppSelector((state) => state.auth);
  if (comment.owner.username === "haoma") {
    console.log(comment.owner._id === user?._id);
  }

  // const { form, handleChange, setForm } = useForm<FormType>();

  const editMode = () => {
    setForm({ id: comment._id, content: comment.content });
    setToggleComment(true);
  };

  if (!comment || !user) return <></>;
  return (
    <div className="flex border-b border-gray-300 py-1 px-2 text-sm first-of-type:border-y hover-div:block">
      <p className="break-all">
        {comment.content}
        <span className="px-1">-</span>
        <span className="text-blue-500">{comment.owner.username}</span>
        <span className="px-1 text-xs text-gray-500">
          {formatDate(comment.createdAt)}
        </span>
      </p>
      {comment.owner._id === user._id && (
        <div className="hidden">
          <span>-</span>
          <button
            className="px-1 text-orange-600 hover:text-orange-700"
            onClick={editMode}
          >
            Edit
          </button>
          <button className="px-1 text-red-800 hover:text-red-900">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
