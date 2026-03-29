import React from "react";
import { Link } from "react-router-dom";
import { ProductGrid } from "../../../features/products";
import { SectionSkeleton } from "../../../components/ui/Loader/Loader";

const SectionHeader = ({ title, slug }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="section-title">{title}</h2>
    <Link
      to={`/collections/${slug}`}
      className="text-[11px] font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded transition"
    >
      See All
    </Link>
  </div>
);

const NewArrivals = ({ products = [], loading = false }) => {
  if (loading) return <SectionSkeleton count={4} />;

  return (
    <section className="py-5 lg:py-8" aria-labelledby="new-arrivals-heading">
      <SectionHeader title="New Arrivals" slug="new-arrivals" />
      <ProductGrid
        products={products}
        cols={{ mobile: 2, sm: 2, md: 4, lg: 4 }}
      />
    </section>
  );
};

export default NewArrivals;
