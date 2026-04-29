// src/components/ui/SubCategory/SubCategories.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../../utils';
import { apiGet } from '../../../utils/api';
import './SubCategories.scss';

const resolveRawImage = (imageField) => {
  if (!imageField) return '';
  if (typeof imageField === 'string') return imageField;
  if (typeof imageField === 'object') {
    return imageField.image || imageField.url || imageField.path || '';
  }
  return '';
};

const buildImageUrl = (imageField) => {
  const rawImage = resolveRawImage(imageField);
  if (!rawImage) return PLACEHOLDER_IMG;
  if (/^https?:\/\//i.test(rawImage)) return rawImage;
  const base = (BASE_IMAGE_URL || '').replace(/\/+$/, '');
  const path = rawImage.replace(/^\/+/, '');
  return `${base}/${path}`;
};

// ─── SubCategory Card ────────────────────────────────────────────
const SubCategoryCard = ({ subCat, categorySlug, index = 0 }) => {
  const displayName  = subCat.subcategoryName || subCat.name || '';
  const slug         = subCat.slug;
  const imageUrl     = buildImageUrl(subCat.image);
  const isAboveFold  = index < 3; // first 3 subcats + AllProducts = 4 visible cards

  return (
    <Link to={`/categories/${categorySlug}/${slug}`} className="subcat-card">
      <div className="subcat-card__image-wrap">
        <img
          src={imageUrl}
          alt={displayName}
          className="subcat-card__image"
          loading={isAboveFold ? 'eager' : 'lazy'}
          fetchpriority={index === 0 ? 'high' : 'auto'}
          decoding={isAboveFold ? 'sync' : 'async'}
          onError={(e) => {
            e.target.src     = PLACEHOLDER_IMG;
            e.target.onerror = null;
          }}
        />
        <div className="subcat-card__overlay">
          <h3 className="subcat-card__title">{displayName}</h3>
        </div>
      </div>
    </Link>
  );
};

// ─── All Products Card ───────────────────────────────────────────
const AllProductsCard = ({ categorySlug, categoryImage }) => (
  <Link to={`/categories/${categorySlug}/all`} className="subcat-card">
    <div className="subcat-card__image-wrap">
    <img
        src={categoryImage || PLACEHOLDER_IMG}
        alt="All Products"
        className="subcat-card__image"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
        onError={(e) => {
          e.target.src     = PLACEHOLDER_IMG;
          e.target.onerror = null;
        }}
      />
      <div className="subcat-card__overlay">
        <h3 className="subcat-card__title">All Products</h3>
      </div>
    </div>
  </Link>
);

// ─── Main SubCategories Component ────────────────────────────────
const SubCategories = () => {
  const { catSlug }  = useParams();
  const navigate     = useNavigate();

  const [category,      setCategory]      = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);

  useEffect(() => {
    if (!catSlug) return;

    setLoading(true);
    setError(null);
    setCategory(null);
    setSubcategories([]);

    apiGet('/categories')
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          const foundCategory = res.data.data.find((cat) => cat.slug === catSlug);

          if (!foundCategory) {
            setError('Category not found');
            return;
          }

          const subs = foundCategory.subcategories || [];
          setCategory(foundCategory);
          setSubcategories(subs);

          if (subs.length === 0) {
            navigate(`/categories/${catSlug}/all`, { replace: true });
          }
        } else {
          setError('Failed to load subcategories');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching subcategories');
      })
      .finally(() => setLoading(false));
  }, [catSlug, navigate]);

  // ✅ FIXED: Sort subcategories alphabetically (A-Z) by subcategoryName
  const sortedSubcategories = useMemo(() => {
    return [...subcategories].sort((a, b) =>
      (a.subcategoryName || a.name || '').localeCompare(
        b.subcategoryName || b.name || '',
        'en',
        { sensitivity: 'base' }
      )
    );
  }, [subcategories]);

  // ── Loading ───────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="subcats section-wrapper">
        <Container fluid className="subcats__container">
          <div className="subcats__loading">
            <div className="spinner-border" style={{ color: '#FF6503' }} role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // ── Error ─────────────────────────────────────────────────────
  if (error || !category) {
    return (
      <section className="subcats section-wrapper">
        <Container fluid className="subcats__container">
          <div className="subcats__error">{error || 'Category not found'}</div>
        </Container>
      </section>
    );
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <section className="subcats section-wrapper">
      <Container fluid className="subcats__container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="subcats__breadcrumb-wrap">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{category.name}</li>
          </ol>
        </nav>

        <div className="subcats__page-title">
          <h1>{category.name}</h1>
        </div>

        <Row className="g-3 g-md-4">
          {/* All Products card — always first, always eager */}
          <Col xs={6} sm={4} md={3} lg={3}>
            <AllProductsCard
              categorySlug={catSlug}
              categoryImage={buildImageUrl(category.image)}
            />
          </Col>

          {sortedSubcategories.map((subCat, i) => (
            <Col key={subCat.id} xs={6} sm={4} md={3} lg={3}>
              <SubCategoryCard
                subCat={subCat}
                categorySlug={catSlug}
                index={i}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SubCategories;