import React from "react";
import SectionHeader from "../components/common/SectionHeader";
import ProductGrid from "../components/product/ProductGrid";
import { SectionSkeleton } from "../components/common/Skeleton";

// ─── ProductSection ───────────────────────────────────────────────────────────
// Generic section: header + product grid. Used for every product row on the page.

const ProductSection = ({
  title,
  slug,
  products = [],
  loading = false,
  cols = { mobile: 2, sm: 3, md: 4, lg: 4 },
  onAddToCart,
  onBuyNow,
  adding,
}) => {
  if (loading) return <SectionSkeleton count={cols.lg ?? 4} cols={cols.lg ?? 4} />;

  return (
    <section className="py-5 lg:py-8" aria-labelledby={`section-${slug}`}>
      <SectionHeader
        title={title}
        seeAllLink={`/collections/${slug}`}
      />
      <ProductGrid
        products={products}
        cols={cols}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        adding={adding}
      />
    </section>
  );
};

export default ProductSection;
