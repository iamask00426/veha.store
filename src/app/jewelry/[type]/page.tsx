import { Suspense } from "react";
import ListingContent from "./ListingContent";

export default async function JewelryTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const resolvedParams = await params;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#745B38] border-t-transparent rounded-full" />
        </div>
      }
    >
      <ListingContent type={resolvedParams.type} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return [
    { type: "fashion" },
    { type: "silver" },
    { type: "fine" },
    { type: "rings" },
    { type: "earrings" },
    { type: "necklaces" },
    { type: "bangles" },
    { type: "bracelets" },
    { type: "pendants" },
    { type: "chains" },
    { type: "mangalsutra" },
    { type: "anklets" }
  ];
}
