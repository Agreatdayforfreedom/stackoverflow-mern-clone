import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import QuestionForm from "../components/QuestionForm";

const AskQuestion = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;
  return (
    <main className="mt-7">
      <h1 className="inline-block text-3xl mx-4 my-7 text-slate-700 font-semibold">
        Ask a public question
      </h1>
      <QuestionForm />
    </main>
  );
};

export default AskQuestion;
