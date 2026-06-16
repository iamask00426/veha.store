"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/context";
import type { Product, Review } from "@/types";
import { formatINR, getDiscountLabel } from "@/lib/utils";
import ImageGallery from "@/components/product/ImageGallery";
import ProductTabs from "@/components/product/ProductTabs";
import ProductActions from "@/components/product/ProductActions";
import StarRating from "@/components/ui/StarRating";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductClientPageProps {
  initialProduct: Product;
  productReviews: Review[];
  slug: string;
}

function RelatedProducts({ current, allProducts }: { current: Product; allProducts: Product[] }) {
  const related = useMemo(() => {
    return allProducts
      .filter(
        (p) =>
          p.id !== current.id &&
          (p.brandSlug === current.brandSlug ||
            p.categorySlug === current.categorySlug)
      )
      .slice(0, 8);
  }, [current, allProducts]);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 mb-8">
      <h2 className="text-xl font-serif font-bold text-gray-900 mb-5">
        You May Also Like
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
        {related.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="flex-shrink-0 w-44 bg-white rounded-2xl border border-gray-100 hover:border-[#A1A8B8] hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="relative w-full h-44 bg-gray-50">
              <Image
                src={p.images[0] ?? "/placeholder-jewelry.jpg"}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="176px"
              />
              {p.discountPct > 0 && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {getDiscountLabel(p.discountPct)}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-[10px] font-semibold text-[#A1A8B8] uppercase tracking-wide truncate">
                VEHA SILVER
              </p>
              <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[#D06780] transition-colors leading-snug">
                {p.title}
              </h3>
              <p className="text-sm font-bold text-[#D06780] mt-1">
                {formatINR(p.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProductClientPage({ initialProduct, productReviews, slug }: ProductClientPageProps) {
  const { products } = useStore();

  // Find latest product details (sync with admin changes)
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug) ?? initialProduct;
  }, [products, slug, initialProduct]);

  if (!product) {
    notFound();
  }

  const discountLabel = product.discountPct > 0 ? getDiscountLabel(product.discountPct) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#D06780] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/jewelry/${product.categorySlug}`}
          className="capitalize hover:text-[#D06780] transition-colors"
        >
          {product.categorySlug.replace(/-/g, " ")}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium line-clamp-1">
          {product.title}
        </span>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* LEFT: Gallery (sticky) */}
            <div className="p-5 lg:p-8 lg:sticky lg:top-4 lg:self-start">
              <ImageGallery images={product.images} title={product.title} />
            </div>

            {/* RIGHT: Product info */}
            <div className="p-5 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-100">
              {/* Brand + Category */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#A1A8B8] uppercase tracking-widest">
                  VEHA SILVER
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full capitalize">
                  {product.categorySlug.replace(/-/g, " ")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
                <span className="text-xs text-gray-400">
                  {product.reviewCount > 0
                    ? `${product.reviewCount.toLocaleString()} reviews`
                    : "No reviews yet"}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-3xl font-extrabold text-[#D06780]">
                  {formatINR(product.price)}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through font-medium">
                      {formatINR(product.mrp)}
                    </span>
                    <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {discountLabel}
                    </span>
                  </>
                )}
              </div>

              {/* Material line */}
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium text-gray-800">Material:</span>{" "}
                {product.material} &bull; <span className="capitalize">{product.metal.replace(/-/g, " ")}</span>
              </p>

              {/* Badge pills */}
              {(product.virtualTryOn || product.sameDayDelivery) && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.virtualTryOn && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
                      ✨ Virtual Try-On
                    </span>
                  )}
                  {product.sameDayDelivery && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                      ⚡ Same Day Delivery
                    </span>
                  )}
                </div>
              )}

              {/* Interactive actions */}
              <ProductActions product={product} />
            </div>
          </div>

          {/* Tabs section */}
          <div className="px-5 lg:px-8 pb-8">
            <ProductTabs
              description={product.description}
              material={product.material}
              metal={product.metal}
              collections={product.collections}
              reviews={productReviews}
            />
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts current={product} allProducts={products} />
      </div>
    </div>
  );
}
