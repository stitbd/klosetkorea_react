import React from "react";
import Header           from "../../components/layout/Header/Header";
import Footer           from "../../components/layout/Footer/Footer";
import Container        from "../../components/layout/Container/Container";
import CartDrawer       from "../../features/cart/components/CartDrawer";
import useProducts      from "../../features/products/hooks/useProducts";

// ── Sections ──────────────────────────────────────────────────────────────────
import HeroSlider           from "./sections/HeroSlider";
import TrustBadges          from "./sections/TrustBadges";
import FeaturedCategories   from "./sections/FeaturedCategories";
import NewArrivals          from "./sections/NewArrivals";
import PanjabiCollection    from "./sections/PanjabiCollection";
import LatestProducts       from "./sections/LatestProducts";
import WalletSection        from "./sections/WalletSection";
import LongWalletSection    from "./sections/LongWalletSection";
import LuxuryShirtSection   from "./sections/LuxuryShirtSection";
import BeltSection          from "./sections/BeltSection";
import CapSection           from "./sections/CapSection";

// ─── Section-slug → Component map ────────────────────────────────────────────
// Makes it trivial to add/remove/reorder sections without touching JSX.
const SECTION_MAP = {
  "featured-categories":  FeaturedCategories,
  "new-arrivals":  NewArrivals,
  "panjabi":       PanjabiCollection,
  "latest":        LatestProducts,
  "wallets":       WalletSection,
  "long-wallets":  LongWalletSection,
  "luxury-shirt":  LuxuryShirtSection,
  "belts":         BeltSection,
  "cap":           CapSection,
};

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => {
  const { heroSlides, featuredCategories, trustBadges, productSections, loading, error, retry } =
    useProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartDrawer />

      <main id="main-content" className="flex-1">
        {/* Hero Slider — full-width, outside Container */}
        <HeroSlider slides={heroSlides} loading={loading} />

        {/* Trust Badges strip */}
        <TrustBadges badges={trustBadges} />

        {/* Featured Categories — full-width inside Container */}
        <Container>
          <FeaturedCategories loading={featuredCategories} />
        </Container>

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Failed to load products.</p>
            <button onClick={retry} className="btn-primary px-6 py-2">
              Try Again
            </button>
          </div>
        )}

        {/* Product sections inside Container */}
        <Container>
          {loading
            ? // Render skeleton for every expected section
              Object.keys(SECTION_MAP).map((slug) => {
                const Component = SECTION_MAP[slug];
                return <Component key={slug} loading products={[]} />;
              })
            : productSections.map((section) => {
                const Component = SECTION_MAP[section.slug];
                if (!Component) return null; // unknown slug — safe skip
                return (
                  <Component
                    key={section.id}
                    products={section.products}
                    loading={false}
                  />
                );
              })}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;