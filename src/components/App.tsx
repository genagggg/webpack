import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import styles from './App.module.scss';
import { AuthContext } from '../context';
import Navbar from './Navbar/Navbar';
import AppRouter from './AppRouter';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <HashRouter>
        <Navbar />
        <div className={styles.App}>
          <AppRouter />
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
}
