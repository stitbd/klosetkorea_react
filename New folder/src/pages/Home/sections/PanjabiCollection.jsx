import React from "react";
import { ProductGrid } from "../../../features/products";
import { SectionSkeleton } from "../../../components/ui/Loader/Loader";
import SectionHeader from "./SectionHeader";

/**
 * PanjabiCollection — Eid Al-Fitr 26 Panjabi Collection section.
 * 4-column grid on desktop, 2-column on mobile.
 */
const PanjabiCollection = ({ products = [], loading = false }) => {
  if (loading) return <SectionSkeleton count={4} />;

  return (
    <section className="py-5 lg:py-8" aria-labelledby="panjabi-heading">
      <SectionHeader title="Eid Al-Fitr 26 Panjabi Collection" slug="panjabi" />
      <ProductGrid
        products={products}
        cols={{ mobile: 2, sm: 2, md: 4, lg: 4 }}
      />
    </section>
  );
};

export default PanjabiCollection;
