import React from 'react';
import styles from './PerfumeCard.module.css';
import { Link } from 'react-router-dom';

// 1. ВИПРАВЛЕНО: Шлях тепер веде до .js файлу
import { useFavorites } from '../../context/FavoritesContext.js';

import heartOutlineIcon from '/assets/heart-outline.png';
import heartFilledIcon from '/assets/Heart.png';

function PerfumeCard({ id, brand, name, type, imageUrl }) {
  const perfume = { id, brand, name, type, imageUrl };

  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(perfume);
  };

  return (
    <Link to={`/perfume/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <button className={styles.heartIcon} onClick={handleFavoriteClick}>
          <img
            src={isFav ? heartFilledIcon : heartOutlineIcon}
            alt="Toggle Favorite"
            className={styles.heartIconImage}
          />
        </button>

        {!imageUrl ? (
          <div className={styles.imagePlaceholder}></div>
        ) : (
          <img
            src={imageUrl}
            alt={`${brand} ${name}`}
            className={styles.perfumeImage}
          />
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.brand}>{brand}</span>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.type}>{type}</span>
      </div>
    </Link>
  );
}

export default PerfumeCard;
