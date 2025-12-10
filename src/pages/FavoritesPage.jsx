import React from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import PerfumeCard from '../components/perfumecard/PerfumeCard.jsx';
import styles from './FavoritesPage.module.css';

import { useFavorites } from '../context/FavoritesContext.jsx';

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>ОБРАНІ АРОМАТИ</h1>

        {favorites.length > 0 ? (
          <>
            <p className={styles.subtitle}>
              Ваша особиста добірка ароматів, що розповідають вашу історію.
            </p>
            <div className={styles.perfumeGrid}>
              {favorites.map((perfume) => (
                <PerfumeCard
                  key={perfume.id}
                  id={perfume.id}
                  brand={perfume.brand}
                  name={perfume.name}
                  type={perfume.type}
                  imageUrl={perfume.imageUrl}
                />
              ))}
            </div>
          </>
        ) : (
          <p className={styles.subtitle}>
            Ваш список уподобань порожній. Додайте аромати на головній сторінці,
            натиснувши на ❤️.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
