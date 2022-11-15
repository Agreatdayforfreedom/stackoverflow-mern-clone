import { nanoid } from "@reduxjs/toolkit";
import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "../components/Button";
import CardUserInfo from "../components/CardUserInfo";
import CommentSection from "../components/CommentSection";
import Tag from "../components/Tag";
import Voting from "../components/Voting";
import { createCommentThunk } from "../features/comment/commentsApi";
import { getQuestionThunk } from "../features/question/questionApi";
import {
  Tag as ITag,
  Comment as IComment,
  Question as IQuestion,
} from "../interfaces/interfaces";
import { getToken } from "../utils/getToken";

const Question = () => {
  const { question, loading } = useAppSelector((state) => state.question);

  const dispatch = useAppDispatch();
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      dispatch(getQuestionThunk(params.id));
    }
  }, []);

  if (loading || !question) return <p>loading</p>;
  return (
    <section className="p-4 w-full">
      {/* header */}
      <div className="border-b border-slate-300 px-2 pb-4">
        <h1 className="text-2xl text-gray-700">{question.title}</h1>
        <div className="flex pt-1">
          <p className="text-sm text-slate-600 px-2">
            Asked <span className="text-black">today</span>
          </p>
          <p className="text-sm text-slate-700 px-2">
            Modified <span className="text-black">today</span>
          </p>
          <p className="text-sm text-slate-700 px-2">
            Viewed <span className="text-black">23</span>
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <Voting vote={10} />
        <div className="w-full p-4">
          <p className="break-all">{question.content}</p>
          <div className="flex my-5">
            {question &&
              question.tags.map((tag: ITag) => (
                <Tag key={nanoid()} tag={tag} />
              ))}
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-sm text-slate-600 px-1 hover:cursor-pointer hover:text-slate-500 transition-all">
                Share
              </p>
              <p className="text-sm text-slate-600 px-1 hover:cursor-pointer hover:text-slate-500 transition-all">
                Edit
              </p>
              <p className="text-sm text-slate-600 px-1 hover:cursor-pointer hover:text-slate-500 transition-all">
                Follow
              </p>
              <p className="text-sm text-slate-600 px-1 hover:cursor-pointer hover:text-slate-500 transition-all">
                Flag
              </p>
            </div>
            <CardUserInfo user={question.owner} question={question} />
          </div>
          <CommentSection question={question} />
        </div>
      </div>
    </section>
  );
};

export default Question;
