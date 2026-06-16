"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context";
import type { Product } from "@/types";

const placeholders = [
  "Search for anti-tarnish jewelry",
  "Find your perfect ring 💍",
  "Looking for earrings?",
  "Search for necklaces, rings & more",
  "Search for modern mangalsutras",
  "Shop by style, mood, or occasion",
];

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

export default function SearchBar({ onClose, autoFocus }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { products } = useStore();

  // Cycle placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto focus
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [autoFocus]);

  // Filter products
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products
      .filter(
        (p) =>
          p.isActive !== false &&
          (p.title.toLowerCase().includes(q) ||
           p.categorySlug.toLowerCase().includes(q) ||
           p.material.toLowerCase().includes(q))
      )
      .slice(0, 6);
    setResults(filtered);
  }, [query, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  const handleResultClick = (slug: string) => {
    router.push(`/product?slug=${slug}`);
    onClose?.();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="w-full bg-gray-100 rounded-full py-2.5 pl-4 pr-11 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#D06780]/30 transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D06780] hover:text-[#9C3E55] transition-colors"
        >
          <Search size={18} />
        </button>
      </form>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleResultClick(product.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                <p className="text-xs text-gray-400 truncate">
                  VEHA SILVER · ₹{product.price.toLocaleString()}
                </p>
              </div>
              <Search size={14} className="text-gray-300 flex-shrink-0" />
            </button>
          ))}
          <div className="border-t px-4 py-2">
            <button
              onClick={handleSubmit as React.MouseEventHandler}
              className="text-xs text-[#D06780] font-medium hover:underline"
            >
              See all results for &ldquo;{query}&rdquo; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
