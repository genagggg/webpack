import { HashRouter } from "react-router-dom";
import styles from "./App.module.scss";
import Navbar from "./Navbar/Navbar";
import Error from "../pages/Error";
import AppRouter from "./AppRouter";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className={styles.App}>
        <AppRouter />
      </div>
    </HashRouter>
  );
}
