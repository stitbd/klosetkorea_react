import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useBelts } from '../../../features/products/hooks/useProducts';

const BeltsSection = () => {
  const { products, loading } = useBelts();
  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="BELTS" viewAllLink="/category/belt" />
        <ProductGrid products={products} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default BeltsSection;
