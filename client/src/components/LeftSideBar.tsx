import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { SideBar } from "./SideBar";

const LeftSideBar = () => {
  return (
    <div className="mt-7 flex h-full relative">
      <div className="fixed overflow-x-hidden w-40 h-screen hidden sm:block border-r border-slate-400">
        <SideBar />
      </div>

      <main className="relative m-0 sm:ml-40 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default LeftSideBar;
