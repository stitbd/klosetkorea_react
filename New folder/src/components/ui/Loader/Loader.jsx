import React from "react";
import { cn } from "../../../utils/slugify";

/**
 * Loader — spinner component.
 * @param {boolean} fullScreen — center in the full viewport
 * @param {'sm'|'md'|'lg'} size
 */
const sizeMap = { sm: "w-4 h-4 border-2", md: "w-7 h-7 border-3", lg: "w-10 h-10 border-4" };

const Loader = ({ fullScreen = false, size = "md", className = "" }) => {
  const spinner = (
    <span
      className={cn(
        "inline-block rounded-full border-red-600 border-t-transparent animate-spin",
        sizeMap[size] ?? sizeMap.md,
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {spinner}
      </div>
    );
  }
  return spinner;
};

// ─── Skeleton variants (re-exported for convenience) ─────────────────────────
export const SkeletonBox = ({ className = "" }) => (
  <div className={cn("skeleton", className)} />
);

export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`skeleton h-3 rounded ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
    ))}
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="rounded-md overflow-hidden border border-gray-100">
    <div className="aspect-square skeleton" />
    <div className="p-2.5 space-y-2">
      <SkeletonText lines={2} />
      <div className="skeleton h-4 w-1/3 rounded" />
      <div className="flex gap-1.5 mt-2">
        <div className="skeleton h-7 flex-1 rounded" />
        <div className="skeleton h-7 flex-1 rounded" />
      </div>
    </div>
  </div>
);

export const SectionSkeleton = ({ count = 4 }) => (
  <div className="py-5 lg:py-8">
    <div className="flex items-center justify-between mb-4">
      <div className="skeleton h-6 w-40 rounded" />
      <div className="skeleton h-7 w-16 rounded" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default Loader;
