"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types";

interface ProductTabsProps {
  description?: string;
  material: string;
  metal: string;
  collections: string[];
  reviews: Review[];
}

function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < Math.round(stars)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function ProductTabs({
  description,
  material,
  metal,
  collections,
  reviews,
}: ProductTabsProps) {
  const [active, setActive] = useState<"description" | "specifications" | "reviews">(
    "description"
  );

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${reviews.length})` },
  ] as const;

  return (
    <div className="mt-8">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-5 py-3 text-sm font-semibold transition-all duration-200 relative ${
              active === tab.id
                ? "text-[#745B38]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#745B38] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {active === "description" && (
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            {description ? (
              <p>{description}</p>
            ) : (
              <p className="text-gray-500 italic">No description available.</p>
            )}
          </div>
        )}

        {active === "specifications" && (
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Metal", value: metal },
                  { label: "Material", value: material },
                  {
                    label: "Collections",
                    value:
                      collections.length > 0
                        ? collections
                            .map((c) => c.replace(/-/g, " "))
                            .join(", ")
                        : "—",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-[#fdf7f0]" : "bg-white"}
                  >
                    <td className="px-5 py-3 font-semibold text-gray-600 w-40 capitalize">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-gray-800 capitalize">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === "reviews" && (
          <div className="space-y-5">
            {reviews.length === 0 ? (
              <p className="text-gray-500 italic text-sm">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex gap-4 p-4 bg-[#fdf7f0] rounded-2xl border border-[#eedec8]"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={review.avatar}
                        alt={review.customerName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#C3A070]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#745B38] flex items-center justify-center text-white font-bold text-sm">
                        {review.customerName.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {review.customerName}
                        </p>
                        <p className="text-xs text-gray-400">{review.city}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StarRow stars={review.stars} />
                        {review.date && (
                          <span className="text-xs text-gray-400">
                            {new Date(review.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
