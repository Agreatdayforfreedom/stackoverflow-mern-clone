import { useEffect } from "react";
import { FaCubes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <></>;
  return (
    <header className=" bg-white flex justify-between items-center shadow-lg fixed top-0 w-full">
      <div className="flex p-2 mx-3 items-center">
        <FaCubes size={35} className="text-orange-400 mx-1" />
        <h1 className="flex text-xl text-neutral-900">
          heap<span className="font-bold mx-1"> overflow</span>
        </h1>
      </div>
      <button onClick={() => dispatch(logout())}>Log Out</button>
      {user ? (
        <div>
          welcome
          {user.username}
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="p-2 mx-1 text-sm text-white rounded border border-blue-500 bg-blue-300 hover:bg-blue-400 transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="p-2 mx-1 text-sm text-white rounded border border-blue-700 bg-blue-500  hover:bg-blue-600 transition-all"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
