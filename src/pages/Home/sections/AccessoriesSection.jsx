import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useBelts } from '../../../features/products/hooks/useProducts';

const AccessoriesSection = () => {
  const { products, loading } = useBelts();
  const limitedProducts = products?.slice(0, 4); // 👈 ONLY 1 ROW


  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="ACCESSORIES" viewAllLink="/category/accessories" />
        <ProductGrid products={limitedProducts} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default AccessoriesSection;
