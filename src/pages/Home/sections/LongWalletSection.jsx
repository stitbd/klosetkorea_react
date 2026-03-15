import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useLongWallets } from '../../../features/products/hooks/useProducts';

const LongWalletSection = () => {
  const { products, loading } = useLongWallets();
  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="LONG WALLETS" viewAllLink="/category/long-wallet" />
        <ProductGrid products={products} loading={loading} cols={3} />
      </Container>
    </section>
  );
};

export default LongWalletSection;
