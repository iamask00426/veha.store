import { products } from "@/lib/data/products";
import type { Product } from "@/types";

import HeroBannerCarousel from "@/components/home/HeroBannerCarousel";
import CategoryPillStrip from "@/components/home/CategoryPillStrip";
import BrandLogoStrip from "@/components/home/BrandLogoStrip";
import TrustBadges from "@/components/home/TrustBadges";
import ReviewCarousel from "@/components/home/ReviewCarousel";
import NewsletterStrip from "@/components/home/NewsletterStrip";
import ProductRow from "@/components/product/ProductRow";
import Link from "next/link";

// ─── Filter helpers ───────────────────────────────────────────────────────────

function getTrending(all: Product[]): Product[] {
  return all
    .filter((p) => p.badges.includes("Trending") || p.rating >= 4.5)
    .slice(0, 12);
}

function getNewArrivals(all: Product[]): Product[] {
  return all.filter((p) => p.badges.includes("New")).slice(0, 12);
}

function getBudget(all: Product[]): Product[] {
  return all.filter((p) => p.price < 999).slice(0, 12);
}

function getEditorsPick(all: Product[]): Product[] {
  return all.filter((p) => p.badges.includes("Exclusive")).slice(0, 12);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const trending = getTrending(products);
  const newArrivals = getNewArrivals(products);
  const budget = getBudget(products);
  const editorsPick = getEditorsPick(products);

  return (
    <div className="w-full">
        {/* Hero Carousel */}
        <HeroBannerCarousel />

        {/* Category Pills */}
        <CategoryPillStrip />

        {/* Trending Now */}
        <ProductRow
          title="Trending Now"
          subtitle="What everyone's loving this season"
          products={trending}
          viewAllLink="/jewelry/trending"
        />

        {/* New Arrivals */}
        <ProductRow
          title="New Arrivals"
          subtitle="Fresh additions, just for you"
          products={newArrivals}
          viewAllLink="/jewelry/new"
        />

        {/* Editorial Banners */}
        <section className="py-10 bg-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Bridal Collection banner */}
              <Link
                href="/collections/bridal-2024"
                className="relative overflow-hidden rounded-2xl group min-h-[220px] flex items-end"
              >
                <img
                  src="/bridal_banner_editorial.png"
                  alt="Bridal Collection"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#C3A070] mb-1">
                    Featured Collection
                  </p>
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Bridal Collection
                  </h3>
                  <p className="text-sm text-gray-300">Complete bridal sets & mangalsutra</p>
                  <span className="inline-block mt-3 text-xs font-semibold bg-[#C3A070] text-[#1a1a1a] px-4 py-1.5 rounded-full group-hover:bg-white transition-colors">
                    Explore Now →
                  </span>
                </div>
              </Link>

              {/* Gift Store banner */}
              <Link
                href="/gifts"
                className="relative overflow-hidden rounded-2xl group min-h-[220px] flex items-end"
              >
                <img
                  src="/gift_banner_editorial.png"
                  alt="Gift Store"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#C3A070] mb-1">
                    Gift Store
                  </p>
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Give the Gift of Luxury
                  </h3>
                  <p className="text-sm text-gray-300">Curated gifts under ₹5,000</p>
                  <span className="inline-block mt-3 text-xs font-semibold bg-[#C3A070] text-[#1a1a1a] px-4 py-1.5 rounded-full group-hover:bg-white transition-colors">
                    Shop Gifts →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Under ₹999 */}
        <ProductRow
          title="Under ₹999"
          subtitle="Amazing jewelry that won't break the bank"
          products={budget}
          viewAllLink="/jewelry/budget"
        />

        {/* Brand Logo Strip */}
        <BrandLogoStrip />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Editor's Pick */}
        {editorsPick.length > 0 && (
          <ProductRow
            title="Editor's Pick"
            subtitle="Handpicked exclusive pieces by our stylists"
            products={editorsPick}
          />
        )}

        {/* Review Carousel */}
        <ReviewCarousel />

        {/* Newsletter */}
        <NewsletterStrip />
    </div>
  );
}
