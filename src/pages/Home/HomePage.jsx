import React from 'react';
import HeroSlider           from './sections/HeroSlider';
import TrustBar             from './sections/TrustBar';
import FeaturedCategories   from './sections/FeaturedCategories';
import NewArrivals          from './sections/NewArrivals';
import PanjabiCollection  from './sections/PanjabiCollection';
import LatestProducts     from './sections/LatestProducts';
import WalletSection      from './sections/WalletSection';
import LongWalletSection  from './sections/LongWalletSection';
import LuxuryShirtSection from './sections/LuxuryShirtSection';
import BeltsSection       from './sections/BeltsSection';
import CapSection         from './sections/CapSection';

const HomePage = () => (
  <main>
    {/* 1. Hero Slider */}
    <HeroSlider />

    {/* Trust / USP bar */}
    <TrustBar />

    {/* Featured Categories */}
    <FeaturedCategories />

    {/* 2. New Arrivals */}
    <NewArrivals />

    {/* 3. Eid al-Fitr 26 Panjabi Collection */}
    <PanjabiCollection />

    {/* 4. Latest Products */}
    <LatestProducts />

    {/* 5. Wallets */}
    <WalletSection />

    {/* 6. Long Wallets */}
    <LongWalletSection />

    {/* 7. Luxury Shirt */}
    <LuxuryShirtSection />

    {/* 8. Belts */}
    <BeltsSection />

    {/* 9. Cap */}
    <CapSection />
  </main>
);

export default HomePage;
