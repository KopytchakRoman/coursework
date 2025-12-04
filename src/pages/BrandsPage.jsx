import { Link } from 'react-router-dom';
import Header from '../components/Header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './BrandsPage.module.css';
import useFetch from '../hooks/useFetch.jsx';

const popularBrands = [
  { name: 'Yves Saint Laurent', logo: '/assets/brands/ysl.png' },
  { name: 'Louis Vuitton', logo: '/assets/brands/louis-vuitton.png' },
  { name: 'Gucci', logo: '/assets/brands/gucci.png' },
  { name: 'Dior', logo: '/assets/brands/dior.png' },
  { name: 'Armani', logo: '/assets/brands/armani.png' },
  { name: 'Tom Ford', logo: '/assets/brands/tom-ford.png' },
  { name: 'Versace', logo: '/assets/brands/versace.png' },
  { name: 'D&G', logo: '/assets/brands/d&g.png' },
  { name: 'Givenchy', logo: '/assets/brands/givenchy.png' },
  { name: 'Calvin Klein', logo: '/assets/brands/calvin-klein.png' },
  { name: 'Burberry', logo: '/assets/brands/burberry.png' },
  { name: 'Prada', logo: '/assets/brands/prada.png' },
  { name: 'Jean Paul Gaultier', logo: '/assets/brands/jean-paul-gaultier.png' },
  { name: 'Creed', logo: '/assets/brands/creed.png' },
  { name: 'Paco Rabanne', logo: '/assets/brands/paco-rabanne.png' },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function BrandsPage() {
  const { data: fullBrandList, loading: fullListLoading } = useFetch('/brands');

  const handleLetterClick = (letter) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>БРЕНДИ</h1>
        <h2 className={styles.subtitle}>Популярні бренди</h2>

        <div className={styles.brandGrid}>
          {popularBrands.map((brand) => (
            <Link
              to={`/brands/${encodeURIComponent(brand.name)}`}
              key={brand.name}
              className={styles.brandCardLink}
            >
              <div className={styles.brandCard}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={styles.brandLogo}
                />
              </div>
            </Link>
          ))}
        </div>

        <nav className={styles.alphabetContainer}>
          <div className={styles.alphabetNav}>
            {alphabet.map((letter) => (
              <button
                key={letter}
                className={styles.alphabetLink}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </nav>

        <div className={styles.fullBrandList}>
          {fullListLoading && <p>Завантаження...</p>}

          {fullBrandList &&
            Object.keys(fullBrandList).map((letter) => (
              <section
                key={letter}
                id={`letter-${letter}`}
                className={styles.letterGroup}
              >
                <h3 className={styles.letterTitle}>{letter}</h3>
                <div className={styles.brandListColumn}>
                  {fullBrandList[letter].map((brandName) => (
                    <Link
                      key={brandName}
                      to={`/brands/${encodeURIComponent(brandName)}`}
                      className={styles.brandLink}
                    >
                      {brandName}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BrandsPage;
