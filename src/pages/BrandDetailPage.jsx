import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import PerfumeCard from '../components/perfumecard/PerfumeCard.jsx';
import useFetch from '../hooks/useFetch.jsx';
import styles from './BrandDetailPage.module.css';

function BrandDetailPage() {
  const { brandName } = useParams();

  const { data: allPerfumes, loading, error } = useFetch('/perfumes');
  const brandPerfumes = allPerfumes
    ? allPerfumes.filter(
        (perfume) => perfume.brand.toLowerCase() === brandName.toLowerCase()
      )
    : [];

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{brandName}</h1>

        <div className={styles.perfumeGrid}>
          {loading && <p className={styles.loadingText}>Завантаження...</p>}
          {error && <p className={styles.errorText}>Помилка завантаження.</p>}

          {!loading &&
            brandPerfumes.length > 0 &&
            brandPerfumes.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                id={perfume.id}
                brand={perfume.brand}
                name={perfume.name}
                type={perfume.type}
                imageUrl={perfume.imageUrl}
              />
            ))}

          {!loading && brandPerfumes.length === 0 && (
            <p className={styles.loadingText}>
              На жаль, парфумів бренду "{brandName}" не знайдено.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BrandDetailPage;
