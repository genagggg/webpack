import { HashRouter } from "react-router-dom";
import styles from "./App.module.scss";
import Navbar from "./Navbar/Navbar";
import AppRouter from "./AppRouter";
import { AuthContext } from "../context";
import { useState } from "react";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth
      }}
    >
      <HashRouter>
        <Navbar />
        <div className={styles.App}>
          <AppRouter />
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
}
