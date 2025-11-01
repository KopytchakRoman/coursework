import React from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import PerfumeCard from '../components/perfumecard/PerfumeCard.jsx';
import styles from './HomePage.module.css';

import searchIcon from '../assets/lupa.png';
import arrowLeft from '../assets/arrow-left.png';
import arrowRight from '../assets/arrow-right.png';
import diorSauvage from '../assets/dior-sauvage.png';

import popular1 from '../assets/popular-1.png';
import popular2 from '../assets/popular-2.png';
import popular3 from '../assets/popular-3.png';
import popular4 from '../assets/popular-4.png';
import popular5 from '../assets/popular-5.png';
import popular6 from '../assets/popular-6.png';

const mockPerfumes = [
  {
    id: 1,
    brand: 'Yves Saint Laurent',
    name: 'MYSLF',
    type: 'Eau de Parfum',
    imageUrl: diorSauvage,
  },
  {
    id: 2,
    brand: 'Dior',
    name: 'Sauvage EDP',
    type: 'Eau de Parfum',
    imageUrl: diorSauvage,
  },
  {
    id: 3,
    brand: 'Yves Saint Laurent',
    name: 'MYSLF',
    type: 'Eau de Parfum',
    imageUrl: diorSauvage,
  },
  {
    id: 4,
    brand: 'Dior',
    name: 'Sauvage EDP',
    type: 'Eau de Parfum',
    imageUrl: diorSauvage,
  },
];

const popularImages = [
  { id: 1, src: popular1, className: styles.popularTall },
  { id: 2, src: popular2, className: '' },
  { id: 3, src: popular4, className: '' },
  { id: 4, src: popular6, className: styles.popularTall },
  { id: 5, src: popular3, className: '' },
  { id: 6, src: popular5, className: '' },
];

function HomePage() {
  return (
    <div className={styles.homePage}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              ЗНАЙДИ САМЕ ТЕ, ЩО ТОБІ ПОТРІBНО
            </h1>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Пошук..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <img
                  src={searchIcon}
                  alt="Search"
                  className={styles.searchIconImage}
                />
              </button>
            </div>
          </div>
          <div className={styles.paginationDots}>
            <div className={`${styles.dot} ${styles.dotActive}`}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>НОВИНКИ</h2>
          <div className={styles.carouselContainer}>
            <button className={`${styles.arrowButton} ${styles.arrowLeft}`}>
              <img src={arrowLeft} alt="Previous" />
            </button>
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
            <button className={`${styles.arrowButton} ${styles.arrowRight}`}>
              <img src={arrowRight} alt="Next" />
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ЗАРАЗ ПОПУЛЯРНО</h2>
          <div className={styles.popularGrid}>
            {popularImages.map((image) => (
              <a
                href="#"
                key={image.id}
                className={`${styles.popularItem} ${image.className}`}
              >
                <img
                  src={image.src}
                  alt={`Popular ${image.id}`}
                  className={styles.popularImage}
                />
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>УПОДОБАННЯ</h2>
          <div className={styles.carouselContainer}>
            <button className={`${styles.arrowButton} ${styles.arrowLeft}`}>
              <img src={arrowLeft} alt="Previous" />
            </button>
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
            <button className={`${styles.arrowButton} ${styles.arrowRight}`}>
              <img src={arrowRight} alt="Next" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
