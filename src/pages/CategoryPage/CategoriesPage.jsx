import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './CategoriesPage.scss';
import { useCategories } from '../../hooks/useCategories';
import { BASE_IMAGE_URL, PLACEHOLDER_IMG } from '../../utils';

const CategoryCard = ({ cat }) => {
  const src   = cat.image ? `${BASE_IMAGE_URL}${cat.image}` : PLACEHOLDER_IMG;
  const label = cat.label || cat.name || 'Category';

  return (
    <Link to={`/categories/${cat.slug}`} className="cat-card">
      <div className="cat-card__img-wrap">
        <img
          src={src}
          alt={label}
          className="cat-card__img"
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER_IMG; e.target.onerror = null; }}
        />
        <div className="cat-card__overlay" />
      </div>
      <p className="cat-card__label">{label}</p>
    </Link>
  );
};

const CategoriesMobilePage = () => {
  const { categories, loading, error } = useCategories();

  // ✅ FIXED: Sort categories alphabetically (A-Z) by name/label
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) =>
      (a.label || a.name || '').localeCompare(
        b.label || b.name || '',
        'en',
        { sensitivity: 'base' }
      )
    );
  }, [categories]);

  const heading = (
    <div className="featured-cats__heading">
      <span className="featured-cats__heading-line" />
      <h2 className="featured-cats__heading-text">CATEGORY</h2>
      <span className="featured-cats__heading-line" />
    </div>
  );

  if (loading) return (
    <section className="featured-cats section-wrapper">
      <Container fluid className="featured-cats__container">
        {heading}
        <div className="featured-cats__grid">
          <div className="featured-cats__row featured-cats__row--tall">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="cat-card cat-card--loading">
                <div className="cat-card__img-wrap" />
                <p className="cat-card__label" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );

  if (error) return (
    <section className="featured-cats section-wrapper">
      <Container fluid className="featured-cats__container">
        {heading}
        <p className="text-center text-danger">Error: {error}</p>
      </Container>
    </section>
  );

  return (
    <section className="featured-cats section-wrapper">
      <Container fluid className="featured-cats__container">
        {heading}
        <div className="featured-cats__grid">
          <div className="featured-cats__row featured-cats__row--tall">
            {sortedCategories.map((cat) => <CategoryCard key={cat.id} cat={cat} />)}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CategoriesMobilePage;