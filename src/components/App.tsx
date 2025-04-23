import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Posts } from "../pages/Posts";
import About from "../pages/About";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}
