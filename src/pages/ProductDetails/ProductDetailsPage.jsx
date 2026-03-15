import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { productService } from '../../features/products/services/productService';
import useCartStore from '../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../utils';
import './ProductDetailsPage.scss';

import productImgAsset from '../../assets/images/products/product.jpg';
const localProductImg = productImgAsset || PLACEHOLDER_IMG;

// ─── Mock related products ────────────────────────────────────────
const mockRelated = Array.from({ length: 6 }, (_, i) => ({
  id:            `related-${i + 1}`,
  name:          `Aristocrat Edition Panjabi | Style ${i + 1}`,
  slug:          `aristocrat-edition-panjabi-style-${i + 1}`,
  sku:           `SKU-000284${i}`,
  price:         2550,
  originalPrice: 3200,
  image:         localProductImg,
  inStock:       true,
}));

const ProductDetailsPage = () => {
  const { slug }                      = useParams();
  const [product, setProduct]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [qty, setQty]                 = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(mockRelated);
  const addToCart                     = useCartStore((s) => s.addToCart);

  // Mock product images (multiple angles)
  const getImages = (img) => [img, img, img, img, img].map((src, i) => src || localProductImg);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    setSelectedSize(null);

    productService.getProductBySlug(slug)
      .then((res) => {
        const data = res?.data ?? res;
        setProduct({ ...data, image: data?.image || localProductImg });
      })
      .catch(() => {
        setProduct({
          id: slug, name: 'Elonis Royal Signature – Eid Edition | Dark Chocolate',
          slug, price: 2990, originalPrice: 3500,
          image: localProductImg, sku: 'SKU-0002856',
          description: 'প্রিমিয়াম Luxury Katan ফ্যারিকে তৈরি এই Eid Edition পাঞ্জাবি আপনার মুকে দেবে রাজকীয় ও এলিগ্যান্ট উপস্থিতি।',
          brand: 'Elonis', inStock: true, badge: 'New', category: 'Panjabi',
          sizes: ['M', 'L', 'XL'],
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const discountPct = product?.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const images = product ? getImages(product.image) : [localProductImg];

  if (loading) return (
    <div className="pdp-loader">
      <div className="pdp-spinner" />
    </div>
  );

  if (!product) return (
    <Container className="py-5 text-center">
      <h4>Product not found.</h4>
      <Link to="/" className="pdp-btn pdp-btn--buy mt-3">← Back to Home</Link>
    </Container>
  );

  return (
    <main className="pdp">
      <Container fluid="xl" className="py-3">

        {/* ── Breadcrumb + Back ── */}
        <div className="pdp__topbar d-flex align-items-center justify-content-between mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pdp__breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>
          <Link to="/" className="pdp__back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back To Home
          </Link>
        </div>

        <Row className="g-4">

          {/* ── Left: Image Gallery ── */}
          <Col xs={12} md={5}>
            <div className="pdp__gallery">
              {/* Main image swiper */}
              <div className="pdp__main-swiper-wrap">
                <button className="pdp__nav-btn pdp__nav-btn--prev pdp__nav-btn--main-prev" aria-label="Previous image">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="pdp__nav-btn pdp__nav-btn--next pdp__nav-btn--main-next" aria-label="Next image">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <Swiper
                  modules={[Navigation, Thumbs, FreeMode]}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  navigation={{ prevEl: '.pdp__nav-btn--main-prev', nextEl: '.pdp__nav-btn--main-next' }}
                  loop
                  className="pdp__main-swiper"
                >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="pdp__main-img-wrap">
                      {product.badge && <span className="pdp__badge">{product.badge}</span>}
                      <img
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        className="pdp__main-img"
                        onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                </Swiper>
              </div>

              {/* Thumbnails swiper */}
              <div className="pdp__thumb-swiper-wrap">
                <button className="pdp__nav-btn pdp__nav-btn--sm pdp__nav-btn--thumb-prev" aria-label="Previous">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="pdp__nav-btn pdp__nav-btn--sm pdp__nav-btn--thumb-next" aria-label="Next">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <Swiper
                  modules={[FreeMode, Navigation, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  navigation={{ prevEl: '.pdp__nav-btn--thumb-prev', nextEl: '.pdp__nav-btn--thumb-next' }}
                  spaceBetween={8}
                  slidesPerView={5}
                  freeMode
                  watchSlidesProgress
                  className="pdp__thumb-swiper"
                >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="pdp__thumb-wrap">
                      <img
                        src={img}
                        alt={`thumb ${i + 1}`}
                        className="pdp__thumb-img"
                        onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                </Swiper>
              </div>

              {/* Product description below image */}
              <div className="pdp__desc-card mt-3">
                <h5 className="pdp__desc-title">Product Description</h5>
                <p className="pdp__desc-name">{product.name}</p>
                {product.description && (
                  <p className="pdp__desc-text">{product.description}</p>
                )}
                {product.sizes && (
                  <p className="pdp__desc-text">
                    🔖 Size: {product.sizes.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </Col>

          {/* ── Right: Product Info ── */}
          <Col xs={12} md={7}>
            <div className="pdp__info">

              {/* Name */}
              <h1 className="pdp__name">{product.name}</h1>

              {/* SKU + Share icons */}
              <div className="pdp__sku-share">
                {product.sku && <p className="pdp__sku">SKU: {product.sku}</p>}
                <div className="pdp__share">
                  {/* Facebook */}
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank" rel="noreferrer" className="pdp__share-btn pdp__share-btn--fb" aria-label="Share on Facebook">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  </a>
                  {/* X/Twitter */}
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                    target="_blank" rel="noreferrer" className="pdp__share-btn pdp__share-btn--tw" aria-label="Share on Twitter">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                    target="_blank" rel="noreferrer" className="pdp__share-btn pdp__share-btn--li" aria-label="Share on LinkedIn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  {/* WhatsApp */}
                  <a href={`https://wa.me/?text=${encodeURIComponent(product.name + ' ' + window.location.href)}`}
                    target="_blank" rel="noreferrer" className="pdp__share-btn pdp__share-btn--wa" aria-label="Share on WhatsApp">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.926l6.264-1.643A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.52-5.17-1.426l-.371-.22-3.818 1.002 1.017-3.722-.241-.383A9.952 9.952 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                  </a>
                  {/* Email */}
                  <a href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${window.location.href}`}
                    className="pdp__share-btn pdp__share-btn--em" aria-label="Share via Email">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Price */}
              <div className="pdp__price-row">
                <span className="pdp__price-label">PRICE:</span>
                <span className="pdp__price-current">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="pdp__price-original">{formatPrice(product.originalPrice)}</span>
                )}
                {discountPct && (
                  <span className="pdp__price-discount">{discountPct}% OFF</span>
                )}
              </div>

              {/* Size selector */}
              {product.sizes?.length > 0 && (
                <div className="pdp__size-row">
                  <span className="pdp__size-label">
                    Select Your Size: <strong>{selectedSize || ''}</strong>
                  </span>
                  <div className="pdp__sizes">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        className={`pdp__size-btn ${selectedSize === s ? 'pdp__size-btn--active' : ''}`}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brand */}
              {product.brand && (
                <div className="pdp__field-row">
                  <span className="pdp__field-label">BRAND:</span>
                  <span className="pdp__field-value">{product.brand}</span>
                </div>
              )}

              {/* Status */}
              <div className="pdp__field-row">
                <span className="pdp__field-label">STATUS:</span>
                {product.inStock
                  ? <span className="pdp__status pdp__status--in">STOCK IN</span>
                  : <span className="pdp__status pdp__status--out">STOCK OUT</span>
                }
              </div>

              {/* Short description */}
              {product.description && (
                <p className="pdp__short-desc">{product.description}</p>
              )}

              {/* Bullet features */}
              {product.sizes && (
                <div className="pdp__features">
                  <p>🔖 সুখ টাচ | রিচ লুক | কমফোর্টেবল ফিট</p>
                  <p>🔖 Size: {product.sizes.join(', ')}</p>
                  <p>এই ঈদে থাকুন Royal, থাকুন Signature!</p>
                </div>
              )}

              {/* Quantity */}
              <div className="pdp__qty-row">
                <span className="pdp__qty-label">QUANTITY</span>
                <div className="pdp__qty-ctrl">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
              </div>

              {/* Primary actions */}
              <div className="pdp__actions">
                <button
                  className="pdp__btn pdp__btn--cart"
                  onClick={() => addToCart(product, qty)}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
                <Link to="/checkout" className="pdp__btn pdp__btn--buy">
                  Buy Now
                </Link>
              </div>

              {/* Secondary actions */}
              <div className="pdp__secondary-actions">
                <a href={`tel:+8801886899103`} className="pdp__action-btn pdp__action-btn--call">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 6.18 19.79 19.79 0 016.07 2.18 2 2 0 018 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L12.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.16v2.76z"/>
                  </svg>
                  Call Now
                </a>

                <a href={`https://wa.me/8801886899103?text=${encodeURIComponent('I want to order: ' + product.name)}`}
                  target="_blank" rel="noreferrer" className="pdp__action-btn pdp__action-btn--whatsapp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.926l6.264-1.643A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.52-5.17-1.426l-.371-.22-3.818 1.002 1.017-3.722-.241-.383A9.952 9.952 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                  হোয়াটসঅ্যাপ অর্ডার
                </a>

                <a href="https://m.me/your-page" target="_blank" rel="noreferrer"
                  className="pdp__action-btn pdp__action-btn--messenger">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.145 0 11.5c0 3.564 1.741 6.746 4.472 8.845V24l4.086-2.242c1.09.301 2.246.465 3.442.465C19.627 22.223 24 17.077 24 10.722 24 5.148 18.627 0 12 0zm1.19 14.963l-3.055-3.26-5.963 3.26L10.732 8.5l3.133 3.26L19.752 8.5l-6.562 6.463z"/>
                  </svg>
                  ম্যাসেঞ্জার অর্ডার
                </a>
              </div>

            </div>
          </Col>
        </Row>

        {/* ── More Products ── */}
        <div className="pdp__more-section mt-5">
          <h2 className="pdp__more-title">MORE PRODUCTS</h2>
          <div className="pdp__more-swiper-wrap">
                <button className="pdp__nav-btn pdp__nav-btn--more pdp__nav-btn--more-prev" aria-label="Previous products">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="pdp__nav-btn pdp__nav-btn--more pdp__nav-btn--more-next" aria-label="Next products">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: '.pdp__nav-btn--more-prev', nextEl: '.pdp__nav-btn--more-next' }}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 4 },
              }}
              className="pdp__more-swiper"
            >
              {relatedProducts.map((rp) => (
                <SwiperSlide key={rp.id}>
                  <div className="pdp__related-card">
                    <Link to={`/product/${rp.slug}`}>
                      <div className="pdp__related-img-wrap">
                        <img
                          src={rp.image}
                          alt={rp.name}
                          className="pdp__related-img"
                          onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                        />
                      </div>
                    </Link>
                    <div className="pdp__related-body">
                      <Link to={`/product/${rp.slug}`} className="pdp__related-name">
                        {rp.name}
                      </Link>
                      {rp.sku && <p className="pdp__related-sku">SKU : {rp.sku}</p>}
                      <p className="pdp__related-price">{formatPrice(rp.price)}</p>
                      <div className="pdp__related-actions">
                        <button
                          className="pdp__related-btn pdp__related-btn--cart"
                          onClick={() => addToCart(rp, 1)}
                        >
                          Add To Cart
                        </button>
                        <Link to={`/product/${rp.slug}`} className="pdp__related-btn pdp__related-btn--buy">
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </Container>
    </main>
  );
};

export default ProductDetailsPage;