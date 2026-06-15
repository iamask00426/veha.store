"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  qty: number;
  onChange: (newQty: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  qty,
  onChange,
  min = 1,
  max = 10,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden w-fit shadow-sm">
      <button
        onClick={() => onChange(Math.max(min, qty - 1))}
        disabled={qty <= min}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r border-gray-200"
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>

      <span
        className="w-12 h-10 flex items-center justify-center text-sm font-semibold text-gray-900 select-none bg-white"
        aria-label={`Quantity: ${qty}`}
      >
        {qty}
      </span>

      <button
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={qty >= max}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l border-gray-200"
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
