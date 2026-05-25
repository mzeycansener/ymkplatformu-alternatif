import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.overline}>İSTANBUL'UN TESLİMAT PLATFORMU</div>
          <h1 className={styles.heading}>Her şey kapıda.</h1>
          <p className={styles.subtext}>
            Restoranlar, market, evcil hayvan ürünleri ve daha fazlası. Ortalama 28 dakikada teslimat.
          </p>
          
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10+</div>
              <div className={styles.statLabel}>İşletme</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>28 dk</div>
              <div className={styles.statLabel}>Ort. Teslimat</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>4.8★</div>
              <div className={styles.statLabel}>Ortalama Puan</div>
            </div>
          </div>
          
          <button className={styles.ctaBtn}>Sipariş Ver</button>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <div className={styles.imageGrid}>
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600&h=800" 
              alt="Restaurant interior" 
              className={styles.imgTall}
            />
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Gourmet burger close up" 
              className={styles.imgSquare1}
            />
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Pet store" 
              className={styles.imgSquare2}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
