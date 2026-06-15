"use client";

import Link from "next/link";
import { brands } from "@/lib/data/brands";

export default function BrandLogoStrip() {
  // Take first 20 brands for the marquee
  const displayBrands = brands.slice(0, 20);

  return (
    <section className="py-12 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-2xl font-bold text-gray-900 mb-2 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Shop by Brand
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          120+ trusted brands, all in one place
        </p>
      </div>

      <div className="overflow-hidden relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fafaf8] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fafaf8] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 items-center"
          style={{ animation: "brandMarquee 35s linear infinite", width: "max-content" }}
        >
          {/* Double for seamless loop */}
          {[...displayBrands, ...displayBrands].map((brand, i) => (
            <Link
              key={`${brand.slug}-${i}`}
              href={`/brands/${brand.slug}`}
              className="flex-shrink-0 w-[130px] h-[64px] bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center px-3 hover:shadow-md hover:border-[#C3A070] transition-all group"
            >
              <span className="text-xs font-semibold text-gray-600 group-hover:text-[#745B38] text-center leading-tight truncate w-full text-center transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes brandMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
