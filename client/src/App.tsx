import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import { authThunk } from "./features/auth/authApi";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
// import Some from "./features/auth/Some";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { getToken } from "./utils/getToken";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
