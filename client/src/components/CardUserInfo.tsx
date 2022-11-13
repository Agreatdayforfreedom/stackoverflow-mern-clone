import React from "react";

const CardUserInfo = ({ user, question }: any) => {
  console.log(user);
  return (
    <div className={`w-48 ${question && "bg-blue-200 px-2 py-1 rounded"}`}>
      <p className="text-xs text-slate-600">asked 4 hours ago</p>
      <div className="flex ">
        <div className="w-8 h-8 bg-red-500 rounded mt-1"></div>
        <div className="px-2 flex flex-col">
          <span className="text-blue-500 align-top w-fit text-sm">
            {user.username}
          </span>
          <span className="text-sm font-bold text-slate-600">
            {user.reputation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardUserInfo;
