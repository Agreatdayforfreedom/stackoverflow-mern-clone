import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderLayout from "./layouts/HeaderLayout";
// import Some from "./features/auth/Some";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* <Some /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
