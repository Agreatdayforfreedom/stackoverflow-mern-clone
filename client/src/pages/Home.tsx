import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Tag from "../components/Tag";
import { getQuestionsThunk } from "../features/question/questionApi";
import { Question, Tag as ITag } from "../interfaces/interfaces";

const Home = () => {
  const { questions } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, []);

  return (
    <section className="mt-5 w-full flex flex-col">
      <div className="flex justify-between mt-2 mb-5">
        <h1 className=" mx-5 text-3xl">Top Quesions</h1>
        <Link to="/questions/ask" className="button primary">
          Ask Question
        </Link>
      </div>
      {questions.map((q: Question) => (
        <div className="flex flex-col md:flex-row w-full py-2 border-t border-slate-400">
          <div className="flex flex-row md:flex-col w-28 items-end">
            <p className="flex text-sm text-slate-900 py-1">
              <span className="px-1">0</span> votes
            </p>
            <p className="flex text-sm text-slate-600 py-1">
              <span className="px-1">0</span> answers
            </p>
            <p className="flex text-sm text-slate-600 py-1">
              <span className="px-1">0</span> views
            </p>
          </div>
          <div className="w-full">
            <div className="flex">
              <div className="ml-4">
                <Link
                  to={`/questions/${q._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {q.title}
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <div className="flex px-3 w-full ">
                {q.tags.map((tag: ITag) => (
                  <Tag key={nanoid()} tag={tag} />
                ))}
              </div>

              <div className="flex items-end justify-end">
                <p className=" text-sm">O</p>
                <p className="mx-1 text-sm text-sky-700">{q.owner.username}</p>
                <p className="font-semibold text-sm">48</p>
                <p className="mx-1 text-sm text-gray-500 whitespace-nowrap">
                  {" "}
                  asked 6 min ago
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="hidden md:block">empty sectionnnnnnnn</div>
    </section>
  );
};

export default Home;
