import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import LeftSideBar from "./components/LeftSideBar";
import MainLayout from "./layouts/MainLayout";
import AskQuestion from "./pages/AskQuestion";
import EditQuestion from "./pages/EditQuestion";
import Home from "./pages/Home";
// import Some from "./features/auth/Some";
import Login from "./pages/Login";
import Question from "./pages/Question";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LeftSideBar />}>
            <Route index element={<Home />} />
            <Route path="/questions/:id" element={<Question />} />
            <Route path="/questions/:id/edit" element={<EditQuestion />} />
          </Route>
          <Route path="/questions/ask" element={<AskQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
