// src/pages/Home/sections/CategorySection.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductGrid from '../../../components/ui/ProductGrid/ProductGrid';

const CategorySection = ({ title, catSlug, products = [] }) => {
  const limitedProducts = products.slice(0, 4);

  return (
    <section className="section-wrapper">
      <Container fluid="xl">
        <SectionHeader title={title} catSlug={catSlug} />
        <ProductGrid products={limitedProducts} loading={false} cols={4} />
      </Container>
    </section>
  );
};

export default CategorySection;