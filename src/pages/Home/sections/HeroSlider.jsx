import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroSlider.scss';

import banner1 from '../../../assets/images/banner.jpg';
import banner2 from '../../../assets/images/banner02.jpg';
import banner3 from '../../../assets/images/banner03.jpg';
import banner4 from '../../../assets/images/banner04.jpg';

const SLIDES = [
  {
    id: 1,
    tag: 'EID SPECIAL OFFER',
    title: 'এই ঈদে পাঞ্জাবি কিনলে ওয়ালেট ফ্রি',
    titleEn: 'Buy Panjabi, Get Wallet FREE',
    subtitle: 'Premium Eid al-Fitr 2026 Collection — Limited Stock',
    ctaLabel: 'Shop Now',
    ctaLink: '/category/eid-collection-26',
    accent: '#FF6503',
    image: banner1,
  },
  {
    id: 2,
    tag: 'NEW ARRIVALS',
    title: 'Ravenna Leather Collection',
    subtitle: 'Handcrafted genuine leather bags & wallets for the modern gentleman.',
    ctaLabel: 'Explore Now',
    ctaLink: '/category/leather',
    accent: '#FF6503',
    image: banner2,
    light: true,
  },
  {
    id: 3,
    tag: 'LUXURY SHIRTS',
    title: 'Royal Signature Series',
    subtitle: 'Premium fabric shirts — crafted for comfort and style.',
    ctaLabel: 'View Collection',
    ctaLink: '/category/luxury-shirt',
    accent: '#FF6503',
    image: banner3,
  },
  {
    id: 4,
    tag: 'NEW ARRIVALS',
    title: 'Ravenna Leather Collection',
    subtitle: 'Handcrafted genuine leather bags & wallets for the modern gentleman.',
    ctaLabel: 'Explore Now',
    ctaLink: '/category/leather',
    accent: '#FF6503',
    image: banner2,
    light: true,
  },
];

// ── Custom Prev Button ─────────────────────────────────────────────
const PrevButton = ({ onClick }) => (
  <button className="hero-btn hero-btn--prev" onClick={onClick} aria-label="Previous slide">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </button>
);

// ── Custom Next Button ─────────────────────────────────────────────
const NextButton = ({ onClick }) => (
  <button className="hero-btn hero-btn--next" onClick={onClick} aria-label="Next slide">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </button>
);

const HeroSlider = () => {
  const swiperRef                     = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => swiperRef.current?.swiper?.slidePrev();
  const handleNext = () => swiperRef.current?.swiper?.slideNext();

  return (
    <section className="hero-slider">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={false}
        navigation={false}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-slider__swiper"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`hero-slider__slide ${slide.light ? 'hero-slider__slide--light' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-slider__overlay" />

              <div className="hero-slider__content">

                <h2 className="hero-slider__title">{slide.title}</h2>

                {slide.titleEn && (
                  <p className="hero-slider__title-en">{slide.titleEn}</p>
                )}

                <p className="hero-slider__subtitle">{slide.subtitle}</p>

                <Link
                  to={slide.ctaLink}
                  className="hero-slider__cta"
                  style={{ background: slide.accent }}
                >
                  {slide.ctaLabel}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Custom nav buttons ── */}
      <PrevButton onClick={handlePrev} />
      <NextButton onClick={handleNext} />

      {/* ── Custom pagination dots ── */}
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dots__dot ${activeIndex === i ? 'hero-dots__dot--active' : ''}`}
            onClick={() => swiperRef.current?.swiper?.slideToLoop(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;