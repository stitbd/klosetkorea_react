import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './FeaturedCategories.scss';

const CATEGORIES = [
  {
    id: 1,
    label: 'WOMEN',
    slug: 'women',
    image: 'https://placehold.co/280x320/f5e6e8/c8102e?text=Women',
    span: 'tall',   // tall card (spans 2 rows)
  },
  {
    id: 2,
    label: 'PANJABI',
    slug: 'panjabi',
    image: 'https://placehold.co/280x320/e8f0f5/1a3a5c?text=Panjabi',
    span: 'tall',
  },
  {
    id: 3,
    label: 'COLLECTION',
    slug: 'collection',
    image: 'https://placehold.co/280x320/f0ece4/5c4a1a?text=Collection',
    span: 'tall',
  },
  {
    id: 4,
    label: 'POLO',
    slug: 'polo',
    image: 'https://placehold.co/280x320/e8ede8/1a4a1a?text=Polo',
    span: 'tall',
  },
  {
    id: 5,
    label: 'PERFUME',
    slug: 'perfume',
    image: 'https://placehold.co/280x160/1a1a2e/f5a623?text=Perfume',
    span: 'normal',
  },
  {
    id: 6,
    label: 'SHIRTS',
    slug: 'shirts',
    image: 'https://placehold.co/280x160/2e2e1a/ffffff?text=Shirts',
    span: 'normal',
  },
  {
    id: 7,
    label: 'FASHION',
    slug: 'fashion',
    image: 'https://placehold.co/280x160/e8f5f0/1a5c4a?text=Fashion',
    span: 'normal',
  },
  {
    id: 8,
    label: 'AIR FORCE',
    slug: 'air-force',
    image: 'https://placehold.co/280x160/f5f5f0/3a3a2e?text=Air+Force',
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
