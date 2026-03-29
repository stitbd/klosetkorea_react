import React from "react";
import { useSlider } from "../../hooks/useSlider";
import { HeroSkeleton } from "../../components/common/Skeleton";

// ─── HeroSlider ───────────────────────────────────────────────────────────────

const HeroSlider = ({ slides = [], loading = false }) => {
  const { current, next, prev, goTo, pause, resume } = useSlider(slides);

  if (loading) return <HeroSkeleton />;
  if (!slides.length) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      aria-label="Hero banner"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Slides Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full flex-shrink-0 h-[280px] sm:h-[380px] lg:h-[520px]"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-3 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 mb-6 drop-shadow">
                {slide.subtitle}
              </p>
              <a
                href={slide.ctaLink}
                className="btn-primary w-fit text-sm px-6 py-2.5"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
