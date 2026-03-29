import React from "react";
import { ProductGrid } from "../../../features/products";
import { SectionSkeleton } from "../../../components/ui/Loader/Loader";
import SectionHeader from "./SectionHeader";

const LuxuryShirtSection = ({ products = [], loading = false }) => {
  if (loading) return <SectionSkeleton count={4} />;

  return (
    <section className="py-5 lg:py-8" aria-labelledby="luxury-shirt-heading">
      <SectionHeader title="Luxury Shirt" slug="luxury-shirt" />
      <ProductGrid
        products={products}
        cols={{ mobile: 2, sm: 2, md: 4, lg: 4 }}
      />
    </section>
  );
};

export default LuxuryShirtSection;
