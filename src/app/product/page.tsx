"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context";
import { reviews } from "@/lib/data";
import ProductClientPage from "./ProductClientPage";

function ProductPageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const { products, loaded } = useStore();

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [products, slug]);

  const productReviews = useMemo(() => {
    if (!product) return [];
    return reviews.filter((r) => r.productId === product.id);
  }, [product]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-[#D06780] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product || product.isActive === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-6 max-w-md">
          The product you are looking for does not exist or has been removed from the storefront.
        </p>
        <a 
          href="/" 
          className="px-6 py-2.5 bg-[#D06780] text-white rounded-xl font-bold hover:bg-[#9C3E55] transition-all shadow-md"
        >
          Back to Storefront
        </a>
      </div>
    );
  }

  return (
    <ProductClientPage
      initialProduct={product}
      productReviews={productReviews}
      slug={slug}
    />
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-[#D06780] border-t-transparent rounded-full" />
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  );
}
