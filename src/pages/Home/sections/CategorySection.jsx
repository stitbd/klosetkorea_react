// src/pages/Home/sections/CategorySection.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ProductCard from '../../../components/ui/ProductCard/ProductCard';
import 'swiper/css';

const CategorySection = ({ title, catSlug, products = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!products.length) return null;

  return (
    <section className="section-wrapper" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <Container fluid="xl">
        {/* ── Section Header ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            padding: '0 0 14px',
            borderBottom: '2px solid #ebebeb',
            marginBottom: '1.25rem',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(20px, 4.5vw, 30px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#000',
              margin: 0,
              lineHeight: 1,
            }}
          >
            {title}
          </h2>
          <Link
            to={`/categories/${catSlug}`}
            style={{
              background: '#D4AF37',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.25rem 0.75rem',
              borderRadius: 3,
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}
          >
            View All
          </Link>
        </div>

        {/* ── Slider ── */}
        <div style={{ position: 'relative' }}>
          {/* Prev Button */}
          <button
            ref={prevRef}
            aria-label="Previous"
            style={{
              position: 'absolute',
              top: '40%',
              left: -16,
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid #ccc',
              borderRadius: '50%',
              cursor: 'pointer',
              color: '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,.12)',
              transition: 'background 0.18s, color 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
              e.currentTarget.style.color = '#333';
            }}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 1 1 7 7 13" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            ref={nextRef}
            aria-label="Next"
            style={{
              position: 'absolute',
              top: '40%',
              right: -16,
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid #ccc',
              borderRadius: '50%',
              cursor: 'pointer',
              color: '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,.12)',
              transition: 'background 0.18s, color 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
              e.currentTarget.style.color = '#333';
            }}
          >
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
            autoplay={{
              delay: 3000 + Math.random() * 1000, // slightly random per section so they're out of sync
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={products.length > 4}
            speed={650}
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              576: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 16 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;