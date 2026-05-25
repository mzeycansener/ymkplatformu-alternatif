import React, { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ cartCount, onOpenCart }) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.navInner}`}>
        
        {/* Left Zone */}
        <div className={styles.leftZone}>
          <div className={styles.logoGroup}>
            <span className={styles.logoText}>KAPI</span>
            <span className={styles.registeredMark}>®</span>
          </div>
          <div className={styles.divider}></div>
          
          <div className={styles.locationWrapper}>
            <button 
              className={styles.locationPill}
              onClick={() => setShowLocationModal(!showLocationModal)}
            >
              İzmir, Bostanlı ▾
            </button>
            {showLocationModal && (
              <div className={styles.locationModal}>
                <input 
                  type="text" 
                  placeholder="Teslimat adresiniz" 
                  className={styles.locationInput} 
                  autoFocus
                />
                <div className={styles.recentAddresses}>
                  <div className={styles.addressItem}>Ev - Bostanlı Mah. Şehit Cengiz Topel Cad.</div>
                  <div className={styles.addressItem}>İş - Mavişehir Mah. Caher Dudayev Bulv.</div>
                  <div className={styles.addressItem}>Ayşe - Yalı Mah. 6323. Sokak</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Zone */}
        <div className={styles.centerZone}>
          <div className={`${styles.searchWrapper} ${isSearchFocused ? styles.searchFocused : ''}`}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Restoran veya ürün ara" 
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {isSearchFocused && searchValue && (
              <div className={styles.searchResults}>
                <div className={styles.searchResultItem}>
                  <span>BurgerLab</span>
                  <span className={styles.searchCategory}>Amerikan</span>
                </div>
                <div className={styles.searchResultItem}>
                  <span>Truffle Burger</span>
                  <span className={styles.searchCategory}>Ürün</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Zone */}
        <div className={styles.rightZone}>
          <button className={styles.loginBtn}>Giriş Yap</button>
          <button className={styles.signupBtn}>Üye Ol</button>
          <button className={styles.cartBtn} onClick={onOpenCart}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
