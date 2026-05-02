// src/pages/Home/sections/TestimonialsSection.jsx
import React, { useRef, useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TestimonialsSection.scss';

// ── Static Avatar Imports (Vite compatible) ──
import avatar01 from '../../../assets/images/testimonials/01.jpg';
import avatar02 from '../../../assets/images/testimonials/02.jpg';
import avatar03 from '../../../assets/images/testimonials/03.jpg';
import avatar04 from '../../../assets/images/testimonials/04.jpg';
import avatar05 from '../../../assets/images/testimonials/05.jpg';
import avatar06 from '../../../assets/images/testimonials/06.jpg';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Fashion Blogger",
    company: "Vogue Arabia",
    text: "The attention to detail and premium quality exceeded my expectations. Truly luxury redefined for the modern connoisseur.",
    avatar: avatar01,
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Style Curator",
    company: "Harper's Bazaar",
    text: "Every piece tells a story. The craftsmanship is unparalleled and the service is exceptional — exactly what luxury should feel like.",
    avatar: avatar02,
    rating: 5,
  },
  {
    id: 3,
    name: "Fatima Rahman",
    role: "Luxury Collector",
    company: "Independent",
    text: "From selection to delivery, everything was seamless. This is what a premium experience truly feels like at every touchpoint.",
    avatar: avatar03,
    rating: 5,
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Interior Designer",
    company: "Studio Wilson",
    text: "Absolutely stunning collection. The quality speaks for itself and the customer service is top-notch — I keep coming back.",
    avatar: avatar04,
    rating: 5,
  },
  {
    id: 5,
    name: "David Park",
    role: "Luxury Enthusiast",
    company: "Park & Associates",
    text: "Every purchase feels like an investment in timeless elegance. The curation is impeccable. Highly recommended without reservation.",
    avatar: avatar05,
    rating: 5,
  },
  {
    id: 6,
    name: "Layla Hassan",
    role: "Fashion Editor",
    company: "Elle Middle East",
    text: "The perfect blend of tradition and modernity. Each piece is a work of art that deserves a permanent place in one's wardrobe.",
    avatar: avatar06,
    rating: 5,
  },
];

const TestimonialsSection = ({ title = "What Our Clients Say", subtitle = "Client Testimonials", testimonials = [] }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const testData = testimonials.length > 0 ? testimonials : TESTIMONIALS;

  if (!testData?.length) return null;

  const MIN_LOOP_SLIDES = 7;
  let loopData = testData;
  while (loopData.length < MIN_LOOP_SLIDES) {
    loopData = [...loopData, ...testData];
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

        {/* ── Header ── */}
        <header className="testimonials-header">
          <div className="testimonials-header__eyebrow">
            <span className="testimonials-header__rule" />
            <span className="testimonials-header__subtitle">{subtitle}</span>
            <span className="testimonials-header__rule" />
          </div>
          <h2 className="testimonials-header__title">{title}</h2>
          <p className="testimonials-header__desc">
            Trusted by discerning clients who value craftsmanship above all else.
          </p>
        </header>

        {/* ── Slider ── */}
        <div className="testimonials-track">

          {/* Navigation */}
          <button
            className="testimonials-nav testimonials-nav--prev"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="testimonials-nav testimonials-nav--next"
            onClick={handleNext}
            aria-label="Next testimonial"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

          {/* Custom pagination dots */}
          <div className="testimonials-pagination" role="tablist" aria-label="Testimonial slides" />
        </div>

        {/* ── Trust Bar ── */}
        {/* <div className="testimonials-trust" aria-label="Trust indicators">
          <div className="testimonials-trust__item">
            <span className="testimonials-trust__number">2,400+</span>
            <span className="testimonials-trust__label">Happy Clients</span>
          </div>
          <div className="testimonials-trust__divider" aria-hidden="true" />
          <div className="testimonials-trust__item">
            <span className="testimonials-trust__number">4.9</span>
            <span className="testimonials-trust__label">Average Rating</span>
          </div>
          <div className="testimonials-trust__divider" aria-hidden="true" />
          <div className="testimonials-trust__item">
            <span className="testimonials-trust__number">98%</span>
            <span className="testimonials-trust__label">Return Rate</span>
          </div>
        </div> */}

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
  const { name, role, company, text, avatar, rating = 5 } = testimonial;

  return (
    <article className={`testimonial-card ${isActive ? 'testimonial-card--active' : ''}`}>
      <div className="testimonial-card__inner">

        {/* Quote watermark */}
        <QuoteIcon />

        {/* Stars */}
        <StarRating rating={rating} />

        {/* Text */}
        <blockquote className="testimonial-card__text">
          {text}
        </blockquote>

        {/* Divider */}
        <div className="testimonial-card__divider" aria-hidden="true" />

        {/* Author */}
        <footer className="testimonial-card__author">
          <div className="testimonial-card__avatar-wrap">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="testimonial-card__avatar"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="testimonial-card__avatar-fallback" aria-hidden="true">
                {name.charAt(0)}
              </div>
            )}
            <div className="testimonial-card__avatar-ring" aria-hidden="true" />
          </div>
          <div className="testimonial-card__meta">
            <cite className="testimonial-card__name">{name}</cite>
            <span className="testimonial-card__role">
              {role}{company ? ` · ${company}` : ''}
            </span>
          </div>
        </footer>

      </div>
    </article>
  );
};

export default TestimonialsSection;