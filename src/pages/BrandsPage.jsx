import React from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './BrandsPage.module.css';

import brandYSL from '../assets/brands/ysl.png';
import brandLV from '../assets/brands/louis-vuitton.png';
import brandGucci from '../assets/brands/gucci.png';
import brandDior from '../assets/brands/dior.png';
import brandArmani from '../assets/brands/armani.png';
import brandTomFord from '../assets/brands/tom-ford.png';
import brandVersace from '../assets/brands/versace.png';
import brandDG from '../assets/brands/d&g.png';
import brandGivenchy from '../assets/brands/givenchy.png';
import brandCK from '../assets/brands/calvin-klein.png';
import brandBurberry from '../assets/brands/burberry.png';
import brandPrada from '../assets/brands/prada.png';
import brandJPG from '../assets/brands/jean-paul-gaultier.png';
import brandCreed from '../assets/brands/creed.png';
import brandPaco from '../assets/brands/paco-rabanne.png';

const alphabetRow1 = 'ABCDEFGHIJKLMN'.split('');
const alphabetRow2 = 'OPQRSTUVWXYZ'.split('');

const popularBrands = [
  { name: 'YSL', logo: brandYSL },
  { name: 'Louis Vuitton', logo: brandLV },
  { name: 'Gucci', logo: brandGucci },
  { name: 'Dior', logo: brandDior },
  { name: 'Armani', logo: brandArmani },
  { name: 'Tom Ford', logo: brandTomFord },
  { name: 'Versace', logo: brandVersace },
  { name: 'D&G', logo: brandDG },
  { name: 'Givenchy', logo: brandGivenchy },
  { name: 'Calvin Klein', logo: brandCK },
  { name: 'Burberry', logo: brandBurberry },
  { name: 'Prada', logo: brandPrada },
  { name: 'Jean Paul Gaultier', logo: brandJPG },
  { name: 'Creed', logo: brandCreed },
  { name: 'Paco Rabanne', logo: brandPaco },
];

function BrandsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>БРЕНДИ</h1>

        <nav className={styles.alphabetContainer}>
          <div className={styles.alphabetNav}>
            {alphabetRow1.map((letter) => (
              <a href="#" key={letter} className={styles.alphabetLink}>
                {letter}
              </a>
            ))}
          </div>
          <div className={styles.alphabetNav}>
            {alphabetRow2.map((letter) => (
              <a href="#" key={letter} className={styles.alphabetLink}>
                {letter}
              </a>
            ))}
          </div>
        </nav>

        <h2 className={styles.subtitle}>Популярні бренди</h2>

        <div className={styles.brandGrid}>
          {popularBrands.map((brand) => (
            <div key={brand.name} className={styles.brandCard}>
              <img
                src={brand.logo}
                alt={brand.name}
                className={styles.brandLogo}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BrandsPage;
