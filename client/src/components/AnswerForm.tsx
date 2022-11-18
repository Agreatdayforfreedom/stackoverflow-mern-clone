import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editAnswerThunk } from "../features/answer/answerApi";
import { useForm } from "../hooks/useForm";
import { Answer } from "../interfaces/interfaces";
import { configAxios } from "../utils/configAxios";
import Button from "./Button";

interface Props {
  answer: Answer;
}

const AnswerForm = ({ answer }: Props) => {
  const [fill, setFill] = useState<boolean>(true);

  const params = useParams();
  const navigate = useNavigate();

  const { loading, questionId, token } = useAppSelector(
    (state) => state.answers
  );
  const config = configAxios(token);

  const { form, handleChange, setForm } = useForm<{ content: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(form.content);
    if ("content" in form && form.content.trim() !== "") {
      setFill(false);
    } else {
      setFill(true);
    }
  }, [form]);

  useEffect(() => {
    setForm({ content: answer.content });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = form;
    if (params.id) {
      dispatch(editAnswerThunk({ id: params.id, payload, config }));
      if (!loading && questionId) {
        navigate(`/questions/${questionId}`);
      }
    }
  };

  return (
    <form className="m-2" onSubmit={handleSubmit}>
      <div className="flex flex-col bg-white border rounded text-slate-700 border-slate-400 my-5 p-5">
        <label htmlFor="content" className="font-semibold text-lg">
          Body
        </label>
        <textarea
          className="p-1 h-40 border border-slate-300"
          name="content"
          id="content"
          value={(form && form.content) || ""}
          onChange={handleChange}
          autoFocus
        ></textarea>
      </div>
      <Button name={"Save edits"} disabled={fill} />
    </form>
  );
};

export default AnswerForm;
