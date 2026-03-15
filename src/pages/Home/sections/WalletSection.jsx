import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { useWallets } from '../../../features/products/hooks/useProducts';

const WalletSection = () => {
  const { products, loading } = useWallets();
  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title="WALLETS" viewAllLink="/category/wallet" />
        <ProductGrid products={products} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default WalletSection;
