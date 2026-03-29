import React from "react";
import ProductCard from "./ProductCard";
import { cn } from "../../utils/format";

// ─── ProductGrid ──────────────────────────────────────────────────────────────
// Renders products in a responsive grid.
// cols: { mobile, sm, md, lg } — Tailwind column counts

const colMap = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const ProductGrid = ({
  products = [],
  cols = { mobile: 2, sm: 3, md: 4, lg: 4 },
  onAddToCart,
  onBuyNow,
  adding,
  className = "",
}) => {
  const gridClass = cn(
    "grid gap-3 sm:gap-4",
    colMap[cols.mobile] ?? "grid-cols-2",
    cols.sm ? `sm:${colMap[cols.sm]}` : "",
    cols.md ? `md:${colMap[cols.md]}` : "",
    cols.lg ? `lg:${colMap[cols.lg]}` : "",
    className
  );

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          isAdding={adding === product.id}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
