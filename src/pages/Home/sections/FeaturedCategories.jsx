import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './FeaturedCategories.scss';

const CATEGORIES = [
  {
    id: 1,
    label: 'WOMEN',
    slug: 'women',
    image: 'https://splayd.com.bd/cdn/shop/files/01254.png?v=1750746694&width=600',
    span: 'tall',   // tall card (spans 2 rows)
  },
  {
    id: 2,
    label: 'PANJABI',
    slug: 'panjabi',
    image: 'https://splayd.com.bd/cdn/shop/files/598.jpg?v=1773496395&width=600',
    span: 'tall',
  },
  {
    id: 3,
    label: 'COLLECTION',
    slug: 'collection',
    image: 'https://splayd.com.bd/cdn/shop/files/499.jpg?v=1773396761&width=600',
    span: 'tall',
  },
  {
    id: 4,
    label: 'POLO',
    slug: 'polo',
    image: 'https://splayd.com.bd/cdn/shop/files/359_6cd4791b-2dd0-40f6-b654-a687a7cc61c8.jpg?v=1772957003&width=600',
    span: 'tall',
  },
  {
    id: 5,
    label: 'PERFUME',
    slug: 'perfume',
    image: 'https://splayd.com.bd/cdn/shop/files/01_cb47467f-8bdb-4047-9952-9e31eb4e6983.png?v=1767881920&width=600',
    span: 'normal',
  },
  {
    id: 6,
    label: 'SHIRTS',
    slug: 'shirts',
    image: 'https://splayd.com.bd/cdn/shop/files/489.jpg?v=1773393969&width=600',
    span: 'normal',
  },
  {
    id: 7,
    label: 'FASHION',
    slug: 'fashion',
    image: 'https://splayd.com.bd/cdn/shop/files/01copy_b89f9bf0-651a-4e58-ad0e-28b2b58388d2.jpg?v=1765882987&width=600',
    span: 'normal',
  },
  {
    id: 8,
    label: 'AIR FORCE',
    slug: 'air-force',
    image: 'https://splayd.com.bd/cdn/shop/files/01_9ba91a80-9022-448e-9a15-2ebf754068f7.png?v=1771248161&width=600',
    span: 'normal',
  },
];

const FeaturedCategories = () => (
  <section className="featured-cats section-wrapper">
    <Container fluid="xl">
      {/* Section heading — centred rule style from reference */}
      <div className="featured-cats__heading">
        <span className="featured-cats__heading-line" />
        <h2 className="featured-cats__heading-text">FEATURED CATEGORIES</h2>
        <span className="featured-cats__heading-line" />
      </div>

      {/* Masonry-style grid: top row = 4 tall cards, bottom row = 4 normal cards */}
      <div className="featured-cats__grid">
        {/* ── Row 1: tall portrait cards ─────────── */}
        <div className="featured-cats__row featured-cats__row--tall">
          {CATEGORIES.filter((c) => c.span === 'tall').map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* ── Row 2: landscape cards ─────────────── */}
        <div className="featured-cats__row featured-cats__row--normal">
          {CATEGORIES.filter((c) => c.span === 'normal').map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </Container>
  </section>
);

const CategoryCard = ({ cat }) => (
  <Link to={`/category/${cat.slug}`} className="cat-card">
    <div className="cat-card__img-wrap">
      <img
        src={cat.image}
        alt={cat.label}
        className="cat-card__img"
        loading="lazy"
      />
      <div className="cat-card__overlay" />
    </div>
    <p className="cat-card__label">{cat.label}</p>
  </Link>
);

export default FeaturedCategories;
