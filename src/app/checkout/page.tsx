"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart, useStore, useToast } from "@/context";
import { formatINR, calcCartTotal, calcCartMRP, safeLocalStorageGet, safeLocalStorageSet } from "@/lib/utils";
import { ArrowLeft, CreditCard, ShieldCheck, ShoppingBag, Landmark, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, clearCart } = useCart();
  const { createOrder, products } = useStore();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  useEffect(() => {
    const saved = safeLocalStorageGet<any>("veha_applied_coupon", null);
    setAppliedCoupon(saved);
  }, []);

  const subtotal = useMemo(() => calcCartTotal(items), [items]);
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 99;

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.type === "percent") return Math.round((subtotal * appliedCoupon.value) / 100);
    if (appliedCoupon.type === "flat") return Math.min(appliedCoupon.value, subtotal);
    if (appliedCoupon.type === "freeShipping") return shipping;
    return 0;
  }, [appliedCoupon, subtotal, shipping]);

  const discount = couponDiscount;
  const total = subtotal + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <ShoppingBag className="text-[#D06780] mb-4" size={50} />
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-2">No items to checkout</h1>
        <p className="text-gray-500 mb-6 text-center max-w-sm">
          Your shopping cart is currently empty. Add some premium VEHA SILVER items to proceed!
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-[#D06780] text-[#FDE9EC] rounded-full font-bold hover:bg-[#9C3E55] transition-all"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zip) {
      showToast("Please fill in all shipping details", "error");
      return;
    }

    // Verify stock availability
    for (const item of items) {
      const match = products.find(p => p.id === item.productId);
      if (match) {
        const availableStock = match.stock ?? 10;
        if (item.qty > availableStock) {
          showToast(`Sorry, only ${availableStock} units left for "${item.title}"`, "error");
          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderId = createOrder(
        formData,
        items,
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod,
        appliedCoupon?.code
      );

      showToast("Order Placed Successfully! 🎉", "success");
      clearCart();
      safeLocalStorageSet("veha_applied_coupon", null);
      router.push(`/order-success?id=${orderId}`);
    } catch (err) {
      showToast("Failed to place order. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D06780] hover:text-[#9C3E55] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Checkout Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FDE9EC] text-[#D06780] flex items-center justify-center text-xs font-bold">1</span>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, unit, building, street, etc."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai, Bangalore, etc."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">ZIP / Postal Code</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="6-digit pin code"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FDE9EC] text-[#D06780] flex items-center justify-center text-xs font-bold">2</span>
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* UPI */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "UPI"
                        ? "border-[#D06780] bg-[#FDE9EC]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={paymentMethod === "UPI"}
                      onChange={() => setPaymentMethod("UPI")}
                      className="accent-[#D06780] h-4 w-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                        <Sparkles size={16} className="text-[#D06780]" />
                        Instant UPI Payment
                      </p>
                      <p className="text-xs text-gray-400">Pay using GPay, PhonePe, Paytm QR</p>
                    </div>
                  </label>

                  {/* Credit/Debit Card */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "Card"
                        ? "border-[#D06780] bg-[#FDE9EC]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      checked={paymentMethod === "Card"}
                      onChange={() => setPaymentMethod("Card")}
                      className="accent-[#D06780] h-4 w-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                        <CreditCard size={16} className="text-gray-500" />
                        Credit / Debit Card
                      </p>
                      <p className="text-xs text-gray-400">Visa, Mastercard, RuPay cards</p>
                    </div>
                  </label>
                </div>

                {/* Simulated Payment Container */}
                <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                  {paymentMethod === "UPI" ? (
                    <div className="flex flex-col items-center p-3">
                      <div className="bg-white p-3 rounded-xl border shadow-sm mb-2 relative">
                        {/* Mock QR Code */}
                        <div className="w-32 h-32 bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-[#D06780] rounded-lg">
                          <span className="text-[30px]">📱</span>
                          <span className="text-[9px] text-[#D06780] font-bold mt-1 uppercase">VEHA UPI SIMULATOR</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 max-w-xs leading-normal">
                        Order will be auto-approved in the simulator. Simply complete forms and click the submit button.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 text-left space-y-3 max-w-sm mx-auto">
                      <div className="bg-white border rounded-xl p-3 shadow-xs">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Simulated Card Details</p>
                        <p className="text-sm font-mono tracking-wider font-semibold text-gray-700">•••• •••• •••• 4242</p>
                      </div>
                      <p className="text-xs text-gray-500 text-center leading-normal">
                        Simulated checkout. No actual money will be charged.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold text-base hover:bg-[#9C3E55] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Your Order...
                  </>
                ) : (
                  `Place Order — ${formatINR(total)}`
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-semibold px-2 py-1 bg-[#FDE9EC] text-[#D06780] rounded-full">
                  {totalItems} Item{totalItems !== 1 ? "s" : ""}
                </span>
              </h2>

              {/* Items List */}
              <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto mb-4 pr-1 scrollbar-thin">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="py-3 flex gap-3 first:pt-0 last:pb-0">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder-jewelry.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-gray-800 truncate leading-snug">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Qty: {item.qty} {item.variantId && `· ${item.variantId}`}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-gray-700 text-right flex-shrink-0">
                      {formatINR(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-3 pt-3 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-700">{formatINR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
                    <span className="font-semibold">-{formatINR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-700">
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-900 pt-3 border-t border-dashed border-gray-100">
                  <span className="font-bold text-base">Grand Total</span>
                  <span className="font-black text-lg text-[#D06780]">{formatINR(total)}</span>
                </div>
              </div>
            </div>

            {/* Trust badge details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">100% Secure Transaction</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Your payment details are encrypted using state-of-the-art secure protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
