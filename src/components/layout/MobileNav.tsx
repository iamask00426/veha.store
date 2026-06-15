"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight, Search, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchBar from "./SearchBar";

const navSections = [
  {
    title: "Jewellery",
    items: [
      { label: "Rings", href: "/category/rings" },
      { label: "Necklaces & Chains", href: "/category/necklaces" },
      { label: "Earrings", href: "/category/earrings" },
      { label: "Bangles & Bracelets", href: "/category/bangles" },
      { label: "Mangalsutra", href: "/category/mangalsutra" },
      { label: "Pendants", href: "/category/pendants" },
      { label: "Anklets", href: "/category/anklets" },
      { label: "Jewellery Sets", href: "/category/sets" },
    ],
  },
  {
    title: "Watches",
    items: [
      { label: "Men's Watches", href: "/category/mens-watches" },
      { label: "Women's Watches", href: "/category/womens-watches" },
      { label: "Smart Watches", href: "/category/smart-watches" },
      { label: "Luxury Watches", href: "/category/luxury-watches" },
    ],
  },
  {
    title: "Gifts",
    items: [
      { label: "Under ₹999", href: "/jewelry/budget" },
      { label: "Under ₹2,999", href: "/gifts/under-2999" },
      { label: "Gift Sets", href: "/gifts/sets" },
      { label: "Personalized", href: "/gifts/personalized" },
    ],
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const toggleSection = (title: string) => {
    setExpandedSection((prev) => (prev === title ? null : title));
  };

  const close = () => {
    setIsOpen(false);
    setExpandedSection(null);
    setShowSearch(false);
  };

  return (
    <>
      {/* Hamburger trigger */}
      <div className="flex items-center gap-3 md:hidden">
        <Link href="/wishlist" className="relative p-2">
          <Heart size={22} className="text-gray-700" />
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link href="/cart" className="relative p-2">
          <ShoppingBag size={22} className="text-gray-700" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#745B38] text-[#F6EDE1] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} className="text-gray-700" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={close} className="flex items-center gap-2">
            <span className="text-lg font-serif font-bold text-[#745B38]">♦ VEHA Jewels</span>
          </Link>
          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100">
          {showSearch ? (
            <SearchBar onClose={close} autoFocus />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 w-full bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-400"
            >
              <Search size={16} />
              <span>Search jewelry, watches...</span>
            </button>
          )}
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navSections.map((section) => (
            <div key={section.title} className="border-b border-gray-50">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {section.title}
                {expandedSection === section.title ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </button>
              {expandedSection === section.title && (
                <div className="bg-gray-50 pb-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={close}
                      className="block px-8 py-2.5 text-sm text-gray-600 hover:text-[#745B38] hover:bg-gray-100 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 px-4 py-4 space-y-2">
          <Link
            href="/login"
            onClick={close}
            className="flex items-center justify-center w-full py-2.5 border-2 border-[#745B38] text-[#745B38] font-semibold text-sm rounded-full hover:bg-[#745B38] hover:text-white transition-colors"
          >
            Login / Sign Up
          </Link>
          <Link
            href="/cart"
            onClick={close}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#745B38] text-[#F6EDE1] font-semibold text-sm rounded-full hover:bg-[#5a4429] transition-colors"
          >
            <ShoppingBag size={16} />
            View Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      </div>
    </>
  );
}
