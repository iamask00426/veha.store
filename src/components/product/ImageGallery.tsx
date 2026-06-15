"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [mainIdx, setMainIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);

  const safeImages = images.length > 0 ? images : ["/placeholder-jewelry.jpg"];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPos({ x, y });
    },
    []
  );

  const prev = () => setMainIdx((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  const next = () => setMainIdx((i) => (i === safeImages.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 w-full">
      {/* Thumbnail strip */}
      <div className="flex flex-row md:flex-col gap-2 md:w-20 overflow-x-auto md:overflow-y-auto md:max-h-[520px] scrollbar-thin pb-1 md:pb-0">
        {safeImages.map((src, i) => (
          <button
            key={i}
            onClick={() => setMainIdx(i)}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === mainIdx
                ? "border-[#D06780] ring-2 ring-[#D06780] ring-offset-1"
                : "border-gray-200 hover:border-[#A1A8B8]"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative">
        <div
          ref={mainRef}
          className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in select-none"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={safeImages[mainIdx]}
            alt={`${title} – image ${mainIdx + 1}`}
            fill
            className={`object-cover transition-transform duration-300 ${
              zoom ? "scale-150" : "scale-100"
            }`}
            style={
              zoom
                ? {
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }
                : {}
            }
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />

          {/* Nav arrows */}
          {safeImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-1.5 shadow-md transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} className="text-gray-700" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-1.5 shadow-md transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={18} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {safeImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMainIdx(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === mainIdx
                      ? "w-4 h-1.5 bg-[#D06780]"
                      : "w-1.5 h-1.5 bg-white/70"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Zoom hint */}
          {!zoom && (
            <div className="absolute top-3 right-3 bg-black/40 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none">
              Hover to zoom
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
