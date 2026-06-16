"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X, Lock, Trash2 } from "lucide-react";
import { useCart, useStore } from "@/context";
import { formatINR, calcCartTotal, calcCartMRP, safeLocalStorageGet, safeLocalStorageSet } from "@/lib/utils";
import QuantitySelector from "@/components/product/QuantitySelector";

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_COST = 99;

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart } = useCart();
  const { coupons } = useStore();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Load coupon from localStorage on mount
  useEffect(() => {
    const saved = safeLocalStorageGet<any>("veha_applied_coupon", null);
    if (saved) {
      setAppliedCoupon(saved);
    }
  }, []);

  const subtotal = useMemo(() => calcCartTotal(items), [items]);
  const mrpTotal = useMemo(() => calcCartMRP(items), [items]);
  const productDiscount = mrpTotal - subtotal;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : SHIPPING_COST;

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.type === "percent") return Math.round((subtotal * appliedCoupon.value) / 100);
    if (appliedCoupon.type === "flat") return Math.min(appliedCoupon.value, subtotal);
    if (appliedCoupon.type === "freeShipping") return shipping;
    return 0;
  }, [appliedCoupon, subtotal, shipping]);

  const total = subtotal + shipping - couponDiscount;

  // Validate applied coupon whenever items or subtotal changes
  useEffect(() => {
    if (appliedCoupon) {
      if (items.length === 0) {
        setAppliedCoupon(null);
        safeLocalStorageSet("veha_applied_coupon", null);
      } else if (subtotal < appliedCoupon.minOrder) {
        setAppliedCoupon(null);
        safeLocalStorageSet("veha_applied_coupon", null);
        setCouponError(`Coupon "${appliedCoupon.code}" removed because order subtotal is below ${formatINR(appliedCoupon.minOrder)}`);
        setCouponSuccess("");
      }
    }
  }, [items, subtotal, appliedCoupon]);

  function applyCoupon() {
    setCouponError("");
    setCouponSuccess("");
    const found = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );
    if (!found) {
      setCouponError("Invalid coupon code. Please try again.");
      return;
    }
    if (found.isActive === false) {
      setCouponError("This coupon is currently inactive.");
      return;
    }
    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order of ${formatINR(found.minOrder)} required for this coupon.`);
      return;
    }
    if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
      setCouponError("This coupon has expired.");
      return;
    }
    setAppliedCoupon(found);
    safeLocalStorageSet("veha_applied_coupon", found);
    setCouponSuccess(`Coupon "${found.code}" applied! ${found.description ?? ""}`);
    setCouponCode("");
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    safeLocalStorageSet("veha_applied_coupon", null);
    setCouponSuccess("");
    setCouponError("");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
        <ShoppingBag size={80} className="text-gray-200 mb-6" strokeWidth={1.5} />
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8 text-center max-w-xs">
          Looks like you haven&apos;t added anything yet. Start exploring our beautiful collections!
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold text-base hover:bg-[#9C3E55] transition-colors shadow-md"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="py-6 px-4"
        style={{ background: "linear-gradient(135deg, #D06780 0%, #E591A4 100%)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-[#FDE9EC]">
            My Cart
          </h1>
          <span className="text-[#FDE9EC]/80 text-sm">
            {items.reduce((s, i) => s + i.qty, 0)} items
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            {/* Clear cart */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
              >
                <Trash2 size={13} />
                Clear Cart
              </button>
            </div>

            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 relative border border-gray-100">
                  <Image
                    src={item.image || "/placeholder-jewelry.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-[#A1A8B8] uppercase tracking-wide">
                    VEHA SILVER
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mt-0.5">
                    {item.title}
                  </h3>
                  {item.variantId && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Variant: {item.variantId}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <QuantitySelector
                      qty={item.qty}
                      onChange={(newQty) =>
                        updateQty(item.productId, item.variantId, newQty)
                      }
                      min={1}
                      max={10}
                    />
                    <div className="text-right">
                      <p className="font-bold text-[#D06780] text-base">
                        {formatINR(item.price * item.qty)}
                      </p>
                      {item.mrp > item.price && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatINR(item.mrp * item.qty)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.productId, item.variantId)}
                  aria-label="Remove item"
                  className="flex-shrink-0 p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="font-medium text-gray-900">{formatINR(subtotal)}</span>
                </div>

                {productDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Product Discount</span>
                    <span className="font-semibold">− {formatINR(productDiscount)}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span className="font-semibold">− {formatINR(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : "font-medium text-gray-900"}>
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Add {formatINR(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-[#D06780] text-lg">{formatINR(total)}</span>
                </div>
                {(productDiscount + couponDiscount) > 0 && (
                  <p className="text-xs text-green-600 font-semibold mt-1">
                    You save {formatINR(productDiscount + couponDiscount)} on this order!
                  </p>
                )}
              </div>

              {/* Coupon */}
              <div className="mt-5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                    <div>
                      <p className="text-xs font-bold text-green-700">
                        🎉 {appliedCoupon.code} applied
                      </p>
                      {appliedCoupon.description && (
                        <p className="text-xs text-green-600">{appliedCoupon.description}</p>
                      )}
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="p-1 rounded-full hover:bg-green-100 text-green-600 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Have a coupon?
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                        placeholder="Enter code"
                        className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A1A8B8] focus:border-[#D06780]"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-[#D06780] text-white rounded-xl text-sm font-semibold hover:bg-[#9C3E55] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">{couponError}</p>
                    )}
                    {couponSuccess && (
                      <p className="text-xs text-green-600 mt-1.5 font-medium">{couponSuccess}</p>
                    )}
                  </>
                )}
              </div>

              {/* Checkout button */}
              <Link
                href="/checkout"
                className="w-full mt-5 py-3.5 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold text-base hover:bg-[#9C3E55] active:scale-[0.98] transition-all shadow-md flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>

              {/* Safe checkout */}
              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-400">
                <Lock size={13} />
                <span>Secure Checkout</span>
                <span className="font-bold text-gray-500">VISA</span>
                <span className="font-bold text-gray-500">MC</span>
                <span className="font-bold text-gray-500">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
