import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authThunk, loginThunk } from "../features/auth/authApi";
// import { authThunk, loginThunk } from "../features/auth/authSlice";

const Login = () => {
  const [findBy, setFindBy] = useState("");
  const [password, setPassword] = useState("");

  const user = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginThunk({ findBy, password }));
  };

  return (
    <div>
      {user && <p>{user.user.email}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="findBy"
          id="findBy"
          placeholder="find by"
          value={findBy}
          onChange={(e) => setFindBy(e.target.value)}
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="passoword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
