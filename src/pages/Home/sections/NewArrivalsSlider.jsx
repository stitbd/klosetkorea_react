import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../../utils';
import apiClient from '../../../services/apiClient';
import { getPrefetchedProduct } from '../../../utils/productPrefetchCache';
import 'swiper/css';
import './NewArrivalsSlider.scss';

const NewArrivalsSlider = ({
  title       = 'NEW ARRIVAL',
  viewAllLink = '/new-arrivals',
  products    = [],
  loading     = false,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (loading) {
    return (
      <section className="na">
        <div className="na__head">
          <h2 className="na__title">{title}</h2>
          <Link to={viewAllLink} className="na__view-all">View All</Link>
        </div>
        <div className="na__skeleton-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="na__skeleton-card">
              <div className="na__skeleton-img sk-pulse" />
              <div className="na__skeleton-body">
                <div className="sk-pulse" style={{ height: 12, width: '70%', marginBottom: 8 }} />
                <div className="sk-pulse" style={{ height: 16, width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="na">
      <div className="na__head">
        <h2 className="na__title">{title}</h2>
        <Link to={viewAllLink} className="na__view-all">View All</Link>
      </div>

      <div className="na__slider-wrap">
        <button ref={prevRef} className="na__nav na__nav--prev" aria-label="Previous">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 1 1 7 7 13" />
          </svg>
        </button>

        <button ref={nextRef} className="na__nav na__nav--next" aria-label="Next">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 1 7 7 1 13" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={products.length > 2}
          speed={650}
          spaceBetween={10}
          slidesPerView={2.5}
          centeredSlides={true}
          breakpoints={{
            768: {
              // slidesPerView: 3.4,
              slidesPerView: 3.4,
              centeredSlides: true,
              spaceBetween: 10,
            },
            1280: {
              // slidesPerView: 5.4,
              slidesPerView: 5,
              centeredSlides: true,
              spaceBetween: 10,
            },
          }}
          className="na__swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <NaCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

/* ── Card component ──────────────────────────────────────────────────────── */
const NaCard = ({ product }) => {
  const {
    id,
    name,
    new_price,
    image,
    images,
  } = product;

  const isPreOrder = !!product.pre_order_status;

  // ── Resolve slug from any possible field the API might return ──
  const slug =
    product.slug ||
    product.product_slug ||
    product.product_code ||
    null;

  // ── Resolve images ──
  const img1 = image ? BASE_IMAGE_URL + image : (images?.[0] || PLACEHOLDER_IMG);
  const img2 = images?.[1] ? BASE_IMAGE_URL + images[1] : null;

  const [isStockOut, setIsStockOut] = useState(false);

  useEffect(() => {
    if (!slug || isPreOrder) return;
  
    const checkStock = (body) => {
      if (!body?.success) return;
      const isProductPreOrder = !!body.product_details?.pre_order_status;
      if (isProductPreOrder) { setIsStockOut(false); return; }
      const variants = body.variants || [];
      if (variants.length === 0) { setIsStockOut(true); return; }
      const totalStock = variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);
      setIsStockOut(totalStock <= 0);
    };
  
    const cached = getPrefetchedProduct(slug);
    if (cached) { checkStock(cached); return; }
  
    apiClient.get(`/product/${slug}`)
      .then(checkStock)
      .catch(() => {});
  }, [slug, isPreOrder]);

  // ── If no slug found, don't render a broken link ──
  if (!slug) return null;

  const href = `/product/${slug}`;

  return (
    <Link to={href} className="na-card" aria-label={name}>
      <div className="na-card__img-wrap">
        <img
          src={img1}
          alt={name}
          className={`na-card__img na-card__img--main${img2 ? ' has-hover' : ''}`}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
        />
        {img2 && (
          <img
            src={img2}
            alt={name}
            className="na-card__img na-card__img--alt"
            loading="lazy"
            onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
          />
        )}
        {isPreOrder ? (
          <span className="na-card__badge na-card__badge--preorder">PRE ORDER</span>
        ) : (
          <>
            <span className="na-card__badge">NEW</span>
            {isStockOut && (
              <span className="na-card__badge na-card__badge--stockout">Stock Out</span>
            )}
          </>
        )}
      </div>
      <div className="na-card__info">
        <p className="na-card__name">{name}</p>
        <p className="na-card__price">Tk. {Number(new_price).toLocaleString('en-BD')}</p>
      </div>
    </Link>
  );
};

export default NewArrivalsSlider;