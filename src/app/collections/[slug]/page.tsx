import { Suspense } from "react";
import { collections } from "@/lib/data";
import CollectionContent from "./CollectionContent";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#D06780] border-t-transparent rounded-full" />
        </div>
      }
    >
      <CollectionContent slug={resolvedParams.slug} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}
