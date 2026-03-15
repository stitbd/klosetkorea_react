import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useCaps } from '../../../features/products/hooks/useProducts';

const CapSection = () => {
  const { products, loading } = useCaps();
  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="CAP" viewAllLink="/category/cap" />
        <ProductGrid products={products} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default CapSection;
