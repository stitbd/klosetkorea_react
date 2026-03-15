// ─── NewArrivals.jsx ──────────────────────────────────────────────
import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useNewArrivals } from '../../../features/products/hooks/useProducts';

const NewArrivals = () => {
  const { products, loading } = useNewArrivals();
  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="NEW ARRIVALS" viewAllLink="/category/new-arrivals" />
        <ProductGrid products={products} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default NewArrivals;
