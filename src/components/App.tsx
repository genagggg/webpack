import { HashRouter, Route, Routes } from "react-router-dom";
import { Posts } from "../pages/Posts";
import About from "../pages/About";
import styles from "./App.module.scss";
export default function App() {
  return (
    <HashRouter>
      <div className={styles.navbar}>
        <div className={styles.navbar__links}>
          <a href="#/about">About</a>
          <a href="#/posts">Posts</a>
        </div>
      </div>
      <div className={styles.App}>
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </HashRouter>
  );
}
