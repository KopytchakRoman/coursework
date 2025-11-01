import React from 'react';
import styles from './PerfumeCard.module.css';
import { Link } from 'react-router-dom';

import heartOutlineIcon from '../../assets/heart-outline.png';

function PerfumeCard({ id, brand, name, type, imageUrl }) {
  const imageToDisplay = imageUrl;

  return (
    <Link to={`/perfume/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.heartIcon}>
          <img
            src={heartOutlineIcon}
            alt="Add to Favorites"
            className={styles.heartIconImage}
          />
        </div>

        {!imageToDisplay ? (
          <div className={styles.imagePlaceholder}></div>
        ) : (
          <img
            src={imageToDisplay}
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
