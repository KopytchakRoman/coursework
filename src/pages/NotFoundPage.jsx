import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Сторінку не знайдено</h2>

          <Link to="/" className={styles.button}>
            Повернутись на головну
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
