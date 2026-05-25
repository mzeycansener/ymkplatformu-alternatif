import React from 'react';
import styles from './FiveForOneBar.module.css';

export default function FiveForOneBar({ progress = 0 }) {
  // Max progress is 5
  const percentage = (progress / 5) * 100;
  const remaining = 5 - progress;

  return (
    <div className={styles.wrapper}>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className={styles.textRow}>
        <span>{progress}/5 sipariş</span>
        <span>·</span>
        <span>{remaining} kaldı</span>
      </div>
    </div>
  );
}
