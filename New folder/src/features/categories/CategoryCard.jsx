import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  if (!category) return null;

  const { label, slug, image } = category;

  return (
    <Link
      to={`/collections/${slug}`}
      className="group relative block overflow-hidden rounded-md bg-gray-100
                 border border-gray-100 hover:shadow-md transition-shadow duration-200"
      style={{ aspectRatio: "3 / 4" }}
      aria-label={`Browse ${label}`}
    >
      {/* ── Photo ── */}
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover
                   transition-transform duration-300 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* ── Gradient overlay — darkens lower third for label readability ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* ── Label bar — same bottom position as ProductCard name ── */}
      <div className="absolute bottom-0 left-0 right-0 py-2.5 px-2 text-center">
        <span
          className="text-white text-[11px] sm:text-xs font-bold
                     tracking-[0.15em] uppercase drop-shadow"
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;