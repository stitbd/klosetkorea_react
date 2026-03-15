import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useLuxuryShirts } from '../../../features/products/hooks/useProducts';

const LuxuryShirtSection = () => {
  const { products, loading } = useLuxuryShirts();
  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="LUXURY SHIRT" viewAllLink="/category/luxury-shirt" />
        <ProductGrid products={products} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default LuxuryShirtSection;
