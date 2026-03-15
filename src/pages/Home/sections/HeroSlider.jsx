import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroSlider.scss';

const SLIDES = [
  {
    id: 1,
    bg: 'linear-gradient(120deg, #f5e6d3 0%, #e8d5c4 100%)',
    tag: 'EID SPECIAL OFFER',
    title: 'এই ঈদে পাঞ্জাবি কিনলে ওয়ালেট ফ্রি',
    titleEn: 'Buy Panjabi, Get Wallet FREE',
    subtitle: 'Premium Eid al-Fitr 2026 Collection — Limited Stock',
    ctaLabel: 'Shop Now',
    ctaLink: '/category/eid-collection-26',
    accent: '#c8102e',
    imgUrl: 'https://placehold.co/700x500/f0e8e0/c8102e?text=Eid+Collection',
  },
  {
    id: 2,
    bg: 'linear-gradient(120deg, #1a1a2e 0%, #16213e 100%)',
    tag: 'NEW ARRIVALS',
    title: 'Ravenna Leather Collection',
    subtitle: 'Handcrafted genuine leather bags & wallets for the modern gentleman.',
    ctaLabel: 'Explore Now',
    ctaLink: '/category/leather',
    accent: '#f5a623',
    imgUrl: 'https://placehold.co/700x500/1a1a2e/f5a623?text=Leather+Collection',
    light: true,
  },
  {
    id: 3,
    bg: 'linear-gradient(120deg, #e8f4e8 0%, #d4edda 100%)',
    tag: 'LUXURY SHIRTS',
    title: 'Royal Signature Series',
    subtitle: 'Premium fabric shirts — crafted for comfort and style.',
    ctaLabel: 'View Collection',
    ctaLink: '/category/luxury-shirt',
    accent: '#198754',
    imgUrl: 'https://placehold.co/700x500/e8f4e8/198754?text=Luxury+Shirts',
  },
];

const HeroSlider = () => {
  const swiperRef = useRef(null);

  return (
    <section className="hero-slider">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="hero-slider__swiper"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`hero-slider__slide ${slide.light ? 'hero-slider__slide--light' : ''}`}
              style={{ background: slide.bg }}
            >
              <div className="hero-slider__content">
                <span
                  className="hero-slider__tag"
                  style={{ borderColor: slide.accent, color: slide.accent }}
                >
                  {slide.tag}
                </span>

                <h1 className="hero-slider__title">{slide.title}</h1>

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

              <div className="hero-slider__image-wrapper">
                <img
                  src={slide.imgUrl}
                  alt={slide.title}
                  className="hero-slider__image"
                  loading={slide.id === 1 ? 'eager' : 'lazy'}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
