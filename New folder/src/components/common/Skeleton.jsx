import React from "react";

// ─── ProductCardSkeleton ──────────────────────────────────────────────────────
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-md overflow-hidden border border-gray-100">
    <div className="aspect-product skeleton" />
    <div className="p-2.5 space-y-2">
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-2/3 rounded" />
      <div className="skeleton h-4 w-1/3 rounded mt-2" />
      <div className="flex gap-1.5 mt-2">
        <div className="skeleton h-7 flex-1 rounded" />
        <div className="skeleton h-7 flex-1 rounded" />
      </div>
    </div>
  </div>
);

// ─── ProductGridSkeleton ──────────────────────────────────────────────────────
export const ProductGridSkeleton = ({ count = 4, cols = 4 }) => (
  <div className={`grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-${cols}`}>
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// ─── HeroSkeleton ─────────────────────────────────────────────────────────────
export const HeroSkeleton = () => (
  <div className="skeleton w-full h-[300px] sm:h-[400px] lg:h-[520px] rounded-none" />
);

// ─── SectionSkeleton ─────────────────────────────────────────────────────────
export const SectionSkeleton = ({ count = 4, cols = 4 }) => (
  <div className="py-6 lg:py-8">
    <div className="flex items-center justify-between mb-4">
      <div className="skeleton h-6 w-40 rounded" />
      <div className="skeleton h-7 w-16 rounded" />
    </div>
    <ProductGridSkeleton count={count} cols={cols} />
  </div>
);
