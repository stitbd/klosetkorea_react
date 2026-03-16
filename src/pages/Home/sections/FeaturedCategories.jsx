import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './FeaturedCategories.scss';

import productImgAsset  from '../../../assets/images/products/product.jpg';
import img01 from '../../../assets/images/products/01.jpg';
import img02 from '../../../assets/images/products/07.jpg';
import img03 from '../../../assets/images/products/03.jpg';
import img04 from '../../../assets/images/products/04.jpg';

const CATEGORIES = [
  {
    id: 1,
    label: 'SNEAKERS',
    slug: 'sneakers',
    image: img01,
    span: 'tall',   // tall card (spans 2 rows)
  },
  {
    id: 2,
    label: 'SANDAL',
    slug: 'sandal',
    image: img02,
    span: 'tall',
  },
  {
    id: 3,
    label: 'APPAREL',
    slug: 'apparel',
    image: 'https://splayd.com.bd/cdn/shop/files/489.jpg?v=1773393969&width=600',
    span: 'tall',
  },
  {
    id: 4,
    label: 'ACCESSORIES',
    slug: 'accessories',
    image: 'https://splayd.com.bd/cdn/shop/files/01_cb47467f-8bdb-4047-9952-9e31eb4e6983.png?v=1767881920&width=600',
    span: 'tall',
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
