"use client";

import Link from "next/link";

const pillCategories = [
  { label: "Gold & Fine", slug: "gold", localImg: "/cat_necklaces.png" },
  { label: "Earrings", slug: "earrings", localImg: "/cat_earrings.png" },
  { label: "Rings", slug: "rings", localImg: "/cat_rings.png" },
  { label: "Watches", slug: "watches", localImg: "/cat_watches.png" },
  { label: "Nose Pins", slug: "nosepins", localImg: "/cat_nosepins.png" },
  { label: "Bracelets", slug: "bangles", localImg: "/cat_bracelets.png" },
  { label: "Mangalsutra", slug: "mangalsutra", localImg: "/cat_mangalsutras.png" },
];

export default function CategoryPillStrip() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-2xl font-bold text-gray-900 mb-6 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Shop by Category
        </h2>

        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {pillCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/jewelry/${cat.slug}`}
              className="flex-shrink-0 snap-start flex flex-col items-center gap-2 group"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#e4ddd2] group-hover:border-[#C3A070] transition-colors shadow-md">
                <img
                  src={cat.localImg}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-[#745B38] transition-colors text-center w-20 leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop: Grid row centered */}
        <div className="hidden md:flex flex-wrap justify-center gap-8">
          {pillCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/jewelry/${cat.slug}`}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#e4ddd2] group-hover:border-[#C3A070] transition-colors shadow-md group-hover:shadow-lg">
                <img
                  src={cat.localImg}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#745B38] transition-colors text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
