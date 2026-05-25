import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartDrawer from './components/CartDrawer';
import StoreModal from './components/StoreModal';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (item, storeName) => {
    setCartItems(prev => {
      const existing = prev.find(c => c.item.id === item.id && c.storeName === storeName);
      if (existing) {
        return prev.map(c => 
          c.item.id === item.id && c.storeName === storeName
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { item, storeName, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (item, storeName, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(c => !(c.item.id === item.id && c.storeName === storeName)));
    } else {
      setCartItems(prev => 
        prev.map(c => 
          c.item.id === item.id && c.storeName === storeName
            ? { ...c, quantity: newQuantity }
            : c
        )
      );
    }
  };

  return (
    <>
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <Home onStoreClick={setSelectedStore} />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {selectedStore && (
        <StoreModal 
          store={selectedStore} 
          onClose={() => setSelectedStore(null)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </>
  );
}

export default App;
