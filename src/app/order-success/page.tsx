"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context";
import type { Order } from "@/types";
import { formatINR } from "@/lib/utils";
import { CheckCircle2, ArrowRight, ClipboardCopy, ShoppingBag, Truck, Calendar } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { orders } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderId && orders.length > 0) {
      const matched = orders.find((o) => o.id === orderId);
      if (matched) {
        setOrder(matched);
      }
    }
  }, [orderId, orders]);

  const handleCopy = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <CheckCircle2 size={50} className="text-gray-300 mb-4" />
        <h1 className="text-xl font-serif font-bold text-gray-800 mb-2">No Order Information</h1>
        <p className="text-sm text-gray-500 mb-4">No order ID was found in the URL params.</p>
        <Link href="/" className="px-6 py-2 bg-[#D06780] text-white rounded-full font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
          <CheckCircle2 size={36} strokeWidth={2.5} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
          Thank you for your order!
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-6">
          We have received your order and are preparing it for shipment. A confirmation email has been sent to{" "}
          <span className="font-semibold text-gray-700">{order?.customer.email ?? "your inbox"}</span>.
        </p>

        {/* Order ID block */}
        <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 mb-8">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order ID</span>
          <span className="font-mono font-bold text-gray-800">{orderId}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
            title="Copy Order ID"
          >
            {copied ? (
              <span className="text-[10px] text-green-600 font-bold px-1.5 py-0.5 bg-green-50 rounded">Copied!</span>
            ) : (
              <ClipboardCopy size={14} />
            )}
          </button>
        </div>

        {/* Order details summary if found */}
        {order && (
          <div className="border border-gray-100 rounded-2xl p-5 text-left mb-8 space-y-4">
            <h3 className="font-bold text-gray-800 pb-2 border-b border-gray-50 text-sm uppercase tracking-wide">
              Delivery Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-gray-400 font-medium">Ship To</p>
                <p className="font-bold text-gray-700">{order.customer.name}</p>
                <p className="text-gray-500 leading-normal">
                  {order.customer.address}, {order.customer.city} - {order.customer.zip}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} />
                  <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck size={14} />
                  <span>Estimated Delivery: 3-5 Working Days</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-50 text-xs">
              <h3 className="font-bold text-gray-800 mb-2.5 uppercase tracking-wide">Order Items</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                {order.items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex justify-between items-center text-gray-600">
                    <span className="truncate max-w-[80%]">
                      {item.title} <span className="text-gray-400 font-medium font-mono">x{item.qty}</span>
                    </span>
                    <span className="font-semibold text-gray-700">{formatINR(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-sm font-bold text-gray-800">
              <span>Amount Paid</span>
              <span className="text-[#D06780] font-black text-base">{formatINR(order.total)}</span>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
            <ShoppingBag size={15} />
          </Link>
          <Link
            href="/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#D06780] text-[#FDE9EC] font-bold text-sm rounded-xl hover:bg-[#9C3E55] transition-all shadow-md"
          >
            View in Admin Panel
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-2 border-[#D06780] border-t-transparent rounded-full animate-spin mb-4" />
        <h1 className="text-xl font-serif font-bold text-gray-800 mb-2">Loading Order...</h1>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
