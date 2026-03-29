import React from 'react';
import HeroSlider         from './sections/HeroSlider';
import TrustBar           from './sections/TrustBar';
import FeaturedCategories from './sections/FeaturedCategories';
import NewArrivalsSlider  from './sections/NewArrivalsSlider';
import {
  useNewArrivals,
} from '../../features/products/hooks/useProducts';
 
const HomePage = () => (
  <main>
    {/* 1. Hero Slider */}
    <HeroSlider />

 {/* 3. New Arrivals */}
    <NewArrivalsSlider
      title="NEW ARRIVALS"
      viewAllLink="/category/new-arrivals"
      useHook={useNewArrivals}
    />

    {/* Featured Categories */}
    <FeaturedCategories />

    {/* Trust / USP bar */}
    <TrustBar />
  </main>
);

export default HomePage;
