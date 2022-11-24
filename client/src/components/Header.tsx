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
    <header className="z-20 bg-white flex justify-between h-[50px] items-center shadow-lg fixed top-0 w-full">
      <div className="flex mx-3 items-center">
        <FaCubes size={35} className="text-orange-400 mx-1" />
        <Link to="/" className="flex text-xl text-neutral-900">
          heap<span className="font-bold mx-1"> overflow</span>
        </Link>
      </div>
      {user ? (
        <div className="flex h-full">
          <Link
            to={`/users/${user._id}`}
            className="flex h-full items-center justify-center mr-10 hover:bg-slate-200 transition-colors px-4"
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="w-6 h-6 rounded"
            />
            <span className="text-sm font-semibold text-slate-600 mx-1">
              {user.reputation}
            </span>
          </Link>

          <button
            className="text-sm font-semibold text-orange-500 hover:bg-orange-100 hover:text-slate-900 transition-all px-3"
            onClick={() => dispatch(logout())}
          >
            Log out
          </button>
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
