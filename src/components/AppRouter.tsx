import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Posts } from "../pages/Posts";
import Error from "../pages/Error";
import About from "../pages/About";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/posts" element={<Posts />} />
      <Route path="/about" element={<About />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export default AppRouter;
