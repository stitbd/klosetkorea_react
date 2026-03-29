import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, calcDiscount } from "../../../utils/formatPrice";
import { cn } from "../../../utils/slugify";
import useCart from "../../cart/hooks/useCart";

// ─── Sub-components ───────────────────────────────────────────────────────────
const Badge = ({ label }) => {
  const color =
    label === "Sale"    ? "bg-red-500" :
    label === "New"     ? "bg-green-600" :
    label === "Hot"     ? "bg-orange-500" : "bg-gray-600";
  return (
    <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white z-10 ${color}`}>
      {label}
    </span>
  );
};

const DiscountBadge = ({ pct }) => (
  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-white z-10">
    -{pct}%
  </span>
);

// ─── ProductCard ─────────────────────────────────────────────────────────────
/**
 * @param {{ product: import('../../../utils/mockData').Product, onBuyNow?: Function }} props
 */
const ProductCard = ({ product, onBuyNow }) => {
  const [imgError, setImgError] = useState(false);
  const [adding,   setAdding]   = useState(false);
  const { addToCart, openCart }  = useCart();

  if (!product) return null;

  const { id, name, sku, price, originalPrice, image, badge, inStock } = product;
  const discount = originalPrice ? calcDiscount(originalPrice, price) : null;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!inStock || adding) return;
    setAdding(true);
    addToCart(product);
    openCart();
    // simulate network delay for real API mode
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);
    onBuyNow?.();
  };

  return (
    <article className="product-card group flex flex-col h-full">
      {/* ── Image ── */}
      <Link to={`/products/${id}`} className="relative block overflow-hidden bg-gray-50 aspect-square">
        <img
          src={imgError ? "https://placehold.co/400x400/f3f4f6/9ca3af?text=Fimon" : image}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {badge    && <Badge label={badge} />}
        {discount && <DiscountBadge pct={discount} />}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 border border-gray-300 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* ── Info ── */}
      <div className="p-2.5 flex flex-col flex-1 gap-1">
        <Link to={`/products/${id}`} className="group/title">
          <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight group-hover/title:text-red-600 transition-colors">
            {name}
          </h3>
        </Link>
        {sku && <p className="text-[10px] text-gray-400">SKU: {sku}</p>}

        {/* Price row */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-sm font-bold text-red-600">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={!inStock || adding}
            className={cn(
              "btn-outline flex-1 py-1.5 text-[11px]",
              adding && "opacity-60 cursor-not-allowed"
            )}
            aria-label={`Add ${name} to cart`}
          >
            {adding ? "Adding…" : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!inStock}
            className="btn-primary flex-1 py-1.5 text-[11px]"
            aria-label={`Buy ${name} now`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
