import React from 'react';
import styles from './CategoryBar.module.css';

const mainCategories = ["Tümü", "Restoran", "Çarşı"];
const restaurantSub = ["Pizza", "Burger", "Türk Mutfağı", "Kafe", "Sağlıklı", "Döner", "Pastane"];
const carsiSub = ["Petshop", "Market", "Eczane"];

export default function CategoryBar({ 
  activeMain, onSelectMain, 
  activeSub, onSelectSub 
}) {
  let subCategories = [];
  if (activeMain === 'Tümü') subCategories = [...restaurantSub, ...carsiSub];
  if (activeMain === 'Restoran') subCategories = restaurantSub;
  if (activeMain === 'Çarşı') subCategories = carsiSub;

  return (
    <div className={styles.barWrapper}>
      {/* Top Tier: Main Categories */}
      <div className={`container ${styles.mainBarInner}`}>
        {mainCategories.map((cat) => (
          <button
            key={cat}
            className={`${styles.mainTabBtn} ${activeMain === cat ? styles.activeMainTab : ''}`}
            onClick={() => onSelectMain(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bottom Tier: Sub Categories */}
      <div className={styles.subBarWrapper}>
        <div className={`container ${styles.subBarInner}`}>
          <button
            className={`${styles.subTabBtn} ${activeSub === 'Hepsi' ? styles.activeSubTab : ''}`}
            onClick={() => onSelectSub('Hepsi')}
          >
            Tüm Kategoriler
          </button>
          <div className={styles.subDivider}></div>
          {subCategories.map((cat) => (
            <button
              key={cat}
              className={`${styles.subTabBtn} ${activeSub === cat ? styles.activeSubTab : ''}`}
              onClick={() => onSelectSub(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
