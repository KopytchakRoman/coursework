import React, { useState } from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './AuthPage.module.css';
import { useNavigate } from 'react-router-dom';

// 1. ВИПРАВЛЕНО: Шлях тепер веде до .js файлу
import { useAuth } from '../context/AuthContext.js';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (activeTab === 'login') {
      if (!email || !password) {
        setError('Будь ласка, заповніть всі поля');
        return;
      }

      const result = await login(email, password);

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } else {
      if (password !== confirmPassword) {
        setError('Паролі не збігаються');
        return;
      }
      setError('Реєстрація наразі недоступна');
    }
  };

  return (
    <div className={styles.authPageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.formContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabLink} ${activeTab === 'login' ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
            >
              Вхід
            </button>
            <button
              className={`${styles.tabLink} ${activeTab === 'register' ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
            >
              Реєстрація
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Електронна пошта:
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {activeTab === 'register' && (
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Ім'я:
                </label>
                <input
                  type="text"
                  id="name"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Пароль:
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {error && <p className={styles.errorText}>{error}</p>}

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
