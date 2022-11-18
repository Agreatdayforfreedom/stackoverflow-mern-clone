import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "../components/Button";
import {
  createQuestionThunk,
  editQuestionThunk,
} from "../features/question/questionApi";
import { clearState } from "../features/question/questionSlice";
import { useForm } from "../hooks/useForm";
import { configAxios } from "../utils/configAxios";

enum AskQuesionFields_enum {
  title = "title",
  content = "content",
  tagsString = "tagsString",
}
interface AskQuesionForm {
  title: string;
  content: string;
  tagsString: string;
  tags?: string[];
}

interface Props {
  defaultValues?: {
    title: string;
    content: string;
    tagsString: string;
  };
  id?: string;
}

const QuestionForm = ({ defaultValues, id }: Props) => {
  const [fill, setFill] = useState<boolean>(true);

  const { handleChange, form, setForm } = useForm<AskQuesionForm>();

  const { token, loading } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  }, []);

  useEffect(() => {
    if (
      AskQuesionFields_enum.title in form &&
      AskQuesionFields_enum.content in form &&
      AskQuesionFields_enum.tagsString in form &&
      ![form.title, form.content, form.tagsString].includes("")
    ) {
      setFill(false);
    } else {
      setFill(true);
    }
  }, [form]);
  const config = configAxios(token);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    let tags = form.tagsString
      .trim()
      .split(" ")
      .map((x) => x.trim());

    const { tagsString, ...rem } = form;
    const payload = {
      ...rem,
      tags,
    };
    if (id) {
      dispatch(editQuestionThunk({ payload, id, config }));
      if (!loading) {
        navigate(`/questions/${id}`);
      }
    } else {
      dispatch(createQuestionThunk({ payload, config }));
    }
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="flex flex-col bg-white border rounded border-slate-400 my-5 p-5">
        <label htmlFor="title" className="font-semibold text-slate-700 text-lg">
          Title
        </label>
        {!id && (
          <label htmlFor="title" className="text-sm  text-slate-700 pb-1">
            Be specific and imagine you’re asking a question to another human.
          </label>
        )}
        <input
          type="text"
          name="title"
          id="title"
          value={(form && form.title) || ""}
          className="p-1 rounded border border-slate-300"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col bg-white border rounded text-slate-700 border-slate-400 my-5 p-5">
        {!id ? (
          <>
            <label htmlFor="content" className="font-semibold text-lg">
              What are the details of your problem?
            </label>
            <label htmlFor="content" className="text-sm text-slate-700 pb-1">
              Introduce the problem.
            </label>
          </>
        ) : (
          <label htmlFor="content" className="font-semibold text-lg">
            Body
          </label>
        )}
        <textarea
          className="p-1 h-40 border border-slate-300"
          name="content"
          id="content"
          value={(form && form.content) || ""}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex flex-col bg-white border rounded text-slate-700 border-slate-400 my-5 p-5">
        <label htmlFor="tags" className="font-semibold text-lg">
          Tags
        </label>
        {!id && (
          <label htmlFor="tags" className="text-sm text-slate-700 pb-1">
            Add tags to describe what your question is about (separate each by a
            space)
          </label>
        )}
        <input
          type="text"
          name="tagsString"
          id="tags"
          value={(form && form.tagsString) || ""}
          className="p-1 rounded border border-slate-300"
          onChange={handleChange}
        />
      </div>
      <Button name={id ? "Save edits" : "Send your question"} disabled={fill} />
    </form>
  );
};

export default QuestionForm;
