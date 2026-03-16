import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useCartStore from '../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../utils';
import './CatagoryProductPage.scss';

import img01 from '../../assets/images/products/01.jpg';
import img02 from '../../assets/images/products/02.jpg';
import img03 from '../../assets/images/products/03.jpg';
import img04 from '../../assets/images/products/04.jpg';
import img05 from '../../assets/images/products/05.jpg';
import img06 from '../../assets/images/products/06.jpg';
import img07 from '../../assets/images/products/07.jpg';

const IMGS = [img01,img02,img03,img04,img05,img06,img07].filter(Boolean);
const gi   = (i) => IMGS.length ? IMGS[i % IMGS.length] : PLACEHOLDER_IMG;

// ── Category title map — covers ALL nav + sub + child menu hrefs ──
const CATEGORY_TITLES = {
  // ── Top-level nav ─────────────────────────────────────────
  man:                  'MAN',
  woman:                'WOMAN',
  women:                'WOMEN',
  lifestyle:            'LIFESTYLE',
  'gift-voucher':       'GIFT VOUCHER',
  products:             'ALL PRODUCTS',

  // ── Sub-menu (slug-based) ──────────────────────────────────
  shirt:                'SHIRT',
  shirts:               'SHIRTS',
  panjabi:              'PANJABI',
  'ethnic-wear':        'ETHNIC WEAR',
  't-shirt':            'T-SHIRT',
  polo:                 'POLO',
  bottom:               'BOTTOM',
  'suits-blazer':       'SUITS & BLAZER',
  winterwear:           'WINTERWEAR',
  underwear:            'UNDERWEAR',
  footwear:             'FOOTWEAR',
  accessories:          'ACCESSORIES',
  'co-ord-sets':        'CO-ORD SETS',
  shrug:                'SHRUG',
  dress:                'DRESS',
  wallet:               'WALLET',
  'long-wallet':        'LONG WALLET',
  belt:                 'BELT',
  'luxury-shirt':       'LUXURY SHIRT',
  leather:              'LEATHER',
  perfume:              'PERFUME',
  bag:                  'BAG',
  sunglass:             'SUNGLASS',
  cap:                  'CAP',
  'eid-collection-26':  'EID COLLECTION 2026',
  'new-arrivals':       'NEW ARRIVALS',
  'latest':             'LATEST PRODUCTS',
  'ramadan-offer':      'RAMADAN OFFER',
  'cricket-wear':       'CRICKET WEAR',

  // ── product-list/:id — sub-menu ───────────────────────────
  '3':   'POLO',
  '4':   'SHIRT',
  '5':   'BOTTOM',
  '6':   'FOOTWEAR',
  '8':   'WESTERN WEAR',
  '9':   'TRADITIONAL WEAR',
  '11':  'BOTTOMS',
  '13':  'SHRUG',
  '18':  'ETHNIC WEAR',
  '19':  'T-SHIRT',
  '22':  'WALLET / MONEY CLIP',
  '23':  'PERFUME',
  '27':  'PRIVILEGE CARD / GOLD CARD',
  '29':  'BAG',
  '34':  'DRESS',
  '39':  'WINTERWEAR',
  '42':  'ACCESSORIES',
  '57':  'UNDERWEAR',
  '59':  'SUNGLASS',
  '68':  'EID 26',
  '69':  'EID 26 - WOMAN',
  '70':  'WINTERWEAR',
  '71':  'CO-ORD SETS',
  '72':  'SUITS & BLAZER',

  // ── products/:id — child menu ─────────────────────────────
  '1':   'FORMAL SHIRT',
  '2':   'CASUAL SHIRT',
  '7':   'JEANS',
  '10':  'LONG SHIRT',
  '14':  'SKIRTS / PALAZZO',
  '15':  'PANTS',
  '20':  'PANJABI',
  '21':  'KABLI',
  '22':  'VEST',
  '27':  'MASK',
  '28':  'SOCKS',
  '29':  'JOGGERS',
  '30':  'SANDAL',
  '32':  'SNEAKERS',
  '33':  'BOOT',
  '36':  'OVERCOAT',
  '41':  'TIE',
  '44':  'PAJAMA',
  '52':  'BELT',
  '53':  'PONCHO',
  '55':  'SWEATER',
  '61':  'JACKET',
  '62':  'SWEATER',
  '63':  'SWEATSHIRT',
  '64':  'HOODIE',
  '65':  'PERFUME - MAN',
  '67':  'BAG - MAN',
  '68':  'BAG - WOMAN',
  '70':  'SUNGLASS - MAN',
  '73':  'PRINTED SHIRT',
  '74':  'SOLID SHIRT',
  '75':  'CLUB SHIRT',
  '76':  'FULL SLEEVE SHIRT',
  '77':  'TOPS',
  '78':  'T-SHIRT',
  '79':  'KAMEEZ',
  '80':  'KURTI',
  '81':  'KAFTAN',
  '84':  'SUMMER BLAZER',
  '85':  'WINTER SHIRT',
  '86':  'HOODIE',
};

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default'           },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'name_asc',   label: 'Name: A → Z'       },
  { value: 'name_desc',  label: 'Name: Z → A'       },
];

const PER_PAGE_OPTIONS = [12, 25, 50, 100];

const makeMockProducts = (category, total = 28) =>
  Array.from({ length: total }, (_, i) => {
    const orig    = Math.floor(Math.random() * 1500) + 800;
    const discPct = [20, 25, 30, 33][Math.floor(Math.random() * 4)];
    const price   = Math.round(orig * (1 - discPct / 100) / 5) * 5;
    return {
      id:            `${category}-${i + 1}`,
      name:          `${category} Collection Style ${i + 1}`,
      slug:          `${category.toLowerCase().replace(/\s+/g, '-')}-style-${i + 1}`,
      sku:           `SKU-${String(2500 + i).padStart(6, '0')}`,
      price,
      originalPrice: orig,
      discountPct,
      image:         gi(i),
      badge:         `${discPct}% Off`,
      inStock:       true,
      category,
    };
  });

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
  const { slug, id }                  = useParams();
  const location                      = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [sortBy,      setSortBy]      = useState('default');
  const [perPage,     setPerPage]     = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const addToCart                     = useCartStore((s) => s.addToCart);

  // Derive title directly from URL slug — clean and readable
  // /categories/panjabi       → PANJABI
  // /categories/ethnic-wear   → ETHNIC WEAR
  // /categories/suits-blazer  → SUITS & BLAZER
  // /product-list/:id / /products/:id  → mapped via CATEGORY_TITLES
  const rawKey = slug || id ||
    location.pathname.replace(/^\//, '').split('/').pop() || '';

  const title =
    CATEGORY_TITLES[rawKey] ||
    CATEGORY_TITLES[rawKey.toLowerCase()] ||
    rawKey.replace(/-/g, ' ').toUpperCase() ||
    'PRODUCTS';

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    const t = setTimeout(() => {
      setAllProducts(makeMockProducts(title, 28));
      setLoading(false);
    }, 350);
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

        {/* Filter / Sort bar */}
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

        {/* Product grid */}
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