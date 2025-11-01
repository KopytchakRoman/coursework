import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.css';

import heartIcon from '../../assets/Heart.png';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Perfumer
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Головна
        </NavLink>

        <NavLink
          to="/brands"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Бренди
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Про нас
        </NavLink>
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Вхід/Реєстрація
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.iconLink} ${isActive ? styles.iconActive : ''}`
              : `${styles.navLink} ${styles.iconLink}`
          }
        >
          <img
            src={heartIcon}
            alt="Favorites"
            className={styles.heartIconImage}
          />
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
