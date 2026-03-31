import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSlider         from './sections/HeroSlider';
import TrustBar           from './sections/TrustBar';
import FeaturedCategories from './sections/FeaturedCategories';
import NewArrivalsSlider  from './sections/NewArrivalsSlider';
import SneakersSection      from './sections/SneakersSection';
import ApparelSection from './sections/ApparelSection';
import AccessoriesSection       from './sections/AccessoriesSection';
import SandalSection         from './sections/SandalSection';
import { useNewArrivals } from '../../features/products/hooks/useProducts';
import { useHomeData } from './useHomeData';
import './HomePage.scss';

const HomePage = () => {
  const { data } = useHomeData();
  const location = useLocation();
  
  // 🔹 Check if URL has ?section=featured
  const showOnlyFeatured = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('section') === 'featured';
  }, [location.search]);

  // 🔹 Render ONLY FeaturedCategories when section=featured
  if (showOnlyFeatured) {
    return (
      <main className="home-page home-page--featured-only">
        <FeaturedCategories />
      </main>
    );
  }

  // 🔹 Normal homepage render (all sections)
  return (
    <main className="home-page">

      {/* 1. Hero Slider */}
      <HeroSlider banners={data?.banners || []} />

      {/* 2. New Arrivals */}
      <NewArrivalsSlider
        title="NEW ARRIVALS"
        viewAllLink="/category/new-arrivals"
        useHook={useNewArrivals}
      />

      {/* 3. Featured Categories */}
      <FeaturedCategories />

      {/* 4. SNEAKERS — grid */}
      <SneakersSection />

      {/* 5. SANDAL — grid */}
      <SandalSection />

      {/* 6. APPAREL — grid */}
      <ApparelSection />
  
      {/* 7. ACCESSORIES — grid */}
      <AccessoriesSection />

      {/* 8. Trust / USP bar (optional) */}
      <TrustBar />
    </main>
  );
};

export default HomePage;