import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useNewArrivals } from '../../../features/products/hooks/useProducts';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import './NewArrivalsSlider.scss';

const NewArrivalsSlider = ({
  title       = 'NEW ARRIVAL',
  viewAllLink = '/categories/new-arrivals',
  useHook     = useNewArrivals,
}) => {
  const { products, loading } = useHook();
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
      {/* Title — respects page gutter */}
      <div className="na__head">
        <h2 className="na__title">{title}</h2>
        <Link to={viewAllLink} className="na__view-all">View All</Link>
      </div>
      {/* <SectionHeader title="NEW ARRIVAL" viewAllLink="/category/sneakers" /> */}

      {/* Slider wrapper — full bleed */}
      <div className="na__slider-wrap">
        {/* Prev arrow */}
        <button ref={prevRef} className="na__nav na__nav--prev" aria-label="Previous">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 1 1 7 7 13" />
          </svg>
        </button>

        {/* Next arrow */}
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
          loop
          speed={650}
          spaceBetween={10}
          slidesPerView={2.7}
          centeredSlides={true}
          breakpoints={{
            768: {
              slidesPerView: 3.5,
              centeredSlides: true,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 5.4,
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
  const { id, slug, name, price, image, images, isNew = true } = product;
  const img1 = image || images?.[0] || '';
  const img2 = images?.[1] || null;
  
  // ✅ FIXED: Use singular '/product/' path and prioritize slug over id
  const href = `/product/${slug || id}`;

  return (
    <Link to={href} className="na-card" aria-label={name}>
      <div className="na-card__img-wrap">
        <img
          src={img1}
          alt={name}
          className={`na-card__img na-card__img--main${img2 ? ' has-hover' : ''}`}
          loading="lazy"
        />
        {img2 && (
          <img
            src={img2}
            alt={name}
            className="na-card__img na-card__img--alt"
            loading="lazy"
          />
        )}
        {isNew && <span className="na-card__badge">NEW</span>}
      </div>
      <div className="na-card__info">
        <p className="na-card__name">{name}</p>
        <p className="na-card__price">Tk. {Number(price).toLocaleString('en-BD')}</p>
      </div>
    </Link>
  );
};

export default NewArrivalsSlider;