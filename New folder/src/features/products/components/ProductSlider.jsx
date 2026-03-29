import React, { useRef } from "react";
import ProductCard from "./ProductCard";

const ChevronLeft  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>;
const ChevronRight = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>;

/**
 * ProductSlider — horizontal scroll with prev/next arrow controls.
 * Useful for "You may also like" rows or mobile-friendly sections.
 */
const ProductSlider = ({ products = [], cardWidth = 200 }) => {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const amount = cardWidth * 2;
    trackRef.current?.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {/* Prev */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-white shadow-md
                   border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory
                   scrollbar-hide [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start flex-shrink-0" style={{ width: cardWidth }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-white shadow-md
                   border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        aria-label="Next"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ProductSlider;
