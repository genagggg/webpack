import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAuth } from '../../context';

const Navbar = () => {
  const { isAuth } = useAuth();

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
