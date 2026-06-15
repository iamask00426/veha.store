"use client";

import { ChevronDown } from "lucide-react";

export type SortOption =
  | "popularity"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "discount", label: "Discount" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const current = OPTIONS.find((o) => o.value === value);

  return (
    <div className="relative inline-block">
      <label className="sr-only">Sort by</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-gray-200 hover:border-[#C3A070] text-gray-800 text-sm font-medium rounded-xl pl-4 pr-10 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C3A070] focus:border-[#745B38] transition-all shadow-sm"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
      <span className="sr-only">Sorted by: {current?.label}</span>
    </div>
  );
}
