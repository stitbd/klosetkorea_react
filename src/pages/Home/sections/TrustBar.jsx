import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './TrustBar.scss';

const FEATURES = [
  { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ৳8,500' },
  { icon: '🔄', title: 'Easy Returns', sub: '7-day hassle-free return' },
  { icon: '🔒', title: '100% Secure', sub: 'SSL secured checkout' },
];

const TrustBar = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect scroll → active index
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideWidth = slider.offsetWidth;
    const index = Math.round(slider.scrollLeft / slideWidth);
    setActiveIndex(index);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const nextIndex = (activeIndex + 1) % FEATURES.length;
      slider.scrollTo({
        left: nextIndex * slider.offsetWidth,
        behavior: 'smooth',
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Scroll listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  // Dot click → slide
  const goToSlide = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollTo({
      left: index * slider.offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="trust-bar">
      <Container fluid="xl">

        {/* Desktop */}
        <div className="trust-bar__desktop d-none d-sm-flex">
          {FEATURES.map((f) => (
            <div key={f.title} className="trust-bar__item">
              <span className="trust-bar__icon">{f.icon}</span>
              <div>
                <p className="trust-bar__title">{f.title}</p>
                <p className="trust-bar__sub">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="trust-bar__mobile d-sm-none">
          <div className="trust-bar__slider" ref={sliderRef}>
            {FEATURES.map((f) => (
              <div key={f.title} className="trust-bar__slide">
                <div className="trust-bar__item">
                  <span className="trust-bar__icon">{f.icon}</span>
                  <div>
                    <p className="trust-bar__title">{f.title}</p>
                    <p className="trust-bar__sub">{f.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="trust-bar__dots">
            {FEATURES.map((_, i) => (
              <span
                key={i}
                onClick={() => goToSlide(i)}
                className={`trust-bar__dot ${activeIndex === i ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

      </Container>
    </div>
  );
};

export default TrustBar;