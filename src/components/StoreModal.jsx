import React, { useState } from 'react';
import styles from './StoreModal.module.css';
import { menuItems as mockMenuItems } from '../data/menuItems';
import MenuItem from './MenuItem';

export default function StoreModal({ store, onClose, cartItems, onAddToCart, onUpdateQuantity }) {
  const [activeTab, setActiveTab] = useState('Popüler');
  
  if (!store) return null;

  const tabs = ["Popüler", "Ana Yemek", "İçecekler", "Tatlılar"];
  const currentItems = mockMenuItems[activeTab] || [];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.header}>
          <img src={store.image} alt={store.name} className={styles.headerImg} />
          <div className={styles.gradientOverlay}></div>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className={styles.headerContent}>
            <h2 className={styles.storeName}>{store.name}</h2>
            <div className={styles.categoryPill}>{store.category}</div>
          </div>
        </div>

        {/* Info Bar */}
        <div className={styles.infoBar}>
          <div className={styles.infoLeft}>
            <span>★ {store.rating}</span>
            <span className={styles.dot}>·</span>
            <span>{store.time} dk</span>
            <span className={styles.dot}>·</span>
            <span>Min {store.minOrder}₺</span>
            <span className={styles.dot}>·</span>
            <span style={{ color: store.open ? 'var(--color-ink)' : 'var(--color-accent)' }}>
              {store.open ? 'Açık' : 'Kapalı'}
            </span>
          </div>
          {store.campaign && (
            <div className={styles.campaignPill}>
              5 SİPARİŞ 1 BEDAVA
            </div>
          )}
        </div>

        {/* Campaign Progress */}
        {store.campaign && (
          <div className={styles.campaignProgressBox}>
            <span className={styles.progressLabel}>Bedava ürün için ilerleme:</span>
            <div className={styles.progressRow}>
              <div className={styles.squares}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`${styles.square} ${i < store.progress ? styles.squareFilled : ''}`}></div>
                ))}
              </div>
              <span className={styles.progressText}>{store.progress}/5 tamamlandı</span>
            </div>
          </div>
        )}

        {/* Menu Tabs */}
        <div className={styles.menuTabs}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu List */}
        <div className={styles.menuList}>
          {currentItems.map(item => {
            const cartItem = cartItems.find(c => c.item.id === item.id && c.storeName === store.name);
            return (
              <MenuItem 
                key={item.id} 
                item={item} 
                storeName={store.name}
                cartItem={cartItem}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}
