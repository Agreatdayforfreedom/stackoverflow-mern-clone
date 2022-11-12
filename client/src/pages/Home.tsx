import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getQuestionsThunk } from "../features/question/quesionApi";

const Home = () => {
  const { question } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(question);
  }, [question]);

  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, []);

  return (
    <main className="w-full">
      <section className="mt-5 px-3">
        {question.map((q: any) => (
          <div className="flex w-full pt-2 px-4 border-t border-slate-400">
            <div className="w-28 text-end">
              <p className="text-sm text-slate-900 py-1">0 votes</p>
              <p className="text-sm text-slate-600 py-1">0 answers</p>
              <p className="text-sm text-slate-600 py-1">0 views</p>
            </div>
            <div className="w-full">
              <div className="flex">
                <div className="ml-4">
                  <h2 className="text-blue-500">{q.title}</h2>
                  <p className="text-sm text-slate-800">{q.content}</p>
                </div>
              </div>
              <div className="flex  w-full">
                <div className="flex px-3 w-full ">
                  {q.tags.map((tag: any) => (
                    <p className="m-2 py-0.5 items-center  px-2 text-sm bg-[#d0dee9] rounded opacity-95 text-[#39739d] hover:bg-blue-200 hover:cursor-pointer transition-colors">
                      {tag}
                    </p>
                  ))}
                </div>

                <div className="flex items-end">
                  <p className=" text-sm">O</p>
                  <p className="mx-1 text-sm text-sky-700">
                    {q.owner.username}
                  </p>
                  <p className="font-semibold text-sm">48</p>
                  <p className="mx-1 text-sm text-gray-500"> asked 6 min ago</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
