import React, { useState } from "react";
import { formatCurrency, calcDiscount, cn } from "../../utils/format";

// ─── ProductCard ─────────────────────────────────────────────────────────────
// Pure presentational component. All logic is passed in via props.

const ProductCard = ({ product, onAddToCart, onBuyNow, isAdding = false }) => {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const { name, sku, price, originalPrice, image, badge, inStock } = product;
  const discount = originalPrice ? calcDiscount(originalPrice, price) : null;

  return (
    <div className="product-card group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-product">
        <img
          src={imgError ? "https://via.placeholder.com/400" : image}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              "absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white",
              badge === "Sale" ? "bg-red-500" : "bg-green-600"
            )}
          >
            {badge}
          </span>
        )}

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-white">
            -{discount}%
          </span>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 border border-gray-300 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col flex-1 gap-1">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
          {name}
        </h3>
        {sku && (
          <p className="text-[10px] text-gray-400">SKU: {sku}</p>
        )}

        {/* Price */}
        <div className="mt-auto pt-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-red-600">
              {formatCurrency(price)}
            </span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={() => onAddToCart?.(product)}
            disabled={!inStock || isAdding}
            className={cn(
              "btn-outline flex-1 text-[10px] py-1.5",
              isAdding && "opacity-60 cursor-not-allowed"
            )}
            aria-label={`Add ${name} to cart`}
          >
            {isAdding ? "Adding…" : "Add to Cart"}
          </button>
          <button
            onClick={() => onBuyNow?.(product)}
            disabled={!inStock}
            className="btn-primary flex-1 text-[10px] py-1.5"
            aria-label={`Buy ${name} now`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
