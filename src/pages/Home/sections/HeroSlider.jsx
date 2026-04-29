import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './HeroSlider.scss';

// ── Custom Prev Button ────────────────────────────────────────────
const PrevButton = memo(({ onClick }) => (
  <button
    className="hero-btn hero-btn--prev"
    onClick={onClick}
    aria-label="Previous slide"
    type="button"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
));
PrevButton.displayName = 'PrevButton';

// ── Custom Next Button ────────────────────────────────────────────
const NextButton = memo(({ onClick }) => (
  <button
    className="hero-btn hero-btn--next"
    onClick={onClick}
    aria-label="Next slide"
    type="button"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
));
NextButton.displayName = 'NextButton';

// ── Helper: Resolve image URL ─────────────────────────────────────
const getImageUrl = (image, fallback = '/images/hero-fallback.jpg') => {
  if (!image) return fallback;
  if (image.startsWith('http')) return image;
  return `https://admin-klosetkorea.stitbd.app/${image}`;
};

// ── Helper: Should render CTA ─────────────────────────────────────
const shouldRenderCTA = (slide) =>
  !!(slide?.btn_text?.trim() && slide?.link?.trim());

// ── Helper: Should render description ────────────────────────────
const shouldRenderDescription = (slide) =>
  !!(slide?.description?.trim());

// ── Main Component ────────────────────────────────────────────────
const HeroSlider = ({ banners = [], autoPlayDelay = 5000 }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  const handleDotClick = useCallback((index) => {
    swiperRef.current?.swiper?.slideToLoop(index);
  }, []);

  useEffect(() => {
    if (banners?.length > 0) setIsLoaded(true);
  }, [banners]);

  useEffect(() => {
    return () => {
      swiperRef.current?.swiper?.destroy?.(true, true);
    };
  }, []);

  if (!banners || banners.length === 0) return null;

  return (
    <section
      className="hero-slider"
      aria-label="Featured promotions"
      role="region"
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: autoPlayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={800}
        pagination={false}
        navigation={false}
        onSlideChange={(swiper) => {
          setPrevIndex(activeIndex);
          setActiveIndex(swiper.realIndex);
        }}
        className="hero-slider__swiper"
        aria-live="polite"
      >
        {banners.map((slide, index) => {
          const imageUrl = getImageUrl(slide.image);
          const isActive = index === activeIndex;

          return (
            <SwiperSlide key={slide.id || index}>
              <article
                className={`hero-slider__slide${slide.light ? ' hero-slider__slide--light' : ''}${isActive ? ' is-active' : ''}`}
                aria-hidden={!isActive}
              >
                {/* Zoom layer */}
                <div
                  className={`hero-slider__zoom${isActive ? ' is-zooming' : ''}`}
                  style={{ backgroundImage: `url(${imageUrl})` }}
                  aria-hidden="true"
                />

                {/* Overlay */}
                <div className="hero-slider__overlay" aria-hidden="true" />

                {/* Content */}
                <div className={`hero-slider__content${isActive ? ' is-visible' : ''}`}>
                  {slide.title && (
                    <h2 className="hero-slider__title">{slide.title}</h2>
                  )}

                  {slide.titleEn && (
                    <p className="hero-slider__title-en">{slide.titleEn}</p>
                  )}

                  {/* Description — only if exists in API */}
                  {shouldRenderDescription(slide) && (
                    <p className="hero-slider__subtitle">{slide.description}</p>
                  )}

                  {/* CTA Button — only if btn_text AND link exist in API */}
                  {shouldRenderCTA(slide) && (
                    <Link
                      to={slide.link}
                      className="hero-slider__cta"
                      style={{ '--cta-bg': slide.accent || '#FF6503' }}
                      onClick={() => {
                        if (typeof window.gtag === 'function') {
                          window.gtag('event', 'hero_cta_click', {
                            event_category: 'engagement',
                            event_label: slide.title || 'Unknown',
                          });
                        }
                      }}
                    >
                      <span>{slide.btn_text}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  )}
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Nav Buttons */}
      <PrevButton onClick={handlePrev} />
      <NextButton onClick={handleNext} />

      {/* Pagination Dots */}
      <div className="hero-dots" role="tablist" aria-label="Slide navigation">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`hero-dots__dot${activeIndex === i ? ' hero-dots__dot--active' : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={activeIndex === i}
            role="tab"
            type="button"
          />
        ))}
      </div>

      {/* Initial loader */}
      {!isLoaded && (
        <div className="hero-slider__loader" aria-live="polite">
          <span className="sr-only">Loading slider...</span>
        </div>
      )}
    </section>
  );
};

export default memo(HeroSlider);