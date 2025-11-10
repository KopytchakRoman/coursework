import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import PerfumeCard from '../components/perfumecard/PerfumeCard.jsx';
import styles from './HomePage.module.css';
import useFetch from '../hooks/useFetch.jsx';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

const slides = [
  {
    id: 1,
    src: '/assets/hero-background.png',
    title: 'ЗНАЙДИ САМЕ ТЕ, ЩО ТОБІ ПОТРІBНО',
  },
  { id: 2, src: '/assets/popular-1.png', title: 'НОВА КОЛЕКЦІЯ ATTAR' },
  { id: 3, src: '/assets/popular-3.png', title: 'ЗЕЛЕНА СВІЖІСТЬ MANCERA' },
];

const popularImages = [
  {
    id: 1,
    src: '/assets/popular-1.png',
    className: styles.popularTall,
    perfumeId: 22,
  },
  { id: 2, src: '/assets/popular-2.png', className: '', perfumeId: 7 },
  { id: 3, src: '/assets/popular-4.png', className: '', perfumeId: 10 },
  {
    id: 4,
    src: '/assets/popular-6.png',
    className: styles.popularTall,
    perfumeId: 12,
  },
  { id: 5, src: '/assets/popular-3.png', className: '', perfumeId: 20 },
  { id: 6, src: '/assets/popular-5.png', className: '', perfumeId: 15 },
];

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const novinkiGridRef = useRef(null);
  const upodobannyaGridRef = useRef(null);

  const { data: allPerfumes, loading, error } = useFetch('/perfumes');
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { favorites } = useFavorites();

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const brandFromUrl = searchParams.get('search');
    if (brandFromUrl && allPerfumes) {
      setSearchInput(brandFromUrl);
      setSearchTerm(brandFromUrl);
      setIsSearching(true);
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  }, [allPerfumes, searchParams, setSearchParams]);
  const suggestions = useMemo(() => {
    if (!searchInput || !allPerfumes) return [];
    return allPerfumes
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchInput.toLowerCase())
      )
      .slice(0, 5);
  }, [allPerfumes, searchInput]);
  const filteredPerfumes = useMemo(() => {
    if (!searchTerm || !allPerfumes) return [];
    return allPerfumes.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allPerfumes, searchTerm]);
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const term = searchInput.trim();
    setIsSearching(term.length > 0);
    setSearchTerm(term);
    setShowSuggestions(false);
  };
  const handleSuggestionClick = (perfume) => {
    setSearchInput(perfume.name);
    setShowSuggestions(false);
    navigate(`/perfume/${perfume.id}`);
  };
  const handleFocus = () => {
    if (searchInput.length > 0) setShowSuggestions(true);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchContainerRef]);
  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = (260 + 30) * 2 * (direction === 'next' ? 1 : -1);
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  const renderPerfumeCards = (perfumeList) => {
    if (loading)
      return <p className={styles.loadingText}>Завантаження ароматів...</p>;
    if (error)
      return (
        <p className={styles.errorText}>
          Помилка завантаження: {error.message}
        </p>
      );
    const listToRender = perfumeList || [];
    if (listToRender.length === 0) {
      if (isSearching)
        return <p className={styles.loadingText}>Ароматів не знайдено.</p>;
      return null;
    }
    return listToRender.map((perfume) => (
      <PerfumeCard key={perfume.id} {...perfume} />
    ));
  };

  return (
    <div className={styles.homePage}>
      <Header />
      <main className={styles.mainContent}>
        <section
          className={styles.heroSection}
          style={{ backgroundImage: `url(${slides[currentSlide].src})` }}
        >
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              ЗНАЙДИ САМЕ ТЕ, ЩО ТОБІ ПОТРІBНО
            </h1>
            <div className={styles.searchContainer} ref={searchContainerRef}>
              <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Пошук..."
                  className={styles.searchInput}
                  value={searchInput}
                  onChange={handleSearchChange}
                  onFocus={handleFocus}
                  autoComplete="off"
                />
                <button type="submit" className={styles.searchButton}>
                  <img
                    src="/assets/lupa.png"
                    alt="Search"
                    className={styles.searchIconImage}
                  />
                </button>
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <div className={styles.suggestionsList}>
                  {suggestions.map((perfume) => (
                    <div
                      key={perfume.id}
                      className={styles.suggestionItem}
                      onClick={() => handleSuggestionClick(perfume)}
                    >
                      <img
                        src={perfume.imageUrl || '/assets/placeholder.png'}
                        alt={perfume.name}
                        className={styles.suggestionImage}
                      />
                      <div className={styles.suggestionInfo}>
                        <span className={styles.suggestionName}>
                          {perfume.name}
                        </span>
                        <span className={styles.suggestionBrand}>
                          {perfume.brand}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.paginationDots}>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`${styles.dot} ${currentSlide === index ? styles.dotActive : ''}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </section>

        {isSearching ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Результати пошуку: "{searchTerm}"
            </h2>
            <div className={styles.perfumeGrid}>
              {renderPerfumeCards(filteredPerfumes)}
            </div>
          </section>
        ) : (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>НОВИНКИ</h2>
              <div className={styles.carouselContainer}>
                <button
                  className={`${styles.arrowButton} ${styles.arrowLeft}`}
                  onClick={() => handleScroll('prev', novinkiGridRef)}
                >
                  <img src="/assets/arrow-left.png" alt="Previous" />
                </button>
                <div className={styles.perfumeGridWrapper} ref={novinkiGridRef}>
                  <div className={styles.perfumeGrid}>
                    {renderPerfumeCards(allPerfumes)}
                  </div>
                </div>
                <button
                  className={`${styles.arrowButton} ${styles.arrowRight}`}
                  onClick={() => handleScroll('next', novinkiGridRef)}
                >
                  <img src="/assets/arrow-right.png" alt="Next" />
                </button>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>ЗАРАЗ ПОПУЛЯРНО</h2>
              <div className={styles.popularGrid}>
                {popularImages.map((image) => (
                  <Link
                    key={image.id}
                    to={`/perfume/${image.perfumeId}`}
                    className={`${styles.popularItem} ${image.className} ${styles.popularLink}`}
                  >
                    <img
                      src={image.src}
                      alt={`Popular ${image.id}`}
                      className={styles.popularImage}
                    />
                  </Link>
                ))}
              </div>
            </section>

            {favorites.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>УПОДОБАННЯ</h2>
                <div className={styles.carouselContainer}>
                  <button
                    className={`${styles.arrowButton} ${styles.arrowLeft}`}
                    onClick={() => handleScroll('prev', upodobannyaGridRef)}
                  >
                    <img src="/assets/arrow-left.png" alt="Previous" />
                  </button>
                  <div
                    className={styles.perfumeGridWrapper}
                    ref={upodobannyaGridRef}
                  >
                    <div className={styles.perfumeGrid}>
                      {renderPerfumeCards(favorites)}
                    </div>
                  </div>
                  <button
                    className={`${styles.arrowButton} ${styles.arrowRight}`}
                    onClick={() => handleScroll('next', upodobannyaGridRef)}
                  >
                    <img src="/assets/arrow-right.png" alt="Next" />
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
