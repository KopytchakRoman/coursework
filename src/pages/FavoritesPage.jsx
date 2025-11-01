import React from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import PerfumeCard from '../components/perfumecard/PerfumeCard.jsx';
import styles from './FavoritesPage.module.css';

const mockPerfumes = [
  {
    id: 1,
    brand: 'Yves Saint Laurent',
    name: 'MYSLF',
    type: 'Eau de Parfum',
    imageUrl: null,
  },
  {
    id: 2,
    brand: 'Dior',
    name: 'Sauvage EDP',
    type: 'Eau de Parfum',
    imageUrl: null,
  },
  {
    id: 3,
    brand: 'Yves Saint Laurent',
    name: 'MYSLF',
    type: 'Eau de Parfum',
    imageUrl: null,
  },
  {
    id: 4,
    brand: 'Dior',
    name: 'Sauvage EDP',
    type: 'Eau de Parfum',
    imageUrl: null,
  },
];

function FavoritesPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>ОБРАНІ АРОМАТИ</h1>
        <p className={styles.subtitle}>
          Ваша особиста добірка ароматів, що розповідають вашу історію.
        </p>

        <div className={styles.perfumeGrid}>
          {mockPerfumes.map((perfume) => (
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
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
