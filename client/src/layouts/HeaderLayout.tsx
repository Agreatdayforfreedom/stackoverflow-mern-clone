import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authThunk } from "../features/auth/authApi";
import { logout } from "../features/auth/authSlice";
const HeaderLayout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  // if (!token) return "no token";
  if (user) {
    console.log(user);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    dispatch(authThunk(config));
  }, [dispatch]);

  return (
    <div>
      <p>Header</p>
      <button onClick={() => dispatch(logout())}>Log Out</button>
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
