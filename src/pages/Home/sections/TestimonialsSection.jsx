// src/pages/Home/sections/TestimonialsSection.jsx
import React, { useRef, useCallback } from 'react'; 
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './TestimonialsSection.scss';

// ── Static Avatar Imports (Vite compatible) ──
import avatar01 from '../../../assets/images/testimonials/01.jpg';
import avatar02 from '../../../assets/images/testimonials/02.jpg';
import avatar03 from '../../../assets/images/testimonials/03.jpg';
import avatar04 from '../../../assets/images/testimonials/04.jpg';
import avatar05 from '../../../assets/images/testimonials/05.jpg';
import avatar06 from '../../../assets/images/testimonials/06.jpg';

const TESTIMONIALS = [
  { id: 1, name: "Sarah Ahmed",    role: "Fashion Blogger",    text: "The attention to detail and premium quality exceeded my expectations. Truly luxury redefined.", avatar: avatar01, rating: 5 },
  { id: 2, name: "Michael Chen",   role: "Style Curator",      text: "Every piece tells a story. The craftsmanship is unparalleled and the service is exceptional.", avatar: avatar02, rating: 5 },
  { id: 3, name: "Fatima Rahman",  role: "Luxury Collector",   text: "From selection to delivery, everything was seamless. This is what premium experience feels like.", avatar: avatar03, rating: 5 },
  { id: 4, name: "Emma Wilson",    role: "Interior Designer",  text: "Absolutely stunning collection. The quality speaks for itself and the customer service is top-notch.", avatar: avatar04, rating: 5 },
  { id: 5, name: "David Park",     role: "Luxury Enthusiast",  text: "Every purchase feels like an investment in timeless elegance. Highly recommended!", avatar: avatar05, rating: 5 },
  { id: 6, name: "Layla Hassan",   role: "Fashion Editor",     text: "The perfect blend of tradition and modernity. Each piece is a work of art.", avatar: avatar06, rating: 5 },
];

const TestimonialsSection = ({ title, subtitle, testimonials = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const testData = testimonials.length > 0 ? testimonials : TESTIMONIALS;

  if (!testData?.length) return null;

  // Swiper needs at least (slidesPerView * 2) + 1 real slides for a truly
  // seamless loop. If we have fewer, duplicate until we have enough.
  const MIN_LOOP_SLIDES = 5; // 2 visible + buffer
  let loopData = testData;
  while (loopData.length < MIN_LOOP_SLIDES) {
    loopData = [...loopData, ...testData];
  }

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  return (
    <section className="testimonials-section section-wrapper">
      <Container fluid="xl">

        {/* ── Header ── */}
        <div className="testimonials-header">
          <span className="testimonials-header__line" />
          <div className="testimonials-header__text">
            <span className="testimonials-header__subtitle">{subtitle}</span>
            <h2 className="testimonials-header__title">{title}</h2>
          </div>
          <span className="testimonials-header__line" />
        </div>

        {/* ── Slider with Navigation ── */}
        <div className="testimonials-slider-wrap">

          {/* Prev Button - REPLACED */}
          <button
            className="testimonials-nav testimonials-nav--prev"  // ← Removed ref={prevRef}
            onClick={handlePrev}  // ← NEW: Direct onClick handler
            aria-label="Previous testimonial"
            type="button"  // ← NEW: Add for accessibility
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2.2"  // ← UPDATED: Match HeroSlider stroke
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />  // ← UPDATED: Arrow direction for prev
            </svg>
          </button>

          {/* Next Button - REPLACED */}
          <button
            className="testimonials-nav testimonials-nav--next"  // ← Removed ref={nextRef}
            onClick={handleNext}  // ← NEW: Direct onClick handler
            aria-label="Next testimonial"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />  // ← UPDATED: Arrow direction for next
            </svg>
          </button>

          <Swiper
            ref={swiperRef}  // ← NEW: Add this line to connect swiperRef
            modules={[Navigation, Autoplay]}  // ← Keep Navigation module (optional, but harmless)
            loop
            loopAdditionalSlides={2}
            centeredSlides
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 28, centeredSlides: false },
            }}
            // ── Navigation (attach after init so refs are populated) ──
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            // ── Autoplay ──
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={700}
            grabCursor
            className="testimonials-swiper"
          >
            {loopData.map((t, idx) => (
              // Use idx as key (not t.id) because loopData may contain duplicates
              <SwiperSlide key={`${t.id}-${idx}`}>
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Decorative Quote Marks ── */}
        <span className="testimonials-quote testimonials-quote--start" aria-hidden="true">"</span>
        <span className="testimonials-quote testimonials-quote--end"   aria-hidden="true">"</span>

      </Container>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <svg
    width="15" height="15" viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TestimonialCard = ({ testimonial }) => {
  const { name, role, text, avatar, rating = 5 } = testimonial;

  return (
    <article className="testimonial-card">
      <div className="testimonial-card__content">

        {/* Rating */}
        <div
          className="testimonial-card__rating"
          aria-label={`${rating} out of 5 stars`}
          role="img"
        >
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < rating} />
          ))}
        </div>

        {/* Quote Text */}
        <blockquote className="testimonial-card__text">
          &#8220;{text}&#8221;
        </blockquote>

        {/* Author */}
        <footer className="testimonial-card__author">
          {avatar && (
            <img
              src={avatar}
              alt={name}
              className="testimonial-card__avatar"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
          <div className="testimonial-card__meta">
            <cite className="testimonial-card__name">{name}</cite>
            {role && <span className="testimonial-card__role">{role}</span>}
          </div>
        </footer>

      </div>
    </article>
  );
};

export default TestimonialsSection;