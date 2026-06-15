"use client";

import { X } from "lucide-react";

interface ActiveFilters {
  brands?: string[];
  metals?: string[];
  priceRange?: string;
  rating?: string;
}

interface FilterChipsProps {
  filters: ActiveFilters;
  onRemove: (key: string, value: string) => void;
  onClearAll?: () => void;
}

const PRICE_LABELS: Record<string, string> = {
  "under-999": "Under ₹999",
  "999-2999": "₹999 – ₹2,999",
  "2999-9999": "₹2,999 – ₹9,999",
  "9999-plus": "₹9,999+",
};

const RATING_LABELS: Record<string, string> = {
  "4": "4★ & above",
  "3": "3★ & above",
  "2": "2★ & above",
};

export default function FilterChips({
  filters,
  onRemove,
  onClearAll,
}: FilterChipsProps) {
  const chips: { key: string; value: string; label: string }[] = [];

  filters.brands?.forEach((slug) =>
    chips.push({ key: "brands", value: slug, label: slug.replace(/-/g, " ") })
  );

  filters.metals?.forEach((metal) =>
    chips.push({
      key: "metals",
      value: metal,
      label: metal.replace(/-/g, " "),
    })
  );

  if (filters.priceRange && PRICE_LABELS[filters.priceRange]) {
    chips.push({
      key: "priceRange",
      value: filters.priceRange,
      label: PRICE_LABELS[filters.priceRange],
    });
  }

  if (filters.rating && RATING_LABELS[filters.rating]) {
    chips.push({
      key: "rating",
      value: filters.rating,
      label: RATING_LABELS[filters.rating],
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs text-gray-500 font-medium mr-1">Active:</span>
      {chips.map((chip) => (
        <span
          key={`${chip.key}-${chip.value}`}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#745B38] bg-[#fdf7f0] text-xs font-medium text-[#745B38] capitalize"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.key, chip.value)}
            aria-label={`Remove ${chip.label} filter`}
            className="hover:text-red-500 transition-colors"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </span>
      ))}
      {chips.length > 1 && onClearAll && (
        <button
          onClick={onClearAll}
          className="text-xs font-semibold text-red-500 hover:text-red-700 underline ml-1 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
