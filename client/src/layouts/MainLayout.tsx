import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authThunk } from "../features/auth/authApi";
import { configAxios } from "../utils/configAxios";
import Header from "../components/Header";
import { noAuthState } from "../features/auth/authSlice";

const MainLayout = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const config = configAxios(token);

  useEffect(() => {
    if (token) {
      dispatch(authThunk(config));
    } else {
      dispatch(noAuthState());
    }
  }, [token, dispatch]);

  return (
    <div>
      <Header />;
      <Outlet />
    </div>
  );
};

export default MainLayout;
