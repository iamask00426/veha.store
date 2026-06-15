"use client";

import { useState, useEffect, useRef } from "react";
import { reviews } from "@/lib/data/reviews";
import StarRating from "@/components/ui/StarRating";

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cardWidth = 300 + 16; // approx card + gap

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setCurrent(index);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % reviews.length;
        const el = scrollRef.current;
        if (el) el.scrollTo({ left: next * cardWidth, behavior: "smooth" });
        return next;
      });
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    startTimer();
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What Our Customers Say
            </h2>
            <p className="text-sm text-gray-500 mt-1">Real reviews from real customers</p>
          </div>
          <div className="flex gap-1.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-[#C3A070] w-5" : "bg-gray-200 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[300px] bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.avatar}
                  alt={review.customerName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#e4ddd2]"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.customerName}</p>
                  <p className="text-xs text-gray-400">{review.city}</p>
                </div>
              </div>
              <StarRating rating={review.stars} size="sm" />
              <p className="mt-2.5 text-sm text-gray-600 leading-relaxed line-clamp-3">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-3 text-xs text-[#745B38] italic font-medium">
                Verified Purchase · {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
