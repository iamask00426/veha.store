"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/context";
import type { Product } from "@/types";
import { formatINR, getDiscountLabel } from "@/lib/utils";
import FilterSidebar from "@/components/listing/FilterSidebar";
import SortDropdown, { SortOption } from "@/components/listing/SortDropdown";
import FilterChips from "@/components/listing/FilterChips";
import StarRating from "@/components/ui/StarRating";
import Image from "next/image";

const PAGE_SIZE = 24;

const TYPE_MAP: Record<
  string,
  { label: string; categorySlug?: string; metal?: string }
> = {
  fashion: { label: "Fashion Jewellery" },
  silver: { label: "Silver Jewellery", metal: "silver" },
  fine: { label: "Fine Gold Jewellery", metal: "gold" },
  rings: { label: "Rings", categorySlug: "rings" },
  earrings: { label: "Earrings", categorySlug: "earrings" },
  necklaces: { label: "Necklaces", categorySlug: "necklaces" },
  bangles: { label: "Bangles", categorySlug: "bangles" },
  bracelets: { label: "Bracelets", categorySlug: "bracelets" },
  pendants: { label: "Pendants", categorySlug: "pendants" },
  chains: { label: "Chains", categorySlug: "chains" },
  mangalsutra: { label: "Mangalsutra", categorySlug: "mangalsutra" },
  anklets: { label: "Anklets", categorySlug: "anklets" },
};

function priceInRange(price: number, range: string): boolean {
  if (range === "under-999") return price < 999;
  if (range === "999-2999") return price >= 999 && price <= 2999;
  if (range === "2999-9999") return price >= 2999 && price <= 9999;
  if (range === "9999-plus") return price > 9999;
  return true;
}

function sortProducts(arr: Product[], sort: SortOption): Product[] {
  const copy = [...arr];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "discount":
      return copy.sort((a, b) => b.discountPct - a.discountPct);
    case "newest":
      return copy.reverse();
    default:
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

function ProductGridCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product?slug=${product.slug}`}
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
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
        />
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="font-bold text-[#D06780] text-sm">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs text-gray-400 line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ListingContent({ type }: { type: string }) {
  const { products } = useStore();
  const typeInfo = TYPE_MAP[type] ?? {
    label: type.charAt(0).toUpperCase() + type.slice(1),
  };

  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sort, setSort] = useState<SortOption>("popularity");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const baseProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.isActive === false) return false;
      if (typeInfo.categorySlug && p.categorySlug !== typeInfo.categorySlug) return false;
      if (typeInfo.metal && p.metal !== typeInfo.metal) return false;
      return true;
    });
  }, [products, typeInfo]);

  const filtered = useMemo(() => {
    return baseProducts.filter((p) => {
      if (selectedMetals.length > 0 && !selectedMetals.includes(p.metal)) return false;
      if (priceRange && !priceInRange(p.price, priceRange)) return false;
      if (selectedRating && p.rating < parseFloat(selectedRating)) return false;
      return true;
    });
  }, [baseProducts, selectedMetals, priceRange, selectedRating]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function clearAll() {
    setSelectedMetals([]);
    setPriceRange("");
    setSelectedRating("");
    setPage(1);
  }

  function handleRemoveFilter(key: string, value: string) {
    if (key === "metals") setSelectedMetals((m) => m.filter((x) => x !== value));
    if (key === "priceRange") setPriceRange("");
    if (key === "rating") setSelectedRating("");
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div
        className="py-8 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #D06780 0%, #E591A4 100%)" }}
      >
        <h1 className="text-3xl font-serif font-bold text-[#FDE9EC]">
          {typeInfo.label}
        </h1>
        <p className="text-[#FDE9EC]/80 mt-1 text-sm">
          {sorted.length} products
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm hover:border-[#A1A8B8]"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <SortDropdown value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterSidebar
                selectedMetals={selectedMetals}
                priceRange={priceRange}
                selectedRating={selectedRating}
                onMetalsChange={(v) => { setSelectedMetals(v); setPage(1); }}
                onPriceChange={(v) => { setPriceRange(v); setPage(1); }}
                onRatingChange={(v) => { setSelectedRating(v); setPage(1); }}
                onClear={clearAll}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort + filter chips row (desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-3">
              <FilterChips
                filters={{ metals: selectedMetals, priceRange, rating: selectedRating }}
                onRemove={handleRemoveFilter}
                onClearAll={clearAll}
              />
              <SortDropdown value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
            </div>

            {/* Mobile filter chips */}
            <div className="lg:hidden mb-3">
              <FilterChips
                filters={{ metals: selectedMetals, priceRange, rating: selectedRating }}
                onRemove={handleRemoveFilter}
                onClearAll={clearAll}
              />
            </div>

            {/* Product grid */}
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <span className="text-6xl mb-4">💎</span>
                <h2 className="text-xl font-bold text-gray-700 mb-2">No products found</h2>
                <p className="text-gray-500 mb-4">Try adjusting or clearing your filters.</p>
                <button
                  onClick={clearAll}
                  className="px-6 py-2 bg-[#D06780] text-white rounded-xl font-semibold hover:bg-[#9C3E55] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginated.map((p) => (
                  <ProductGridCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 disabled:opacity-40 hover:border-[#A1A8B8] transition-all"
                >
                  ← Prev
                </button>
                <span className="text-sm text-gray-600 px-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 disabled:opacity-40 hover:border-[#A1A8B8] transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="w-80 bg-white overflow-y-auto p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar
              selectedMetals={selectedMetals}
              priceRange={priceRange}
              selectedRating={selectedRating}
              onMetalsChange={(v) => { setSelectedMetals(v); setPage(1); }}
              onPriceChange={(v) => { setPriceRange(v); setPage(1); }}
              onRatingChange={(v) => { setSelectedRating(v); setPage(1); }}
              onClear={clearAll}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-4 py-3 bg-[#D06780] text-white rounded-xl font-bold hover:bg-[#9C3E55] transition-colors"
            >
              View {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
