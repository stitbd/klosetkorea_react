import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useLuxuryShirts } from '../../../features/products/hooks/useProducts';

const ApparelSection = () => {
  const { products, loading } = useLuxuryShirts();
  const limitedProducts = products?.slice(0, 4); // 👈 ONLY 1 ROW


  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="APPAREL" viewAllLink="/category/apparel" />
        <ProductGrid products={limitedProducts} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default ApparelSection;
