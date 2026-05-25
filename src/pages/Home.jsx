import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import CategoryBar from '../components/CategoryBar';
import SpinWheel from '../components/SpinWheel';
import RestaurantsPage from './RestaurantsPage';
import CarsıPage from './CarsıPage';
import { stores as mockStores } from '../data/stores';

export default function Home({ onStoreClick }) {
  const [activeMain, setActiveMain] = useState('Tümü');
  const [activeSub, setActiveSub] = useState('Hepsi');

  const handleSelectMain = (main) => {
    setActiveMain(main);
    setActiveSub('Hepsi'); // reset subcategory on main change
  };

  const filteredStores = useMemo(() => {
    let stores = mockStores;

    if (activeMain === 'Restoran') {
      stores = stores.filter(s => !s.isCarsi);
    } else if (activeMain === 'Çarşı') {
      stores = stores.filter(s => s.isCarsi);
    }

    if (activeSub !== 'Hepsi') {
      stores = stores.filter(s => s.category === activeSub);
    }

    return stores;
  }, [activeMain, activeSub]);

  const restaurantStores = filteredStores.filter(s => !s.isCarsi);
  const carsiStores = filteredStores.filter(s => s.isCarsi);

  return (
    <main>
      <Hero />
      <SpinWheel />
      <CategoryBar 
        activeMain={activeMain} 
        onSelectMain={handleSelectMain} 
        activeSub={activeSub}
        onSelectSub={setActiveSub}
      />
      
      {restaurantStores.length > 0 && (
        <RestaurantsPage stores={restaurantStores} onStoreClick={onStoreClick} />
      )}
      
      {carsiStores.length > 0 && (
        <CarsıPage stores={carsiStores} onStoreClick={onStoreClick} />
      )}

      {filteredStores.length === 0 && (
        <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--color-ink-secondary)' }}>
          Bu kategoride sonuç bulunamadı.
        </div>
      )}
    </main>
  );
}
