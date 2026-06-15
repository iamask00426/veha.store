"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
export interface FilterState {
  metals: string[];
  priceRange: string;
  rating: string;
}

interface FilterSidebarProps {
  selectedMetals: string[];
  priceRange: string;
  selectedRating: string;
  onMetalsChange: (metals: string[]) => void;
  onPriceChange: (range: string) => void;
  onRatingChange: (rating: string) => void;
  onClear: () => void;
}

const METALS = [
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "platinum", label: "Platinum" },
  { value: "rose-gold", label: "Rose Gold" },
  { value: "stainless-steel", label: "Stainless Steel" },
  { value: "brass", label: "Brass" },
];

const PRICE_RANGES = [
  { value: "under-999", label: "Under ₹999" },
  { value: "999-2999", label: "₹999 – ₹2,999" },
  { value: "2999-9999", label: "₹2,999 – ₹9,999" },
  { value: "9999-plus", label: "₹9,999+" },
];

const RATINGS = [
  { value: "4", label: "4★ & above" },
  { value: "3", label: "3★ & above" },
  { value: "2", label: "2★ & above" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full py-1 text-left"
      >
        <span className="font-semibold text-gray-800 text-sm tracking-wide uppercase">
          {title}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-gray-500" />
        ) : (
          <ChevronDown size={16} className="text-gray-500" />
        )}
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  selectedMetals,
  priceRange,
  selectedRating,
  onMetalsChange,
  onPriceChange,
  onRatingChange,
  onClear,
}: FilterSidebarProps) {
  const hasFilters =
    selectedMetals.length > 0 ||
    priceRange !== "" ||
    selectedRating !== "";

  function toggleMetal(value: string) {
    if (selectedMetals.includes(value)) {
      onMetalsChange(selectedMetals.filter((m) => m !== value));
    } else {
      onMetalsChange([...selectedMetals, value]);
    }
  }

  return (
    <aside className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 text-base">Filters</h2>
        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-medium text-[#745B38] hover:text-[#5a4428] transition-colors"
          >
            <X size={13} />
            Clear All
          </button>
        )}
      </div>

      {/* Metal */}
      <Section title="Metal">
        {METALS.map((metal) => (
          <label
            key={metal.value}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedMetals.includes(metal.value)}
              onChange={() => toggleMetal(metal.value)}
              className="w-4 h-4 rounded border-gray-300 accent-[#745B38] cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-[#745B38] transition-colors">
              {metal.label}
            </span>
          </label>
        ))}
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() =>
                onPriceChange(priceRange === range.value ? "" : range.value)
              }
              className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                priceRange === range.value
                  ? "bg-[#745B38] text-white border-[#745B38] font-medium"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#C3A070] hover:text-[#745B38]"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Rating */}
      <Section title="Customer Rating">
        {RATINGS.map((r) => (
          <label
            key={r.value}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="radio"
              name="rating"
              value={r.value}
              checked={selectedRating === r.value}
              onChange={() =>
                onRatingChange(selectedRating === r.value ? "" : r.value)
              }
              className="w-4 h-4 accent-[#745B38] cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-[#745B38] transition-colors">
              {r.label}
            </span>
          </label>
        ))}
      </Section>
    </aside>
  );
}
