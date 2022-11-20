import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiWorld } from "react-icons/bi";

const LeftSideBar = () => {
  return (
    <div className="mt-7 flex h-full relative">
      <SideBar />
      <main className="m-0 sm:ml-40 w-full">
        <Outlet />
      </main>
    </div>
  );
};

const SideBar = () => {
  const [path, setPath] = useState<string>("");
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="fixed overflow-x-hidden w-40 h-screen hidden sm:block border-r border-slate-400">
      <div className="flex justify-end mt-6">
        <nav className="w-full">
          <ul className="text-sm text-slate-500">
            <li>
              <Link
                to="/"
                className={`inline-block w-full p-2 hover:text-black hover:cursor-pointer ${
                  path === "/" &&
                  "bg-gray-300 border-r-4 border-orange-400 font-bold text-black"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <p className="text-slate-500 p-2 uppercase text-xs">public</p>
            </li>
            {/* <div className="ml-4"> */}
            <li
              className={`flex items-center py-2  hover:text-black hover:cursor-pointer ${
                path.includes("/questions") &&
                "bg-gray-300 border-r-4 border-orange-400 font-bold text-black"
              }`}
            >
              <span>
                <BiWorld size={20} className="ml-2 mr-1" />
              </span>
              Questions
            </li>
            <li
              className={`py-2 px-8 hover:text-black hover:cursor-pointer" ${
                path === "/tags" &&
                "bg-gray-300 border-r-4 border-orange-400 font-bold text-black"
              }`}
            >
              Tags
            </li>
            <li
              className={`py-2 px-8 hover:text-black hover:cursor-pointer ${
                path === "/users" &&
                "bg-gray-300 border-r-4 border-orange-400 font-bold text-black"
              }`}
            >
              Users
            </li>
            {/* </div> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LeftSideBar;
