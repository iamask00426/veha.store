import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { brands, products } from "@/lib/data";
import { formatINR, getDiscountLabel } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const resolvedParams = await params;
  const brand = brands.find((b) => b.slug === resolvedParams.slug);

  if (!brand) {
    notFound();
  }

  const brandProducts = products.filter((p) => p.brandSlug === brand.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-[#3d2f1e] to-[#745B38] overflow-hidden">
        {brand.banner && (
          <Image
            src={brand.banner}
            alt={brand.name}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Brand info overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {brand.logo ? (
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl mb-4 bg-white">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#C3A070] flex items-center justify-center text-white text-3xl font-bold shadow-2xl mb-4">
              {brand.name.charAt(0)}
            </div>
          )}
          <h1 className="text-4xl font-serif font-bold text-white drop-shadow-lg">
            {brand.name}
          </h1>
          {brand.tagline && (
            <p className="text-[#F6EDE1]/90 text-base mt-2 max-w-md">
              {brand.tagline}
            </p>
          )}
          {brand.country && (
            <p className="text-[#F6EDE1]/60 text-sm mt-1">🌍 {brand.country}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/brands"
          className="inline-flex items-center gap-2 text-sm text-[#745B38] font-semibold hover:text-[#5a4428] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          All Brands
        </Link>

        {/* Products section */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-serif font-bold text-gray-900">
            Products by {brand.name}
          </h2>
          <span className="text-sm text-gray-500">
            {brandProducts.length} products
          </span>
        </div>

        {brandProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">💎</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              {brand.name} hasn&apos;t added products yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {brandProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#C3A070] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.images[0] ?? "/placeholder-jewelry.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  {product.discountPct > 0 && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {getDiscountLabel(product.discountPct)}
                    </span>
                  )}
                  {product.badges.includes("New") && (
                    <span className="absolute top-2 right-2 bg-[#745B38] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[#745B38] transition-colors leading-snug">
                    {product.title}
                  </h3>
                  <StarRating
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    size="sm"
                  />
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="font-bold text-[#745B38] text-sm">
                      {formatINR(product.price)}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatINR(product.mrp)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}
