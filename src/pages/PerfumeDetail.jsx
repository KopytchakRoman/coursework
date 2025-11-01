import React from 'react';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from './PerfumeDetail.module.css';

import sauvageBackground from '../assets/sauvage-bg.png';
import diorSauvageImage from '../assets/dior-sauvage.png';
import filledHeartIcon from '../assets/Heart.png';

const mockPerfume = {
  id: 2,
  name: 'Dior Sauvage Eau De Parfum',
  imageUrl: diorSauvageImage,
  backgroundUrl: sauvageBackground,
  notes: [
    { name: 'Свіжо-пряний', value: 90, color: '#90C6A6' },
    { name: 'Цитрус', value: 75, color: '#E8E46B' },
    { name: 'Амбра', value: 70, color: '#742D2D' },
    { name: 'Лаванда', value: 50, color: '#C8A2C8' },
    { name: "Трав'янистий", value: 40, color: '#90C6A6' },
    { name: 'Квітковий', value: 30, color: '#D473A7' },
  ],
  tags: [
    { title: 'ДЛЯ:', value: 'чоловіків' },
    { title: 'ЧАС ДОБИ:', value: 'день' },
    { title: 'ПОРА РОКУ:', value: 'літо, весна' },
    { title: 'НАГОДА:', value: 'повсякденність' },
  ],
  description: `Dior Sauvage - це аромат, в якому вашій обранниці захочеться потонути. Витончений і водночас парфумерний композиції підкорює своєю чуттєвістю та розкішшю. Мужній, елегантний, сексуальний та зухвалий парфум, що ідеально підходить під образ сильного, статного чоловіка. Воістину чарівне творіння французьких парфумерів під модною маркою Dior. Делікатна мелодія вступає у гру нотами пряного бергамоту, огортаючи своїм володарем терпким ароматом. Серце композиції розкривається в ніжності і витонченості анісу, потопаючого в пахучій хмарі китайського перцю і переплетенні з тонкою лавандою. Залишаючи п’янкий шлейф, в бархатистої теплоти мускатного горіха. Завершує всю цю симфонію ароматів благородний, сексуальний амброксан, переплітаючись з солодкістю малини, що надає цій брутальній парфумерній композиції прикус грайливості і легкість буття. Sauvage уособлює темперамент, підкреслює мужність і елегантність свого володаря, підкоряючи жіночі серця. Аромат стане незмінним доповненням образу сильного, рішучого і впевненого в собі чоловіка, який цінує цінність і простоту.`,
};

function PerfumeDetailPage() {
  const pageStyle = {
    backgroundImage: `url(${mockPerfume.backgroundUrl})`,
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
              src={mockPerfume.imageUrl}
              alt={mockPerfume.name}
              className={styles.perfumeImage}
            />
            <div className={styles.heartIcon}>
              <img
                src={filledHeartIcon}
                alt="Favorite"
                className={styles.heartIconImage}
              />
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <h1 className={styles.title}>{mockPerfume.name}</h1>

            <div className={styles.notesSection}>
              {mockPerfume.notes.map((note) => (
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

        <div className={styles.tagsSection}>
          {mockPerfume.tags.map((tag) => (
            <div key={tag.title} className={styles.tagGroup}>
              <span className={styles.tagTitle}>{tag.title}</span>
              <div className={styles.tagCard}>
                <span className={styles.tagValue}>{tag.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.descriptionSection}>
          <div className={styles.descriptionContent}>
            <h2 className={styles.descriptionTitle}>Опис</h2>
            <p className={styles.descriptionText}>{mockPerfume.description}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PerfumeDetailPage;
