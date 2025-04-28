import { HashRouter } from "react-router-dom";
import styles from "./App.module.scss";
import Navbar from "./Navbar/Navbar";
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
