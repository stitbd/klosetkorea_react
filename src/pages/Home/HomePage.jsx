// src/pages/Home/HomePage.jsx
import React from 'react';
import HeroSlider         from './sections/HeroSlider';
import TrustBar           from './sections/TrustBar';
import FeaturedCategories from './sections/FeaturedCategories';
import NewArrivalsSlider  from './sections/NewArrivalsSlider';
import CategorySection    from './sections/CategorySection';
import RevealSection      from '../../components/ui/RevealSection/RevealSection';
import { useHomeData }    from './useHomeData';
import './HomePage.scss';

const HomePage = () => {
  const { data, loading } = useHomeData();

  if (loading) {
    return (
      <main className="home-page">
        <div className="text-center py-5">Loading...</div>
      </main>
    );
  }

  return (
    <main className="home-page">
      {/* 1. Hero Slider */}
      <RevealSection y={18} amount={0.12}>
        <HeroSlider banners={data?.banners || []} />
      </RevealSection>

      {/* 2. New Arrivals */}
      <RevealSection delay={0.06}>
        <NewArrivalsSlider
          title="NEW ARRIVALS"
          viewAllLink="/new-arrivals"
          products={data?.new_arrivals || []}
        />
      </RevealSection>

      {/* 3. Featured Categories — always shows all, uses featuredCategories[] */}
      <RevealSection delay={0.05}>
        <FeaturedCategories categories={data?.featuredCategories || []} />
      </RevealSection>

      {/* 4-N. Category sections — controlled by backend via categories[] */}
      {(data?.categories || []).map((cat) => (
        <RevealSection key={cat.id}>
          <CategorySection
            title={cat.name.toUpperCase()}
            catSlug={cat.slug}
            products={cat.homeproducts || []}
          />
        </RevealSection>
      ))}

      {/* Trust Bar */}
      {data?.key_features?.length > 0 && (
        <RevealSection>
          <TrustBar features={data.key_features} />
        </RevealSection>
      )}
    </main>
  );
};

export default HomePage;