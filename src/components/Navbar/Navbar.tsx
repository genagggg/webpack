import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { AuthContext } from "../../context";
const Navbar = () => {
  const [isAuth] = useContext(AuthContext);
  console.log('isAus', isAuth)
  return (
    <div className={styles.navbar}>
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
