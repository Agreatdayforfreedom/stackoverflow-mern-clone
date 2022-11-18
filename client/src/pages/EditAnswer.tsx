import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AnswerForm from "../components/AnswerForm";
import { Spinner } from "../components/Spinner";
import { getAnswerThunk } from "../features/answer/answerApi";
import { Answer } from "../interfaces/interfaces";
import { configAxios } from "../utils/configAxios";

const EditAnswer = () => {
  const params = useParams();

  const { answer, loading, token } = useAppSelector((state) => state.answers);

  const dispatch = useAppDispatch();

  const config = configAxios(token);

  useEffect(() => {
    if (params.id) {
      dispatch(getAnswerThunk({ id: params.id, config }));
    }
  }, []);

  if (loading || !answer) return <Spinner />;
  return (
    <div>
      <AnswerForm answer={answer} />
    </div>
  );
};

export default EditAnswer;
