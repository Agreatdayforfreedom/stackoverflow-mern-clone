import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { Link, useLocation } from "react-router-dom";

interface Props {
  open?: boolean;
  openMenu?: () => void;
}

export const SideBar = ({ open, openMenu }: Props) => {
  const [path, setPath] = useState<string>("");
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="flex justify-end mt-6">
      {open && (
        <button
          className="absolute top-1 right-2  "
          onClick={() => openMenu!()}
        >
          <IoClose size={28} className="text-slate-700" />
        </button>
      )}
      <nav className="w-full mt-5">
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
          <li>
            <Link
              to="/questions"
              className={`flex items-center py-2  hover:text-black hover:cursor-pointer ${
                path.includes("/questions") &&
                "bg-gray-300 border-r-4 border-orange-400 font-bold text-black"
              }`}
            >
              <span>
                <BiWorld size={20} className="ml-2 mr-1" />
              </span>
              Questions
            </Link>
          </li>
          <li>
            <Link
              to="/tags"
              className={`inline-block w-full py-2 px-8 hover:text-black hover:cursor-pointer" ${
                path === "/tags" &&
                "bg-gray-300 border-r-4 border-orange-400 font-bold text-black"
              }`}
            >
              Tags
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`inline-block w-full py-2 px-8 hover:text-black hover:cursor-pointer ${
                path.includes("/users") &&
                "bg-gray-300 border-r-4 border-orange-400 font-bold text-black"
              }`}
            >
              Users
            </Link>
          </li>
          {/* </div> */}
        </ul>
      </nav>
    </div>
  );
};
