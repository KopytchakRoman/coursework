import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainContent}>
        <div className={styles.about}>
          <div className={styles.logo}>Perfumer</div>
          <p className={styles.description}>
            Perfumer — це ваш персональний гід у світі ароматів. Використовуйте
            наш пошук та фільтри, щоб легко знайти та обрати парфум, що
            пасуватиме саме вам.
          </p>
        </div>

        <div className={styles.follow}>
          <h4 className={styles.followTitle}>Follow us</h4>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialLink}>
              FB
            </a>
            <a href="#" className={styles.socialLink}>
              IN
            </a>
            <a href="#" className={styles.socialLink}>
              TG
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© 2025 Perfumer. Всі права захищено.</span>
        <div className={styles.legalLinks}>
          <Link to="/policy" className={styles.legalLink}>
            Політика конфіденційності
          </Link>
          <Link to="/terms" className={styles.legalLink}>
            Умови використання
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
