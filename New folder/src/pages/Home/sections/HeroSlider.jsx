import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Minimal inline slider hook (no external dep) ────────────────────────────
const useSlider = (count, interval = 4500) => {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const go   = useCallback((i) => setActive(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  useEffect(() => {
    timer.current = setInterval(next, interval);
    return () => clearInterval(timer.current);
  }, [next, interval]);

  return { active, next, prev, go,
    pause: () => clearInterval(timer.current),
    resume: () => { timer.current = setInterval(next, interval); }
  };
};

// ─── HeroSlider ───────────────────────────────────────────────────────────────
const HeroSlider = ({ slides = [], loading = false }) => {
  const { active, next, prev, go, pause, resume } = useSlider(slides.length || 1);

  if (loading) {
    return <div className="skeleton w-full h-[280px] sm:h-[400px] lg:h-[520px]" />;
  }
  if (!slides.length) return null;

  return (
    <section
      aria-label="Featured banners"
      className="relative w-full overflow-hidden bg-gray-900 select-none"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full flex-shrink-0 h-[280px] sm:h-[400px] lg:h-[520px]"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight drop-shadow-lg mb-3">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base text-white/80 mb-6 drop-shadow">{slide.subtitle}</p>
              <Link to={slide.ctaLink} className="btn-primary w-fit px-7 py-2.5 text-sm shadow-lg">
                {slide.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {[
        { fn: prev, label: "Previous", pos: "left-3",  path: "M15 19l-7-7 7-7" },
        { fn: next, label: "Next",     pos: "right-3", path: "M9 5l7 7-7 7"    },
      ].map(({ fn, label, pos, path }) => (
        <button
          key={label}
          onClick={fn}
          aria-label={`${label} slide`}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white
                      shadow flex items-center justify-center transition`}
        >
          <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
          </svg>
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === active ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
