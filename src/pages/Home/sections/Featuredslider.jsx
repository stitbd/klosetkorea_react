import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader';
import ProductCardNewArrivels from '../../../components/ui/ProductCard/ProductCardNewArrivels';
import { useNewArrivals } from '../../../features/products/hooks/useProducts';
import './FeaturedSlider.scss';

const FeaturedSlider = ({
  title      = 'FEATURED PRODUCTS',
  viewAllLink= '/categories/featured',
  useHook    = useNewArrivals,
}) => {
  const { products, loading } = useHook();

  // Skeleton slides while loading
  if (loading) {
    return (
      <section className="section-wrapper featured-slider">
        <Container fluid="xl">
          <SectionHeader title={title} viewAllLink={viewAllLink} />
          <div className="featured-slider__skeleton">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="featured-slider__skeleton-card">
                <div className="featured-slider__skeleton-img skeleton-pulse" />
                <div className="featured-slider__skeleton-body">
                  <div className="skeleton-pulse" style={{ height: 12, width: '85%', marginBottom: 6 }} />
                  <div className="skeleton-pulse" style={{ height: 12, width: '55%', marginBottom: 6 }} />
                  <div className="skeleton-pulse" style={{ height: 18, width: '40%', marginBottom: 8 }} />
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div className="skeleton-pulse" style={{ height: 30, flex: 1 }} />
                    <div className="skeleton-pulse" style={{ height: 30, flex: 1 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="section-wrapper featured-slider">
      <Container fluid="xl">
        <SectionHeader title={title} viewAllLink={viewAllLink} />

        <div className="featured-slider__wrap">
          {/* Prev button */}
          <button
            className="featured-slider__nav featured-slider__nav--prev"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Next button */}
          <button
            className="featured-slider__nav featured-slider__nav--next"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '.featured-slider__nav--prev',
              nextEl: '.featured-slider__nav--next',
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            speed={600}
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              576: { slidesPerView: 3, spaceBetween: 14 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              992: { slidesPerView: 4, spaceBetween: 16 },
            }}
            className="featured-slider__swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCardNewArrivels product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedSlider;