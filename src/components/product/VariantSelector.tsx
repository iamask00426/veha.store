"use client";

import type { ProductVariant } from "@/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string) => void;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-700">
        Select Variant
        {selectedVariantId && (
          <span className="font-normal text-gray-500 ml-2">
            —{" "}
            {variants.find((v) => v.id === selectedVariantId)?.label}
          </span>
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = selectedVariantId === variant.id;
          const isOOS = !variant.inStock;

          return (
            <button
              key={variant.id}
              onClick={() => !isOOS && onSelect(variant.id)}
              disabled={isOOS}
              className={`relative px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-[#745B38] text-[#F6EDE1] border-[#745B38] shadow-md"
                  : isOOS
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#C3A070] hover:text-[#745B38]"
              }`}
              aria-label={`${variant.label}${isOOS ? " (out of stock)" : ""}`}
            >
              {variant.label}
              {isOOS && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-red-100 text-red-600 px-1 rounded-full font-semibold">
                  OOS
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
