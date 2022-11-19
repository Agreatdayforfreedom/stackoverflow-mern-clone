import { nanoid } from "@reduxjs/toolkit";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createAnswerThunk,
  getAnswersThunk,
} from "../features/answer/answerApi";
import { setQuestionId } from "../features/answer/answerSlice";
import { useForm } from "../hooks/useForm";
import { configAxios } from "../utils/configAxios";
import Answer from "./Answer";
import Button from "./Button";

const Answers = () => {
  const { answers } = useAppSelector((state) => state.answers);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getAnswersThunk(params.id));
    }
  }, []);
  const length = answers.length;
  return (
    <div>
      {length > 0 && (
        <h1 className="font-semibold text-xl">
          <span>{length} </span>
          {length === 1 ? "Answer" : "Answers"}
        </h1>
      )}
      {answers.map((answer) => (
        <Answer key={nanoid()} answer={answer} />
      ))}
      <PostAnswer />
    </div>
  );
};

const PostAnswer = () => {
  const [fill, setFill] = useState(true);

  const { token } = useAppSelector((state) => state.answers);
  const dispatch = useAppDispatch();

  const params = useParams();
  const { handleChange, form } = useForm<{ content: string }>();

  const config = configAxios(token);

  useEffect(() => {
    console.log(form);
    if ("content" in form && form.content.trim() !== "") {
      setFill(false);
    } else {
      setFill(true);
    }
  }, [form]);

  useEffect(() => {
    dispatch(setQuestionId(params.id));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = form;
    if (params.id) {
      dispatch(createAnswerThunk({ id: params.id, payload, config }));
    }
  };

  return (
    <div className="p-2 mt-5">
      <h2 className=" text-lg">Your Answer</h2>
      <form className="mt-5" onSubmit={handleSubmit}>
        <textarea
          name="content"
          id="content"
          onChange={handleChange}
          className="w-full mb-4 bg-transparent rounded border p-2 border-slate-400"
        ></textarea>
        <Button name="Post your answer" disabled={fill} />
      </form>
    </div>
  );
};

export default Answers;
