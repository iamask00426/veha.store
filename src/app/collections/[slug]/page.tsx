import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { collections, products } from "@/lib/data";
import { formatINR, getDiscountLabel } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const collection = collections.find((c) => c.slug === resolvedParams.slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = products.filter((p) =>
    p.collections.includes(collection.slug)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[#3d2f1e] to-[#745B38] overflow-hidden">
        {collection.banner && (
          <Image
            src={collection.banner}
            alt={collection.name}
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-10">
          <span className="inline-block bg-[#C3A070]/20 border border-[#C3A070] text-[#F6EDE1] text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-widest mb-3">
            Collection
          </span>
          <h1 className="text-4xl font-serif font-bold text-white drop-shadow-lg">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-[#F6EDE1]/80 text-sm mt-2 max-w-lg">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#745B38] font-semibold hover:text-[#5a4428] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Products */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-serif font-bold text-gray-900">
            {collection.name} — All Pieces
          </h2>
          <span className="text-sm text-gray-500">
            {collectionProducts.length} products
          </span>
        </div>

        {collectionProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">💎</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No products in this collection
            </h3>
            <p className="text-gray-500">Check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {collectionProducts.map((product) => (
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
                  {product.badges.includes("Exclusive") && (
                    <span className="absolute top-2 right-2 bg-[#745B38] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      EXCLUSIVE
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[11px] font-semibold text-[#C3A070] uppercase tracking-wide truncate">
                    {product.brandSlug.replace(/-/g, " ")}
                  </p>
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
  return collections.map((c) => ({ slug: c.slug }));
}
