"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { brands } from "@/lib/data";
import type { Brand } from "@/types";

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-[#C3A070] hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Banner / fallback */}
      <div className="relative h-24 bg-gradient-to-br from-[#fdf7f0] to-[#eedec8] overflow-hidden">
        {brand.banner ? (
          <Image
            src={brand.banner}
            alt={brand.name}
            fill
            className="object-cover opacity-30 group-hover:opacity-50 transition-opacity"
            sizes="200px"
          />
        ) : null}
        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          {brand.logo ? (
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#745B38] flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {brand.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 text-center">
        <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#745B38] transition-colors">
          {brand.name}
        </h3>
        {brand.tagline && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
            {brand.tagline}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-[#C3A070] text-xs font-semibold mt-2 group-hover:gap-2 transition-all">
          View Products <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

function BrandsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const sorted = useMemo(
    () => [...brands].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return sorted;
    return sorted.filter(
      (b) =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.tagline?.toLowerCase().includes(search.toLowerCase())
    );
  }, [sorted, search]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map: Record<string, Brand[]> = {};
    filtered.forEach((b) => {
      const letter = b.name.charAt(0).toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(b);
    });
    return map;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="py-10 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #745B38 0%, #9a7a52 100%)" }}
      >
        <h1 className="text-3xl font-serif font-bold text-[#F6EDE1] mb-1">
          All Brands
        </h1>
        <p className="text-[#F6EDE1]/70 text-sm mb-6">
          {brands.length} brands to explore
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands..."
            className="w-full bg-white rounded-full py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C3A070]"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* A-Z Jump nav */}
        {!search && (
          <div className="flex flex-wrap gap-1 justify-center mb-6">
            {allLetters.map((l) => {
              const active = !!grouped[l];
              return (
                <a
                  key={l}
                  href={active ? `#letter-${l}` : undefined}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                    active
                      ? "bg-[#745B38] text-white hover:bg-[#5a4428]"
                      : "bg-gray-100 text-gray-300 cursor-default"
                  }`}
                >
                  {l}
                </a>
              );
            })}
          </div>
        )}

        {/* Results */}
        {letters.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-3">🔍</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No brands found
            </h2>
            <p className="text-gray-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-extrabold text-[#745B38]">
                    {letter}
                  </span>
                  <div className="flex-1 h-px bg-[#eedec8]" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {grouped[letter].map((brand) => (
                    <BrandCard key={brand.slug} brand={brand} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrandsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#745B38] border-t-transparent rounded-full" />
        </div>
      }
    >
      <BrandsContent />
    </Suspense>
  );
}
