import { notFound } from "next/navigation";
import { products, reviews } from "@/lib/data";
import ProductClientPage from "./ProductClientPage";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <ProductClientPage
      initialProduct={product}
      productReviews={productReviews}
      slug={resolvedParams.slug}
    />
  );
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
