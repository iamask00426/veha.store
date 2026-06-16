"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, SearchX } from "lucide-react";
import { useStore } from "@/context";
import type { Product } from "@/types";
import { formatINR, getDiscountLabel } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

const TRENDING = [
  "Earrings",
  "Silver Rings",
  "Gold Chain",
  "Mangalsutra",
  "Watches",
  "Bracelets",
  "Necklaces",
];

function SearchResultCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product?slug=${product.slug}`}
      className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-3 hover:border-[#A1A8B8] hover:shadow-md transition-all group"
    >
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 relative">
        <Image
          src={product.images[0] ?? "/placeholder-jewelry.jpg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="80px"
        />
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-[#A1A8B8] uppercase tracking-wide">
          VEHA SILVER
        </p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mt-0.5 group-hover:text-[#D06780] transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-base font-bold text-[#D06780]">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                {formatINR(product.mrp)}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                {getDiscountLabel(product.discountPct)}
              </span>
            </>
          )}
        </div>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
      </div>
    </Link>
  );
}

function PopularScroll() {
  const { products } = useStore();
  const popular = products.filter(p => p.isActive !== false).slice(0, 10);
  return (
    <div className="mt-8">
      <h2 className="text-base font-bold text-gray-800 mb-3">
        Popular This Week
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {popular.map((p) => (
          <Link
            key={p.id}
            href={`/product?slug=${p.slug}`}
            className="flex-shrink-0 w-36 bg-white rounded-xl border border-gray-100 hover:border-[#A1A8B8] hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="relative w-full h-32 bg-gray-50">
              <Image
                src={p.images[0] ?? "/placeholder-jewelry.jpg"}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="144px"
              />
            </div>
            <div className="p-2">
              <p className="text-[10px] font-semibold text-[#A1A8B8] uppercase tracking-wide truncate">
                VEHA SILVER
              </p>
              <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mt-0.5">
                {p.title}
              </p>
              <p className="text-xs font-bold text-[#D06780] mt-1">
                {formatINR(p.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SearchContent() {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);

  // Update URL as user types (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      router.replace(`/search${query ? `?${params.toString()}` : ""}`, {
        scroll: false,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, router]);

  const results =
    query.trim().length > 0
      ? products.filter(
          (p) =>
            p.isActive !== false &&
            (p.title.toLowerCase().includes(query.toLowerCase()) ||
             p.categorySlug.toLowerCase().includes(query.toLowerCase()) ||
             p.metal.toLowerCase().includes(query.toLowerCase()))
        )
      : [];

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search header */}
      <div
        className="py-10 px-4"
        style={{ background: "linear-gradient(135deg, #D06780 0%, #E591A4 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-[#FDE9EC] text-center mb-5">
            Search Jewelry
          </h1>
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rings, necklaces..."
              className="w-full bg-white rounded-full py-3.5 pl-12 pr-5 text-gray-900 placeholder-gray-400 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A1A8B8]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {hasQuery ? (
          <>
            {/* Result count */}
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-bold text-gray-900">{results.length}</span>{" "}
              result{results.length !== 1 ? "s" : ""} for{" "}
              <span className="font-bold text-[#D06780]">&quot;{query}&quot;</span>
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.map((p) => (
                  <SearchResultCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center py-16 text-center">
                <SearchX size={64} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  No results found
                </h2>
                <p className="text-gray-500 mb-6">
                  We couldn&apos;t find anything for &quot;{query}&quot;. Try a different
                  keyword.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="px-4 py-2 rounded-full bg-white border border-[#A1A8B8] text-[#D06780] text-sm font-medium hover:bg-[#fdf7f0] transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Trending searches */}
            <div className="mb-6">
              <h2 className="text-base font-bold text-gray-800 mb-3">
                Trending Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-[#A1A8B8] hover:text-[#D06780] transition-all shadow-sm"
                  >
                    <Search size={13} className="text-gray-400" />
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <PopularScroll />
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#D06780] border-t-transparent rounded-full" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
