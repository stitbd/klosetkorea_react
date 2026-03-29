// ─── Feature: Products — Public API ──────────────────────────────────────────
// External code imports from this barrel. Never import directly from internals.

export { default as ProductCard }   from "./components/ProductCard";
export { default as ProductGrid }   from "./components/ProductGrid";
export { default as ProductSlider } from "./components/ProductSlider";
export { default as useProducts }   from "./hooks/useProducts";
export { productApi }               from "./services/productApi";
export {
  fetchHomeSections,
  selectHeroSlides,
  selectTrustBadges,
  selectProductSections,
  selectProductsStatus,
  selectProductsError,
} from "./productSlice";
