import React from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './AuthPage.module.css';
import { Link } from 'react-router-dom';

function AuthPage() {
  return (
    <div className={styles.authPageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.formContainer}>
          <div className={styles.tabs}>
            <Link to="/auth" className={styles.tabLink}>
              Вхід
            </Link>
            <Link
              to="/auth"
              className={`${styles.tabLink} ${styles.tabActive}`}
            >
              Реєстрація
            </Link>
          </div>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Електронна пошта:
              </label>
              <input type="email" id="email" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Ім'я:
              </label>
              <input type="text" id="name" className={styles.input} />
            </div>

            <button type="submit" className={styles.submitButton}>
              Зареєструватись
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AuthPage;
