import React from 'react';
import HeroSlider         from './sections/HeroSlider';
import TrustBar           from './sections/TrustBar';
import FeaturedCategories from './sections/FeaturedCategories';
import NewArrivalsSlider  from './sections/NewArrivalsSlider';
import {
  useNewArrivals,
} from '../../features/products/hooks/useProducts';
 import { useHomeData } from './useHomeData';
const HomePage = () => {
   const { data } = useHomeData();
    return (
    <main>
    {/* 1. Hero Slider */}
    <HeroSlider   banners={data?.banners || []} />

 {/* 3. New Arrivals */}
    <NewArrivalsSlider
      title="NEW ARRIVALS"
      viewAllLink="/category/new-arrivals"
      useHook={useNewArrivals}
    />

    {/* Featured Categories */}
    <FeaturedCategories />

    {/* Trust / USP bar */}
    {/* <TrustBar /> */}
  </main>
  );
 
};

export default HomePage;
