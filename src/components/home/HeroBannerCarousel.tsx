"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    eyebrow: "New Arrivals",
    heading: "Jewellery That Tells Your Story",
    subtext: "Explore 250+ handpicked pieces crafted for every occasion",
    cta1: { label: "Shop Now", href: "/jewelry/new" },
    cta2: { label: "Explore Collections", href: "/collections" },
    bg: "from-[#3d2208] via-[#6b3d1a] to-[#4a2b0e]",
    localImg: "/cat_necklaces.png",
    imgAlt: "Beautiful jewelry collection",
  },
  {
    id: 2,
    eyebrow: "Bridal Collection",
    heading: "Shine on Your Most Special Day",
    subtext: "From mangalsutra to full bridal sets — your dream look awaits",
    cta1: { label: "Explore Bridal", href: "/collections/bridal-2024" },
    cta2: { label: "Book Consultation", href: "#" },
    bg: "from-[#5c2d1a] via-[#8B4513] to-[#4a2010]",
    localImg: "/hero_bridal.png",
    imgAlt: "Bridal jewelry collection",
  },
  {
    id: 3,
    eyebrow: "Watch Sale",
    heading: "Time for an Upgrade",
    subtext: "Premium watches up to 40% off from top Swiss & Indian brands",
    cta1: { label: "Shop Watches", href: "/shop/watches" },
    cta2: { label: "View All Deals", href: "/sale" },
    bg: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    localImg: "/cat_watches.png",
    imgAlt: "Luxury watches collection",
  },
  {
    id: 4,
    eyebrow: "Gift Store",
    heading: "Give the Gift of Luxury",
    subtext: "Curated gifts under ₹5,000 — wrapped in love, delivered with care",
    cta1: { label: "Shop Gifts", href: "/gifts" },
    cta2: { label: "Personalize It", href: "/gifts/personalized" },
    bg: "from-[#2d1b4e] via-[#4a2d6e] to-[#1e1238]",
    localImg: "/cat_rings.png",
    imgAlt: "Gift jewelry sets",
  },
];

export default function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const go = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating]
  );

  useEffect(() => {
    const timer = setInterval(() => go((current + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [current, go]);

  const slide = slides[current];

  return (
    <section className={`relative min-h-[480px] md:min-h-[560px] bg-gradient-to-br ${slide.bg} overflow-hidden transition-all duration-700`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-16 w-full">
          {/* Text content */}
          <div
            key={current}
            className="text-[#F6EDE1] space-y-5"
            style={{ animation: "heroFadeIn 0.6s ease forwards" }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase bg-white/20 text-[#C3A070] px-3 py-1.5 rounded-full">
              {slide.eyebrow}
            </span>
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {slide.heading}
            </h1>
            <p className="text-base md:text-lg text-[#d4c4ac] leading-relaxed max-w-md">
              {slide.subtext}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={slide.cta1.href}
                className="inline-block bg-[#C3A070] text-[#1a1a1a] font-semibold px-6 py-3 rounded-full hover:bg-[#d4b47a] transition-colors text-sm"
              >
                {slide.cta1.label}
              </Link>
              <Link
                href={slide.cta2.href}
                className="inline-block border border-[#F6EDE1]/50 text-[#F6EDE1] font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
              >
                {slide.cta2.label}
              </Link>
            </div>
          </div>

          {/* Decorative image */}
          <div className="hidden md:flex justify-center items-center">
            <div
              className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
              key={`img-${current}`}
              style={{ animation: "heroFadeIn 0.6s ease forwards" }}
            >
              <img
                src={slide.localImg}
                alt={slide.imgAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#C3A070] w-6" : "bg-white/40 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
