"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product, BadgeType } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

function getBadgeVariant(badge: BadgeType): "new" | "bestseller" | "bogo" | "sale" | "exclusive" | "trending" | "virtual" | "sameday" {
  const map: Record<string, "new" | "bestseller" | "bogo" | "sale" | "exclusive" | "trending" | "virtual" | "sameday"> = {
    "New": "new",
    "Bestseller": "bestseller",
    "B1G1": "bogo",
    "Sale": "sale",
    "Exclusive": "exclusive",
    "Trending": "trending",
    "Virtual Try-On": "virtual",
    "Same Day": "sameday",
    "Limited": "exclusive",
  };
  return map[badge] ?? "new";
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      variantId: product.variants[0]?.id ?? null,
      qty: 1,
      price: product.price,
      mrp: product.mrp,
      title: product.title,
      image: product.images[0],
      brandSlug: product.brandSlug,
    });
    showToast("Added to cart! 🛍️", "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      wishlisted ? "Removed from wishlist" : "Saved to wishlist ❤️",
      wishlisted ? "info" : "success"
    );
  };

  const displayBadges = product.badges.slice(0, 2);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image container */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top-left badges */}
        {displayBadges.length > 0 && (
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {displayBadges.map((badge) => (
              <Badge key={badge} label={badge} variant={getBadgeVariant(badge)} />
            ))}
          </div>
        )}

        {/* Top-right wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
            wishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Bottom pills: virtualTryOn / sameDayDelivery */}
        <div className="absolute bottom-2.5 left-2.5 flex gap-1.5">
          {product.virtualTryOn && (
            <span className="text-[10px] font-semibold bg-purple-600 text-white px-2 py-0.5 rounded-full">
              Try On
            </span>
          )}
          {product.sameDayDelivery && (
            <span className="text-[10px] font-semibold bg-sky-500 text-white px-2 py-0.5 rounded-full">
              Same Day
            </span>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`} className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#E591A4] mb-1">
            VEHA SILVER
          </p>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug mb-1.5">
            {product.title}
          </h3>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />

          {/* Price row */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
            {product.discountPct > 0 && (
              <span className="text-xs font-semibold text-green-600">
                {product.discountPct}% off
              </span>
            )}
          </div>
        </Link>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            inCart
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-[#D06780] text-[#FDE9EC] hover:bg-[#9C3E55]"
          }`}
        >
          <ShoppingBag size={15} />
          {inCart ? "In Cart ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
