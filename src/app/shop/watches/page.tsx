"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, X, Watch } from "lucide-react";
import { products } from "@/lib/data";
import type { Product } from "@/types";
import { formatINR, getDiscountLabel } from "@/lib/utils";
import FilterChips from "@/components/listing/FilterChips";
import SortDropdown, { SortOption } from "@/components/listing/SortDropdown";
import StarRating from "@/components/ui/StarRating";

const PAGE_SIZE = 24;

const GENDERS = ["Men's", "Women's", "Unisex"];

const WATCH_PRICE_RANGES = [
  { value: "under-999", label: "Under ₹999" },
  { value: "999-4999", label: "₹999 – ₹4,999" },
  { value: "4999-14999", label: "₹4,999 – ₹14,999" },
  { value: "14999-plus", label: "₹14,999+" },
];

function watchPriceInRange(price: number, range: string): boolean {
  if (range === "under-999") return price < 999;
  if (range === "999-4999") return price >= 999 && price <= 4999;
  if (range === "4999-14999") return price >= 4999 && price <= 14999;
  if (range === "14999-plus") return price > 14999;
  return true;
}

function sortProducts(arr: Product[], sort: SortOption): Product[] {
  const copy = [...arr];
  switch (sort) {
    case "price-asc": return copy.sort((a, b) => a.price - b.price);
    case "price-desc": return copy.sort((a, b) => b.price - a.price);
    case "rating": return copy.sort((a, b) => b.rating - a.rating);
    case "discount": return copy.sort((a, b) => b.discountPct - a.discountPct);
    case "newest": return copy.reverse();
    default: return copy.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

function WatchCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#A1A8B8] hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.images[0] ?? "/placeholder-jewelry.jpg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.discountPct > 0 && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {getDiscountLabel(product.discountPct)}
          </span>
        )}
        {product.badges.includes("New") && (
          <span className="absolute top-2 right-2 bg-[#D06780] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-[11px] font-semibold text-[#A1A8B8] uppercase tracking-wide truncate">
          VEHA SILVER
        </p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[#D06780] transition-colors leading-snug">
          {product.title}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="font-bold text-[#D06780] text-sm">{formatINR(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-gray-400 line-through">{formatINR(product.mrp)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function WatchesContent() {
  const [priceRange, setPriceRange] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [sort, setSort] = useState<SortOption>("popularity");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const baseProducts = useMemo(
    () => products.filter((p) => p.categorySlug === "watches"),
    []
  );

  const filtered = useMemo(() => {
    return baseProducts.filter((p) => {
      if (priceRange && !watchPriceInRange(p.price, priceRange)) return false;
      return true;
    });
  }, [baseProducts, priceRange]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilters = {
    priceRange,
  };

  function clearAll() {
    setPriceRange("");
    setSelectedGender("");
    setPage(1);
  }

  function handleRemove(key: string, value: string) {
    if (key === "priceRange") setPriceRange("");
    setPage(1);
  }

  const FilterPanel = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Filters</h2>
        <button onClick={clearAll} className="text-xs text-[#D06780] hover:underline font-medium">
          Clear All
        </button>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">Price Range</h3>
        <div className="space-y-2">
          {WATCH_PRICE_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setPriceRange(priceRange === r.value ? "" : r.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                priceRange === r.value
                  ? "bg-[#D06780] text-white border-[#D06780]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#A1A8B8]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">Gender</h3>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(selectedGender === g ? "" : g)}
              className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-all ${
                selectedGender === g
                  ? "bg-[#D06780] text-white border-[#D06780]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#A1A8B8]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="py-8 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #D06780 0%, #E591A4 100%)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Watch className="text-[#A1A8B8]" size={28} />
          <h1 className="text-3xl font-serif font-bold text-[#FDE9EC]">Watches</h1>
        </div>
        <p className="text-[#FDE9EC]/80 text-sm">{sorted.length} products</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium shadow-sm hover:border-[#A1A8B8]"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <SortDropdown value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterPanel />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="hidden lg:flex items-center justify-between mb-3">
              <FilterChips filters={activeFilters} onRemove={handleRemove} onClearAll={clearAll} />
              <SortDropdown value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
            </div>
            <div className="lg:hidden mb-3">
              <FilterChips filters={activeFilters} onRemove={handleRemove} onClearAll={clearAll} />
            </div>

            {paginated.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <Watch size={56} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">No watches found</h2>
                <p className="text-gray-500 mb-4">Try clearing some filters.</p>
                <button onClick={clearAll} className="px-6 py-2 bg-[#D06780] text-white rounded-xl font-semibold">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginated.map((p) => <WatchCard key={p.id} product={p} />)}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium disabled:opacity-40 hover:border-[#A1A8B8] transition-all">
                  ← Prev
                </button>
                <span className="text-sm text-gray-600 px-2">Page {page} of {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium disabled:opacity-40 hover:border-[#A1A8B8] transition-all">
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="w-80 bg-white overflow-y-auto p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <FilterPanel />
            <button onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-4 py-3 bg-[#D06780] text-white rounded-xl font-bold hover:bg-[#9C3E55] transition-colors">
              View {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WatchesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-[#D06780] border-t-transparent rounded-full" />
    </div>}>
      <WatchesContent />
    </Suspense>
  );
}
