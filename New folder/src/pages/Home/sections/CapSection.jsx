import React from "react";
import { ProductGrid } from "../../../features/products";
import { SectionSkeleton } from "../../../components/ui/Loader/Loader";
import SectionHeader from "./SectionHeader";

const CapSection = ({ products = [], loading = false }) => {
  if (loading) return <SectionSkeleton count={4} />;

  return (
    <section className="py-5 lg:py-8" aria-labelledby="cap-heading">
      <SectionHeader title="Cap" slug="cap" />
      <ProductGrid
        products={products}
        cols={{ mobile: 2, sm: 2, md: 4, lg: 4 }}
      />
    </section>
  );
};

export default CapSection;
