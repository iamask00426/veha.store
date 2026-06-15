"use client";

import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types";
import VariantSelector from "@/components/product/VariantSelector";
import QuantitySelector from "@/components/product/QuantitySelector";
import { formatINR } from "@/lib/utils";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants.length > 0 ? product.variants[0].id : null
  );
  const [qty, setQty] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const price = selectedVariant?.price ?? product.price;
  const inCart = isInCart(product.id, selectedVariantId);
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    addToCart({
      productId: product.id,
      variantId: selectedVariantId,
      qty,
      price,
      mrp: selectedVariant?.mrp ?? product.mrp,
      title: product.title,
      image: product.images[0] ?? "",
      brandSlug: product.brandSlug,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  }

  return (
    <div className="space-y-5">
      {/* Variant selector */}
      {product.variants.length > 1 && (
        <VariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />
      )}

      {/* Qty + Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-3">
        <QuantitySelector qty={qty} onChange={setQty} />
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all duration-200 shadow-md ${
            !product.inStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : addedFeedback
              ? "bg-green-600 text-white scale-[0.98]"
              : inCart
              ? "bg-[#5a4428] text-[#F6EDE1]"
              : "bg-[#745B38] text-[#F6EDE1] hover:bg-[#5a4428] active:scale-[0.98]"
          }`}
        >
          <ShoppingCart size={20} />
          {!product.inStock
            ? "Out of Stock"
            : addedFeedback
            ? "Added to Cart!"
            : inCart
            ? "Add More"
            : "Add to Cart"}
        </button>
      </div>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 ${
          wishlisted
            ? "border-red-400 bg-red-50 text-red-500"
            : "border-[#745B38] text-[#745B38] hover:bg-[#fdf7f0]"
        }`}
      >
        <Heart
          size={18}
          className={wishlisted ? "fill-red-400 text-red-400" : ""}
        />
        {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
      </button>

      {/* Trust row */}
      <div className="flex items-center justify-around pt-2 border-t border-gray-100">
        {[
          { icon: "✓", label: "BIS Certified" },
          { icon: "↩", label: "Free Returns" },
          { icon: "🔒", label: "100% Authentic" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 text-center"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[11px] font-medium text-gray-600">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Savings callout */}
      {price < product.mrp && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 font-medium">
          🎉 You save{" "}
          <span className="font-bold">{formatINR(product.mrp - price)}</span>{" "}
          ({product.discountPct}% OFF) on this product!
        </div>
      )}
    </div>
  );
}
