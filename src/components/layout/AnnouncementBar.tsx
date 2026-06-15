"use client";

import { useState } from "react";
import { X } from "lucide-react";

const messages = [
  "✨ Free Shipping on all orders above ₹499",
  "💎 Certification on gold & silver jewelry",
  "🔄 Easy returns with hassle free refunds",
  "✅ 100% Authentic & Certified Products",
];

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const marqueeText = messages.join("   ◆   ");
  const doubled = marqueeText + "   ◆   " + marqueeText;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#745B38] via-[#8A775C] to-[#745B38] text-[#F6EDE1] py-2 select-none">
      <div className="flex items-center">
        <div className="flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
            <span className="text-xs font-medium tracking-wide px-4">{doubled}</span>
            <span className="text-xs font-medium tracking-wide px-4">{doubled}</span>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 mr-3 ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={14} className="text-[#F6EDE1]" />
        </button>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
