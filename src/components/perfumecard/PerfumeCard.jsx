import React from 'react';
import styles from './PerfumeCard.module.css';
import { Link, useNavigate } from 'react-router-dom'; // 1. ІМПОРТУЄМО useNavigate

import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx'; // 2. ІМПОРТУЄМО useAuth

import heartOutlineIcon from '/assets/heart-outline.png';
import heartFilledIcon from '/assets/Heart.png';

function PerfumeCard({ id, brand, name, type, imageUrl }) {
  const perfume = { id, brand, name, type, imageUrl };

  const { toggleFavorite, isFavorite } = useFavorites();
  const { isLoggedIn } = useAuth(); // 3. ОТРИМУЄМО СТАН АВТОРИЗАЦІЇ
  const navigate = useNavigate(); // 4. ОТРИМУЄМО ФУНКЦІЮ НАВІГАЦІЇ

  const isFav = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 5. --- ГОЛОВНА ЛОГІКА ---
    if (isLoggedIn) {
      // Якщо користувач залогінений - додаємо в обране
      toggleFavorite(perfume);
    } else {
      // Якщо ні - перекидаємо на сторінку логіну
      navigate('/auth');
    }
    // ---------------------------
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
