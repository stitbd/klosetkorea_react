import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';
import { usePanjabiCollection } from '../../../features/products/hooks/useProducts';
import './PanjabiCollection.scss';

const PanjabiCollection = () => {
  const { products, loading } = usePanjabiCollection();

  return (
    <section className="section-wrapper panjabi-section">
      <Container fluid="xl">
        <SectionHeader
          title="EID AL-FITR 26 PANJABI COLLECTION"
          viewAllLink="/category/eid-collection-26"
        />
        <ProductGrid products={products} loading={loading} cols={4} />
      </Container>
    </section>
  );
};

export default PanjabiCollection;
