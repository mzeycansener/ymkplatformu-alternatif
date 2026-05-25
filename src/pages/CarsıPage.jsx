import React from 'react';
import StoreGrid from '../components/StoreGrid';
import styles from './PageSections.module.css';

export default function CarsıPage({ stores, onStoreClick }) {
  if (!stores || stores.length === 0) return null;
  
  return (
    <section className={`${styles.sectionBlock} ${styles.carsiBlock}`}>
      <div className={`container`}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={`${styles.title} ${styles.carsiTitle}`}>Çarşı</h2>
            <p className={styles.subtitle}>Market, petshop ve eczane ihtiyaçlarınız</p>
          </div>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.activeFilter}`}>En Hızlı</button>
            <span className={styles.filterDot}>·</span>
            <button className={styles.filterBtn}>En İyi Puan</button>
            <span className={styles.filterDot}>·</span>
            <button className={styles.filterBtn}>Kampanyalı</button>
          </div>
        </div>
        
        <StoreGrid stores={stores} onStoreClick={onStoreClick} />
      </div>
    </section>
  );
}
