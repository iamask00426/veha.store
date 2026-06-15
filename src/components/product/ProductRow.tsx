"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductRow({ title, subtitle, products, viewAllLink }: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </h2>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {/* Arrow buttons - desktop only */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex w-9 h-9 rounded-full border border-gray-200 items-center justify-center hover:bg-gray-100 hover:border-gray-300 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex w-9 h-9 rounded-full border border-gray-200 items-center justify-center hover:bg-gray-100 hover:border-gray-300 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="text-sm font-semibold text-[#745B38] hover:text-[#5a4429] hover:underline transition-colors whitespace-nowrap"
              >
                View All →
              </Link>
            )}
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[220px] md:w-[240px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
