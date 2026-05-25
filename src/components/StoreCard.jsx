import React from 'react';
import styles from './StoreCard.module.css';
import FiveForOneBar from './FiveForOneBar';

export default function StoreCard({ store, onClick }) {
  if (store.featured) {
    return (
      <div className={styles.featuredCard} onClick={() => onClick(store)}>
        <img src={store.image} alt={store.name} className={styles.featuredImg} />
        <div className={styles.featuredPanel}>
          <div className={styles.featuredOverline}>Editörün Seçimi</div>
          <h2 className={styles.featuredTitle}>{store.name}</h2>
          <p className={styles.featuredDesc}>
            Özel yapım soslar ve günlük taze malzemelerle hazırlanan eşsiz lezzetler.
          </p>
          <div className={styles.featuredMeta}>
            ★ {store.rating} <span className={styles.metaDot}>·</span> {store.time} dk <span className={styles.metaDot}>·</span> Min {store.minOrder}₺
          </div>
          <button className={styles.featuredBtn}>Menüyü İncele</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.standardCard} onClick={() => onClick(store)}>
      <div className={styles.imgWrapper}>
        <img src={store.image} alt={store.name} className={styles.cardImg} />
        
        {/* Overlays */}
        {!store.open && (
          <div className={styles.overlayClosed}>
            <span>Şu an kapalı</span>
          </div>
        )}
        {store.open && (
          <div className={styles.timePill}>
            {store.time} dk
          </div>
        )}
        {store.campaign && store.open && (
          <div className={styles.campaignPill}>
            5 al 1 bedava
          </div>
        )}
      </div>

      <div className={styles.contentArea}>
        <div className={styles.row1}>
          <h3 className={styles.storeName}>{store.name}</h3>
          <div className={styles.categoryPill} style={{
            color: store.isCarsi ? 'var(--color-carsi)' : 'var(--color-ink-secondary)'
          }}>
            {store.category}
          </div>
        </div>
        
        <div className={styles.row2}>
          <span className={styles.rating}>★ {store.rating}</span>
          <span className={styles.metaText}> · {store.time} dk · Min {store.minOrder}₺</span>
        </div>

        {store.campaign && (
          <FiveForOneBar progress={store.progress} />
        )}
      </div>
    </div>
  );
}
