import React from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './PerfumeDetail.module.css';
import useFetch from '../hooks/useFetch.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

import { useAuth } from '../context/AuthContext.jsx';

function PerfumeDetailPage() {
  const { id } = useParams();
  const { data: allPerfumes, loading, error } = useFetch('/perfumes');

  const { toggleFavorite, isFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const perfume = allPerfumes ? allPerfumes.find((p) => p.id == id) : null;

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.mainContent}>
          <p className={styles.loadingText}>Завантаження парфуму...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !perfume) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.mainContent}>
          <p className={styles.errorText}>
            {error ? error.message : `Парфум з ID ${id} не знайдено.`}
          </p>
          <Link to="/" className={styles.backLink}>
            Повернутись на головну
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isFav = isFavorite(perfume.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      toggleFavorite(perfume);
    } else {
      navigate('/auth');
    }
  };

  const pageStyle = {
    backgroundImage: `url(${perfume.backgroundUrl || '/assets/sauvage-bg.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div className={styles.page} style={pageStyle}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.topSection}>
          <div className={styles.imageContainer}>
            <img
              src={perfume.imageUrl}
              alt={perfume.name}
              className={styles.perfumeImage}
            />
            <button className={styles.heartIcon} onClick={handleFavoriteClick}>
              <img
                src={isFav ? '/assets/Heart.png' : '/assets/heart-outline.png'}
                alt="Favorite"
                className={styles.heartIconImage}
              />
            </button>
          </div>

          <div className={styles.detailsContainer}>
            <h1 className={styles.title}>{perfume.name}</h1>

            <div className={styles.notesSection}>
              {perfume.notes &&
                perfume.notes.map((note) => (
                  <div key={note.name} className={styles.note}>
                    <span className={styles.noteName}>{note.name}</span>
                    <div className={styles.noteBarContainer}>
                      <div
                        className={styles.noteBarFiller}
                        style={{
                          width: `${note.value}%`,
                          backgroundColor: note.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {perfume.tags && (
          <div className={styles.tagsSection}>
            {perfume.tags.map((tag) => (
              <div key={tag.title} className={styles.tagGroup}>
                <span className={styles.tagTitle}>{tag.title}</span>
                <div className={styles.tagCard}>
                  <span className={styles.tagValue}>{tag.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {perfume.description && (
          <div className={styles.descriptionSection}>
            <div className={styles.descriptionContent}>
              <h2 className={styles.descriptionTitle}>Опис</h2>
              <p className={styles.descriptionText}>{perfume.description}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default PerfumeDetailPage;
