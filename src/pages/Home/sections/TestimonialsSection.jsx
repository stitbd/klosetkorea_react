// src/pages/Home/sections/TestimonialsSection.jsx
import React, { useRef, useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../../utils';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TestimonialsSection.scss';

const TestimonialsSection = ({
  title = "What Our Clients Say",
  subtitle = "Client Testimonials",
  testimonials = [],
}) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials?.length) return null;

  const MIN_LOOP_SLIDES = 7;
  let loopData = testimonials;
  while (loopData.length < MIN_LOOP_SLIDES) {
    loopData = [...loopData, ...testimonials];
  }

  const handlePrev = useCallback(() => swiperRef.current?.swiper?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.swiper?.slideNext(), []);

  return (
    <section className="testimonials-section">
      {/* Background decorative elements */}
      <div className="testimonials-bg" aria-hidden="true">
        <div className="testimonials-bg__orb testimonials-bg__orb--1" />
        <div className="testimonials-bg__orb testimonials-bg__orb--2" />
        <div className="testimonials-bg__grain" />
      </div>

      <Container fluid="xl" className="testimonials-container">

        {/* Header */}
        <div className="gallery-header">
          <span className="gallery-header__line" />
          <div className="gallery-header__text">
            <span className="gallery-header__subtitle">{subtitle}</span>
            <h2 className="gallery-header__title">{title}</h2>
          </div>
          <span className="gallery-header__line" />
        </div>

        {/* Slider */}
        <div className="testimonials-track">

          {/* Navigation Buttons */}
          <button
            className="testimonials-nav testimonials-nav--prev"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="testimonials-nav testimonials-nav--next"
            onClick={handleNext}
            aria-label="Next testimonial"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay, Pagination]}
            loop
            loopAdditionalSlides={3}
            centeredSlides
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640:  { slidesPerView: 1.2, spaceBetween: 24, centeredSlides: true },
              768:  { slidesPerView: 2,   spaceBetween: 28, centeredSlides: true },
              1100: { slidesPerView: 2.5, spaceBetween: 32, centeredSlides: true },
            }}
            autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: '.testimonials-pagination' }}
            speed={800}
            grabCursor
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonials-swiper"
          >
            {loopData.map((t, idx) => (
              <SwiperSlide key={`${t.id}-${idx}`}>
                {({ isActive }) => (
                  <TestimonialCard testimonial={t} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="testimonials-pagination" role="tablist" aria-label="Testimonial slides" />
        </div>

      </Container>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const StarRating = ({ rating }) => (
  <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`} role="img">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`star-icon ${i < rating ? 'star-icon--filled' : ''}`}
        viewBox="0 0 24 24"
        fill={i < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const QuoteIcon = () => (
  <svg className="testimonial-card__quote-icon" viewBox="0 0 40 30" fill="currentColor" aria-hidden="true">
    <path d="M0 30V18.182C0 7.727 6.545 2.182 19.636 0l1.819 3.636C14.727 5.09 11.182 8.364 10.364 13.636H18V30H0zm22 0V18.182C22 7.727 28.545 2.182 41.636 0l1.818 3.636C36.727 5.09 33.182 8.364 32.364 13.636H40V30H22z" />
  </svg>
);

const TestimonialCard = ({ testimonial, isActive }) => {
  const { name, designation, review, image, rating = 5 } = testimonial;

  const displayAvatar = image ? `${BASE_IMAGE_URL}${image}` : null;
  const displayRating = Number(rating) || 5;

  return (
    <article className={`testimonial-card ${isActive ? 'testimonial-card--active' : ''}`}>
      <div className="testimonial-card__inner">

        {/* Quote watermark */}
        <QuoteIcon />

        {/* Stars */}
        <StarRating rating={displayRating} />

        {/* Review text */}
        <blockquote className="testimonial-card__text">
          {review}
        </blockquote>

        {/* Divider */}
        <div className="testimonial-card__divider" aria-hidden="true" />

        {/* Author */}
        <footer className="testimonial-card__author">
          <div className="testimonial-card__avatar-wrap">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={name}
                className="testimonial-card__avatar"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="testimonial-card__avatar-fallback"
              aria-hidden="true"
              style={{ display: displayAvatar ? 'none' : 'flex' }}
            >
              {name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="testimonial-card__avatar-ring" aria-hidden="true" />
          </div>
          <div className="testimonial-card__meta">
            <cite className="testimonial-card__name">{name}</cite>
            <span className="testimonial-card__role">{designation}</span>
          </div>
        </footer>

      </div>
    </article>
  );
};

export default TestimonialsSection;