import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import QuestionCard from "../components/QuestionCard";
import Tag from "../components/Tag";
import { getQuestionsThunk } from "../features/question/questionApi";
import { clearState } from "../features/question/questionSlice";
import { Question, Tag as ITag } from "../interfaces/interfaces";

const Home = () => {
  const { questions } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearState());

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
        <QuestionCard key={nanoid()} question={q} />
      ))}
      <div className="hidden md:block">empty sectionnnnnnnn</div>
    </section>
  );
};

export default Home;
