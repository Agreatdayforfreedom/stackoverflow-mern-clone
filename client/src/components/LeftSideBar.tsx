import React from "react";
import { Outlet } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="mt-7 flex">
      <div className="w-40 hidden sm:block bg-red-500 h-full">1</div>
      <Outlet />
    </div>
  );
};

export default LeftSideBar;
