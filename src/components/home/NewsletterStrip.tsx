"use client";

import { useState } from "react";

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-14 bg-gradient-to-r from-[#D06780] via-[#E591A4] to-[#D06780]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <span className="text-[#A1A8B8] text-2xl mb-3 block">✦</span>
        <h2
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Join the VEHA SILVER Family
        </h2>
        <p className="text-[#d4c4ac] text-sm mb-7">
          Get exclusive offers, new arrivals and style inspiration — straight to your inbox.
        </p>

        {submitted ? (
          <div className="bg-white/20 rounded-2xl px-6 py-4 inline-block">
            <p className="text-white font-semibold">✨ You&apos;re in! Thank you for joining.</p>
            <p className="text-[#d4c4ac] text-sm mt-1">Check your inbox for a welcome gift.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email address"
                className="w-full px-5 py-3 rounded-full bg-white text-gray-800 placeholder:text-gray-400 text-sm outline-none focus:ring-2 focus:ring-[#A1A8B8] transition-all"
              />
              {error && <p className="text-red-300 text-xs mt-1 text-left px-4">{error}</p>}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#A1A8B8] text-[#1a1a1a] font-semibold text-sm rounded-full hover:bg-[#d4b47a] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[#9c9087] text-xs mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
