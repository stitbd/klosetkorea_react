import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeroSlider from "../sections/HeroSlider";
import TrustBadges from "../sections/TrustBadges";
import ProductSection from "../sections/ProductSection";
import { useHomeSections, useAddToCart } from "../viewmodels/useHomeSections";

// Column configuration per section (mobile / sm / lg)
const SECTION_COLS = {
  "new-arrivals": { mobile: 2, sm: 2, md: 4, lg: 4 },
  panjabi: { mobile: 2, sm: 2, md: 4, lg: 4 },
  latest: { mobile: 2, sm: 3, md: 4, lg: 5 },
  wallets: { mobile: 2, sm: 2, md: 4, lg: 4 },
  "long-wallets": { mobile: 1, sm: 2, md: 3, lg: 3 },
  "luxury-shirt": { mobile: 2, sm: 2, md: 4, lg: 4 },
  belts: { mobile: 2, sm: 2, md: 4, lg: 4 },
  cap: { mobile: 2, sm: 2, md: 4, lg: 4 },
};

// ─── HomePage ─────────────────────────────────────────────────────────────────

const HomePage = () => {
  const { heroSlides, trustBadges, productSections, loading } = useHomeSections();
  const { addToCart, adding } = useAddToCart();
  const navigate = useNavigate();

  const handleBuyNow = useCallback(
    async (product) => {
      await addToCart(product);
      navigate("/checkout");
    },
    [addToCart, navigate]
  );

  return (
    <MainLayout>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} loading={loading} />

      {/* Trust Badges */}
      <TrustBadges badges={trustBadges} />

      {/* Product Sections */}
      <div className="container">
        {loading
          ? // Render skeleton placeholders for all expected sections
          Array.from({ length: 8 }).map((_, i) => (
            <ProductSection
              key={i}
              loading={true}
              title=""
              slug=""
              products={[]}
            />
          ))
          : productSections.map((section) => (
            <ProductSection
              key={section.id}
              title={section.title}
              slug={section.slug}
              products={section.products}
              loading={false}
              cols={SECTION_COLS[section.slug] ?? { mobile: 2, sm: 3, md: 4, lg: 4 }}
              onAddToCart={addToCart}
              onBuyNow={handleBuyNow}
              adding={adding}
            />
          ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
