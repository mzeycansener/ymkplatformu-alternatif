import React from 'react';
import styles from './StoreGrid.module.css';
import StoreCard from './StoreCard';

export default function StoreGrid({ stores, onStoreClick }) {
  return (
    <div className={styles.grid}>
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} onClick={onStoreClick} />
      ))}
    </div>
  );
}
