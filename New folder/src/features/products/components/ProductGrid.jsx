import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import useCart from "../../cart/hooks/useCart";

/**
 * ProductGrid
 *
 * @param {{
 *   products: Array,
 *   cols?: { mobile?: number, sm?: number, md?: number, lg?: number }
 * }} props
 */
const colClass = {
  1: "grid-cols-1",  2: "grid-cols-2",  3: "grid-cols-3",
  4: "grid-cols-4",  5: "grid-cols-5",  6: "grid-cols-6",
};

const ProductGrid = ({
  products = [],
  cols = { mobile: 2, sm: 3, md: 4, lg: 4 },
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("/checkout");
  };

  const gridCls = [
    "grid gap-3 sm:gap-4",
    colClass[cols.mobile] ?? "grid-cols-2",
    cols.sm  ? `sm:${colClass[cols.sm]}`  : "",
    cols.md  ? `md:${colClass[cols.md]}`  : "",
    cols.lg  ? `lg:${colClass[cols.lg]}`  : "",
  ].filter(Boolean).join(" ");

  if (!products.length) {
    return (
      <p className="text-sm text-gray-400 py-6 text-center">
        No products found in this section.
      </p>
    );
  }

  return (
    <div className={gridCls}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyNow={() => handleBuyNow(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
