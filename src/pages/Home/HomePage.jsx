// src/pages/Home/HomePage.jsx
import React from 'react';
import HeroSlider         from './sections/HeroSlider';
import AboutSection from './sections/AboutSection';
import NewArrivalsSlider  from './sections/NewArrivalsSlider';
import FeaturedCategories from './sections/FeaturedCategories';
import CategorySection    from './sections/CategorySection';
import GallerySection       from './sections/GallerySection';
import TestimonialsSection  from './sections/TestimonialsSection';
import TrustBar           from './sections/TrustBar';
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

      {/* 2. About Section */}
      <RevealSection delay={0.04}>
        <AboutSection 
          heading="Crafting Luxury Since 2010"
          description="We believe true luxury lies in the details. Every piece we create is a testament to timeless craftsmanship, ethical sourcing, and an unwavering commitment to quality."
          stats={[
            { value: "15+", label: "Years of Excellence" },
            { value: "50K+", label: "Happy Clients" },
            { value: "100%", label: "Handcrafted" },
          ]}
          ctaText="Discover Our Journey"
          ctaLink="/about"
        />
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

      {/* ✨ NEW: Gallery Section */}
      <RevealSection delay={0.04}>
        <GallerySection 
          images={data?.gallery || []} 
          title="OUR GALLERY"
          subtitle="Behind the Craft"
        />
      </RevealSection>

      {/* ✨ NEW: Testimonials Section (RTL Slide) */}
      <RevealSection delay={0.03}>
        <TestimonialsSection 
          testimonials={data?.testimonials || []}
          title="CLIENT WORDS"
          subtitle="Testimonials"
        />
      </RevealSection>

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