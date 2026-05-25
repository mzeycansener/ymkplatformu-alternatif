import React from 'react';
import styles from './MenuItem.module.css';

export default function MenuItem({ item, storeName, cartItem, onAddToCart, onUpdateQuantity }) {
  
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className={styles.menuItem}>
      <img src={item.image} alt={item.name} className={styles.itemImage} />
      
      <div className={styles.itemInfo}>
        <h4 className={styles.itemName}>{item.name}</h4>
        <p className={styles.itemDesc}>{item.description}</p>
        <div className={styles.itemPrice}>{item.price}₺</div>
      </div>
      
      <div className={styles.actionZone}>
        {quantity > 0 ? (
          <div className={styles.qtyControl}>
            <button className={styles.qtyBtn} onClick={() => onUpdateQuantity(item, storeName, quantity - 1)}>−</button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button className={styles.qtyBtn} onClick={() => onUpdateQuantity(item, storeName, quantity + 1)}>+</button>
          </div>
        ) : (
          <button className={styles.addBtn} onClick={() => onAddToCart(item, storeName)}>+ Ekle</button>
        )}
      </div>
    </div>
  );
}
