import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useAuth } from "../../context";
import MyButton from "../UI/button/MyButton";

const Navbar = () => {
  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setIsAuth(false);
    navigate("/login");
    localStorage.removeItem('auth')
  };
  return (
    <div className={styles.navbar}>
      <MyButton onClick={logout}>Выйти</MyButton>
      <div className={styles.navbar__links}>
        {isAuth ? (
          <>
            <Link to="/about">About</Link>
            <Link to="/posts">Posts</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
