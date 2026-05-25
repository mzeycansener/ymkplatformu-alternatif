import React, { useState } from 'react';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'KAPI20') {
      setDiscount(0.2); // 20% discount
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((acc, c) => acc + (c.item.price * c.quantity), 0);
  const deliveryFee = subtotal > 150 ? 0 : 15;
  const discountAmount = subtotal * discount;
  const total = subtotal + deliveryFee - discountAmount;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.drawer}>
        
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Sepetim</h2>
            <div className={styles.itemCount}>{cartItems.length} ürün</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h3 className={styles.emptyTitle}>Sepetiniz boş</h3>
            <p className={styles.emptyDesc}>Yukarıdan bir restoran seçin</p>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {cartItems.map(c => (
                <div key={`${c.storeName}-${c.item.id}`} className={styles.itemRow}>
                  <img src={c.item.image} alt={c.item.name} className={styles.itemImg} />
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{c.item.name}</div>
                    <div className={styles.itemStore}>{c.storeName}</div>
                  </div>
                  <div className={styles.qtyControl}>
                    <button className={styles.qtyBtn} onClick={() => onUpdateQuantity(c.item, c.storeName, c.quantity - 1)}>−</button>
                    <span className={styles.qtyValue}>{c.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => onUpdateQuantity(c.item, c.storeName, c.quantity + 1)}>+</button>
                  </div>
                  <div className={styles.itemPrice}>{c.item.price * c.quantity}₺</div>
                </div>
              ))}
            </div>

            <div className={styles.campaignNudge}>
              2 sipariş daha — 1 ürün bedava!
            </div>

            <div className={styles.bottomSection}>
              <div className={styles.promoInputWrapper}>
                <input 
                  type="text" 
                  placeholder="Promosyon kodu" 
                  className={styles.promoInput}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className={styles.promoBtn} onClick={handleApplyPromo}>Uygula</button>
              </div>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Ara Toplam</span>
                  <span>{subtotal.toFixed(2)}₺</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Teslimat Ücreti</span>
                  {deliveryFee === 0 ? (
                    <span style={{ color: 'var(--color-accent)' }}>Ücretsiz</span>
                  ) : (
                    <span>{deliveryFee.toFixed(2)}₺</span>
                  )}
                </div>
                {discountAmount > 0 && (
                  <div className={styles.totalRow}>
                    <span>İndirim</span>
                    <span style={{ color: 'var(--color-accent)' }}>-{discountAmount.toFixed(2)}₺</span>
                  </div>
                )}
                
                <div className={styles.divider}></div>
                
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Toplam</span>
                  <span>{total.toFixed(2)}₺</span>
                </div>
              </div>

              <button className={styles.checkoutBtn}>Siparişi Onayla →</button>
              <div className={styles.secureText}>256-bit SSL ile güvenli ödeme</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
