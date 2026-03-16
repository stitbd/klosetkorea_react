import React from 'react';
import HeroSlider           from './sections/HeroSlider';
import NewArrivals          from './sections/NewArrivals';
import FeaturedCategories   from './sections/FeaturedCategories';
import WalletSection      from './sections/WalletSection';
import LuxuryShirtSection from './sections/LuxuryShirtSection';
import BeltsSection       from './sections/BeltsSection';
import CapSection         from './sections/CapSection';
import TrustBar             from './sections/TrustBar';
// import PanjabiCollection  from './sections/PanjabiCollection';
// import LatestProducts     from './sections/LatestProducts';
// import LongWalletSection  from './sections/LongWalletSection';

const HomePage = () => (
  <main>
    {/* 1. Hero Slider */}
    <HeroSlider />

    {/* 2. New Arrivals */}
    <NewArrivals />

    {/* Featured Categories */}
    <FeaturedCategories />

    {/* 5. Sneakers */}
    <WalletSection />

    {/* 9. Sandal */}
    <CapSection />

    {/* 7. Apparel */}
    <LuxuryShirtSection />

    {/* 8. Accessories */}
    <BeltsSection />

    {/* 3. Eid al-Fitr 26 Panjabi Collection */}
    {/* <PanjabiCollection /> */}

    {/* 9. Cap */}
    {/* <CapSection /> */}

    {/* 4. Latest Products */}
    {/* <LatestProducts /> */}

    {/* Trust / USP bar */}
    <TrustBar />
  </main>
);

export default HomePage;
