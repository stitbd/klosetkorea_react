// src/pages/CategoryPage/CatagoryProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../../components/ui/ProductCard/ProductCard';
import './CatagoryProductPage.scss';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default'           },
  { value: 'date_asc',   label: 'Date: New → Old'   },
  { value: 'date_desc',  label: 'Date: Old → New'   },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'name_asc',   label: 'Name: A → Z'       },
  { value: 'name_desc',  label: 'Name: Z → A'       },
];
const PER_PAGE_OPTIONS = [12, 24, 50, 100];

// ── Main Page ─────────────────────────────────────────────────────
const CatagoryProductPage = () => {
  const { catSlug, subSlug } = useParams();
  const location = useLocation();

  // Determine mode: subcategory page (catSlug + subSlug) or category page (catSlug only)
  const isSubcategory = !!(catSlug && subSlug && subSlug !== 'all');

  const [categoryName,    setCategoryName]    = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [allProducts,     setAllProducts]     = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [sortBy,          setSortBy]          = useState('default');
  const [perPage,         setPerPage]         = useState(25);
  const [currentPage,     setCurrentPage]     = useState(1);

  useEffect(() => {
    if (!catSlug) return;

    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setCategoryName('');
    setSubcategoryName('');
    setAllProducts([]);

    const API = import.meta.env.VITE_API_URL;

    // Subcategory: GET /api/subcategory/{catSlug}/{subSlug}
    // Category:    GET /api/category/{catSlug}
    const endpoint = isSubcategory
    ? `${API}/subcategory/${catSlug}/${subSlug}`
    : `${API}/category/${catSlug}`;

    axios
      .get(endpoint)
      .then((res) => {
        const body = res.data;

        if (body?.status) {
          // Category name — present in both responses
          if (body.category?.name) {
            setCategoryName(body.category.name);
          } else {
            setCategoryName(catSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
          }

          // Subcategory name — only present in subcategory response
          if (isSubcategory && body.subcategory?.subcategoryName) {
            setSubcategoryName(body.subcategory.subcategoryName);
          }

          setAllProducts(Array.isArray(body.products) ? body.products : []);
        } else {
          setError('Category not found.');
        }
      })
      .catch(() => setError('Failed to load products. Please try again.'))
      .finally(() => setLoading(false));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catSlug, subSlug, isSubcategory]);

  // Page title: prefer subcategory name when in subcategory mode
  const title = isSubcategory && subcategoryName
    ? subcategoryName
    : categoryName || catSlug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'PRODUCTS';

  // Breadcrumb label for the parent category
  const breadcrumbCategory = categoryName || catSlug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // ── Sorting ───────────────────────────────────────────────────
  const sorted = [...allProducts].sort((a, b) => {
    const aPrice = a.new_price ?? a.price ?? 0;
    const bPrice = b.new_price ?? b.price ?? 0;
    
    if (sortBy === 'price_asc')  return aPrice - bPrice;
    if (sortBy === 'price_desc') return bPrice - aPrice;
    if (sortBy === 'name_asc')   return (a.name || '').localeCompare(b.name || '');
    if (sortBy === 'name_desc')  return (b.name || '').localeCompare(a.name || '');
    
    // Date sorting - assuming products have a date field (createdAt, date, or publishedAt)
    if (sortBy === 'date_asc') {
      const aDate = a.createdAt || a.date || a.publishedAt || a.created_date || a.date_added || '';
      const bDate = b.createdAt || b.date || b.publishedAt || b.created_date || b.date_added || '';
      return new Date(bDate) - new Date(aDate); // New → Old (descending)
    }
    if (sortBy === 'date_desc') {
      const aDate = a.createdAt || a.date || a.publishedAt || a.created_date || a.date_added || '';
      const bDate = b.createdAt || b.date || b.publishedAt || b.created_date || b.date_added || '';
      return new Date(aDate) - new Date(bDate); // Old → New (ascending)
    }
    
    return 0;
  });

  // ── Pagination ────────────────────────────────────────────────
  const totalPages = Math.ceil(sorted.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginated  = sorted.slice(startIndex, startIndex + perPage);

  const handlePerPage = (v) => { setPerPage(Number(v)); setCurrentPage(1); };
  const handleSort    = (v) => { setSortBy(v);          setCurrentPage(1); };

  const getPages = () => {
    const pages = [];
    const r = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - r && i <= currentPage + r)) {
        pages.push(i);
      } else if (i === currentPage - r - 1 || i === currentPage + r + 1) {
        pages.push('...');
      }
    }
    return [...new Set(pages)];
  };

  return (
    <main className="ccat-page">
      <Container fluid="xl" className="py-3">

        {/* ── Breadcrumb + Back ── */}
        <div className="ccat-page__topbar d-flex align-items-center justify-content-between mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb ccat-page__breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              {isSubcategory || subSlug === 'all' ? (
                <>
                  <li className="breadcrumb-item">
                    <Link to={`/categories/${catSlug}`}>{breadcrumbCategory}</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {isSubcategory ? title : 'All Products'}
                  </li>
                </>
              ) : (
                <li className="breadcrumb-item active" aria-current="page">{title}</li>
              )}
            </ol>
          </nav>
          <Link to={isSubcategory ? `/categories/${catSlug}` : subSlug === 'all' ? `/categories/${catSlug}` : '/'}
            className="ccat-page__back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {isSubcategory || subSlug === 'all' ? 'Back To Category' : 'Back To Home'}
          </Link>
        </div>

        {/* ── Title ── */}
        <h1 className="ccat-page__title">{title}</h1>

        {/* ── Error ── */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* ── Filter bar ── */}
        {!loading && !error && (
          <div className="ccat-page__filter-bar d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
            <p className="ccat-page__count mb-0">
              Showing {sorted.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + perPage, sorted.length)} of {sorted.length} products
            </p>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="ccat-page__select-wrap">
                <label className="ccat-page__select-label">Sort by:</label>
                <select className="ccat-page__select" value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="ccat-page__select-wrap">
                <label className="ccat-page__select-label">Per page:</label>
                <select className="ccat-page__select" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
                  {PER_PAGE_OPTIONS.map((n) => <option key={n} value={n}>{n} per page</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── Product Grid ── */}
        {loading ? (
          <div className="ccat-page__skeleton-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="ccat-page__skeleton-card">
                <div className="ccat-page__skeleton-img skeleton-pulse" />
                <div className="ccat-page__skeleton-body">
                  <div className="skeleton-pulse" style={{ height: 12, width: '85%', marginBottom: 6 }} />
                  <div className="skeleton-pulse" style={{ height: 12, width: '55%', marginBottom: 6 }} />
                  <div className="skeleton-pulse" style={{ height: 18, width: '40%', marginBottom: 8 }} />
                  <div className="d-flex gap-2">
                    <div className="skeleton-pulse" style={{ height: 30, flex: 1 }} />
                    <div className="skeleton-pulse" style={{ height: 30, flex: 1 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !error && paginated.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p>No products found in this {isSubcategory ? 'subcategory' : 'category'}.</p>
          </div>
        ) : !error && (
          <Row className="g-3">
            {paginated.map((product) => (
              <Col key={product.id} xs={6} sm={4} md={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}

        {/* ── Pagination ── */}
        {!loading && !error && totalPages > 1 && (
          <div className="ccat-page__pagination-wrap d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4">
            <div className="ccat-page__pagination d-flex align-items-center gap-1">
              <button
                className="ccat-page__page-btn ccat-page__page-btn--arrow"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              {getPages().map((page, i) =>
                page === '...' ? (
                  <span key={`e-${i}`} className="ccat-page__page-ellipsis">…</span>
                ) : (
                  <button
                    key={page}
                    className={`ccat-page__page-btn ${currentPage === page ? 'ccat-page__page-btn--active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="ccat-page__page-btn ccat-page__page-btn--arrow"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            <div className="ccat-page__select-wrap">
              <label className="ccat-page__select-label">Per page:</label>
              <select className="ccat-page__select" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
                {PER_PAGE_OPTIONS.map((n) => <option key={n} value={n}>{n} per page</option>)}
              </select>
            </div>
          </div>
        )}

      </Container>
    </main>
  );
};

export default CatagoryProductPage;