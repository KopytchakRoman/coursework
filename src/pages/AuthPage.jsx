import React, { useState } from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './AuthPage.module.css';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('register');

  return (
    <div className={styles.authPageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.formContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabLink} ${activeTab === 'login' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Вхід
            </button>
            <button
              className={`${styles.tabLink} ${activeTab === 'register' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Реєстрація
            </button>
          </div>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Електронна пошта:
              </label>
              <input type="email" id="email" className={styles.input} />
            </div>

            {activeTab === 'register' && (
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Ім'я:
                </label>
                <input type="text" id="name" className={styles.input} />
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Пароль:
              </label>
              <input type="password" id="password" className={styles.input} />
            </div>

            {activeTab === 'register' && (
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Підтвердіть пароль:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={styles.input}
                />
              </div>
            )}

            <button type="submit" className={styles.submitButton}>
              {activeTab === 'register' ? 'Зареєструватись' : 'Увійти'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AuthPage;
