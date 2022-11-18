import QuestionForm from "../components/QuestionForm";

const AskQuestion = () => {
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
