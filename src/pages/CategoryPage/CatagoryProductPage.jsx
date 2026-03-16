import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useCartStore from '../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../utils';
import './CatagoryProductPage.scss';

// ─── Static image imports (Vite resolves at build time) ───────────
import img01 from '../../assets/images/products/01.jpg';
import img02 from '../../assets/images/products/02.jpg';
import img03 from '../../assets/images/products/03.jpg';
import img04 from '../../assets/images/products/04.jpg';
import img05 from '../../assets/images/products/05.jpg';
import img06 from '../../assets/images/products/06.jpg';
import img07 from '../../assets/images/products/07.jpg';

// Pool — filter out any undefined (missing files)
const IMG_POOL = [img01, img02, img03, img04, img05, img06, img07].filter(Boolean);
const poolImg  = (i) => IMG_POOL.length ? IMG_POOL[i % IMG_POOL.length] : PLACEHOLDER_IMG;

// ── Category title map ────────────────────────────────────────────
const CATEGORY_TITLES = {
  'suits-blazer':       'SUITS & BLAZER',
  'co-ord-sets':        'CO-ORD SETS',
  'co-ord-sets-woman':  'CO-ORD SETS',
  'gift-voucher':       'GIFT VOUCHER',
  'ethnic-wear':        'ETHNIC WEAR',
  'western-wear':       'WESTERN WEAR',
  'traditional-wear':   'TRADITIONAL WEAR',
  'privilege-card':     'PRIVILEGE CARD / GOLD CARD',
  'wallet':             'WALLET / MONEY CLIP',
  'formal-shirt':       'FORMAL SHIRT',
  'casual-shirt':       'CASUAL SHIRT',
  'half-sleeve-shirt':  'HALF SLEEVE SHIRT',
  'full-sleeve-shirt':  'FULL SLEEVE SHIRT',
  'printed-shirt':      'PRINTED SHIRT',
  'solid-shirt':        'SOLID SHIRT',
  'club-shirt':         'CLUB SHIRT',
  'winter-shirt':       'WINTER SHIRT',
  'formal-pant':        'FORMAL PANT',
  'perfume-man':        'PERFUME - MAN',
  'bag-man':            'BAG - MAN',
  'bag-woman':          'BAG - WOMAN',
  'sunglass-man':       'SUNGLASS - MAN',
  'sunglass-woman':     'SUNGLASS - WOMAN',
  'eid-26':             'EID 26',
  'eid-26-woman':       'EID 26 - WOMAN',
  'new-arrivals':       'NEW ARRIVALS',
  'ramadan-offer':      'RAMADAN OFFER',
  'cricket-wear':       'CRICKET WEAR',
  'long-wallet':        'LONG WALLET',
  'luxury-shirt':       'LUXURY SHIRT',
  't-shirt-woman':      'T-SHIRT',
  'casual-shirt-woman': 'CASUAL SHIRT',
  'hoodie-woman':       'HOODIE',
  'jacket-woman':       'JACKET',
  'sweater-woman':      'SWEATER',
  'jeans-woman':        'JEANS',
  'joggers-woman':      'JOGGERS',
  'winterwear-woman':   'WINTERWEAR',
  'bottoms-woman':      'BOTTOMS',
};

const slugToTitle = (slug) =>
  CATEGORY_TITLES[slug] ||
  slug?.replace(/-/g, ' ').toUpperCase() ||
  'PRODUCTS';

// ── Mock product generator — uses IMG_POOL so images always show ──
const makeMockProducts = (category, total = 28) =>
  Array.from({ length: total }, (_, i) => {
    const orig    = [800, 900, 1000, 1200, 1400, 1500, 1800, 2000, 2200, 2500][i % 10];
    const discPct = [20, 25, 30, 33][i % 4];
    const price   = Math.round(orig * (1 - discPct / 100) / 5) * 5;
    return {
      id:            `${category}-${i + 1}`,
      name:          `${category} Collection Style ${i + 1}`,
      slug:          `${category.toLowerCase().replace(/\s+/g, '-')}-style-${i + 1}`,
      sku:           `SKU-${String(2500 + i).padStart(6, '0')}`,
      price,
      originalPrice: orig,
      image:         poolImg(i),   // ← always a real imported image
      badge:         `${discPct}% Off`,
      inStock:       true,
      category,
    };
  });

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default'           },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'name_asc',   label: 'Name: A → Z'       },
  { value: 'name_desc',  label: 'Name: Z → A'       },
];
const PER_PAGE_OPTIONS = [12, 24, 50, 100];

// ── Product Card ──────────────────────────────────────────────────
const ProductCard = ({ product, addToCart }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="ccat-card">
      <Link to={`/product/${product.slug}`} className="ccat-card__img-link">
        {product.badge && <span className="ccat-card__badge">{product.badge}</span>}
        <img
          src={imgErr ? PLACEHOLDER_IMG : product.image}
          alt={product.name}
          className="ccat-card__img"
          onError={() => setImgErr(true)}
          loading="lazy"
        />
      </Link>
      <div className="ccat-card__body">
        <Link to={`/product/${product.slug}`} className="ccat-card__name">
          {product.name}
        </Link>
        {product.sku && <p className="ccat-card__sku">SKU: {product.sku}</p>}
        <div className="ccat-card__price-row">
          {product.originalPrice > product.price && (
            <span className="ccat-card__price-orig">{formatPrice(product.originalPrice)}</span>
          )}
          <span className="ccat-card__price-curr">{formatPrice(product.price)}</span>
        </div>
        <div className="ccat-card__actions">
          <button
            className="ccat-card__btn ccat-card__btn--cart"
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
          >
            Add To Cart
          </button>
          <Link to={`/product/${product.slug}`} className="ccat-card__btn ccat-card__btn--buy">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────
const CatagoryProductPage = () => {
  const { slug, id }      = useParams();
  const location          = useLocation();
  const addToCart         = useCartStore((s) => s.addToCart);

  const rawKey = slug || id ||
    location.pathname.replace(/^\//, '').split('/').pop() || '';
  const title = slugToTitle(rawKey);

  const [allProducts, setAllProducts] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [sortBy,      setSortBy]      = useState('default');
  const [perPage,     setPerPage]     = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // Load products — mock data with real images, no API needed
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    // Use setTimeout to simulate async so skeleton shows briefly
    const t = setTimeout(() => {
      setAllProducts(makeMockProducts(title, 28));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [title]);

  // Sort
  const sorted = [...allProducts].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'name_asc')   return a.name.localeCompare(b.name);
    if (sortBy === 'name_desc')  return b.name.localeCompare(a.name);
    return 0;
  });

  // Paginate
  const totalPages = Math.ceil(sorted.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginated  = sorted.slice(startIndex, startIndex + perPage);

  const handlePerPage = (v) => { setPerPage(Number(v)); setCurrentPage(1); };
  const handleSort    = (v) => { setSortBy(v);          setCurrentPage(1); };

  const getPages = () => {
    const pages = [], r = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - r && i <= currentPage + r))
        pages.push(i);
      else if (i === currentPage - r - 1 || i === currentPage + r + 1)
        pages.push('...');
    }
    return [...new Set(pages)];
  };

  return (
    <main className="ccat-page">
      <Container fluid="xl" className="py-3">

        {/* Breadcrumb + Back */}
        <div className="ccat-page__topbar d-flex align-items-center justify-content-between mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb ccat-page__breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
              <li className="breadcrumb-item active">{title}</li>
            </ol>
          </nav>
          <Link to="/" className="ccat-page__back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back To Home
          </Link>
        </div>

        {/* Title */}
        <h1 className="ccat-page__title">{title}</h1>

        {/* Filter bar */}
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

        {/* Grid */}
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
        ) : (
          <Row className="g-3">
            {paginated.map((product) => (
              <Col key={product.id} xs={6} sm={4} md={3}>
                <ProductCard product={product} addToCart={addToCart} />
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="ccat-page__pagination-wrap d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4">
            <div className="ccat-page__pagination d-flex align-items-center gap-1">
              <button className="ccat-page__page-btn ccat-page__page-btn--arrow"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>

              {getPages().map((page, i) =>
                page === '...' ? (
                  <span key={`e-${i}`} className="ccat-page__page-ellipsis">…</span>
                ) : (
                  <button key={page}
                    className={`ccat-page__page-btn ${currentPage === page ? 'ccat-page__page-btn--active' : ''}`}
                    onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                )
              )}

              <button className="ccat-page__page-btn ccat-page__page-btn--arrow"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}>
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