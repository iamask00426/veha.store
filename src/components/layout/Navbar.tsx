"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, ChevronDown, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { categories } from "@/lib/data/categories";
import SearchBar from "./SearchBar";
import MobileNav from "./MobileNav";

const topCategories = categories.filter((c) => !c.parent).slice(0, 12);

const metalOptions = [
  { label: "Gold", color: "bg-yellow-100 text-yellow-800", href: "/metal/gold" },
  { label: "Silver", color: "bg-gray-100 text-gray-700", href: "/metal/silver" },
  { label: "Platinum", color: "bg-slate-100 text-slate-700", href: "/metal/platinum" },
  { label: "Rose Gold", color: "bg-pink-100 text-pink-700", href: "/metal/rose-gold" },
  { label: "Fashion", color: "bg-purple-100 text-purple-700", href: "/metal/fashion" },
];

const priceOptions = [
  { label: "Under ₹500", href: "/price/under-500" },
  { label: "₹500–₹2,000", href: "/price/500-2000" },
  { label: "₹2,000–₹10,000", href: "/price/2000-10000" },
  { label: "₹10,000+", href: "/price/10000-plus" },
];

interface DropdownProps {
  children: React.ReactNode;
}

function DropdownPanel({ children }: DropdownProps) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[600px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50">
      {children}
    </div>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const menuRef = useRef<NodeJS.Timeout | null>(null);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const openMenu = (name: string) => {
    if (menuRef.current) clearTimeout(menuRef.current);
    setActiveMenu(name);
  };

  const closeMenu = () => {
    menuRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const stayOpen = () => {
    if (menuRef.current) clearTimeout(menuRef.current);
  };

  return (
    <>
      {/* Search overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-gray-500">Search VEHA Jewels</span>
              <button
                onClick={() => setShowSearch(false)}
                className="ml-auto p-1 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <SearchBar onClose={() => setShowSearch(false)} autoFocus />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[#C3A070] text-lg">♦</span>
            <span
              className="text-xl font-bold text-[#745B38] leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              VEHA Jewels
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">

            {/* Categories */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("categories")}
              onMouseLeave={closeMenu}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#745B38] rounded-lg hover:bg-gray-50 transition-colors">
                Categories <ChevronDown size={14} className={activeMenu === "categories" ? "rotate-180" : ""} />
              </button>
              {activeMenu === "categories" && (
                <div onMouseEnter={stayOpen} onMouseLeave={closeMenu}>
                  <DropdownPanel>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Shop by Category
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {topCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F6EDE1] hover:text-[#745B38] transition-colors group"
                        >
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-[#745B38] leading-tight">
                            {cat.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </DropdownPanel>
                </div>
              )}
            </div>

            {/* Metal */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("metal")}
              onMouseLeave={closeMenu}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#745B38] rounded-lg hover:bg-gray-50 transition-colors">
                Metal <ChevronDown size={14} className={activeMenu === "metal" ? "rotate-180" : ""} />
              </button>
              {activeMenu === "metal" && (
                <div onMouseEnter={stayOpen} onMouseLeave={closeMenu}>
                  <DropdownPanel>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Shop by Metal
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {metalOptions.map((m) => (
                        <Link
                          key={m.label}
                          href={m.href}
                          className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${m.color} hover:opacity-80 transition-opacity`}
                        >
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  </DropdownPanel>
                </div>
              )}
            </div>

            {/* Price */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("price")}
              onMouseLeave={closeMenu}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#745B38] rounded-lg hover:bg-gray-50 transition-colors">
                Price <ChevronDown size={14} className={activeMenu === "price" ? "rotate-180" : ""} />
              </button>
              {activeMenu === "price" && (
                <div onMouseEnter={stayOpen} onMouseLeave={closeMenu}>
                  <DropdownPanel>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Shop by Budget
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {priceOptions.map((p) => (
                        <Link
                          key={p.label}
                          href={p.href}
                          className="flex items-center justify-center px-4 py-3 rounded-xl border-2 border-gray-100 text-sm font-semibold text-gray-700 hover:border-[#745B38] hover:text-[#745B38] transition-colors"
                        >
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  </DropdownPanel>
                </div>
              )}
            </div>

            <Link href="/jewelry/new" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#745B38] rounded-lg hover:bg-gray-50 transition-colors">
              New Arrivals
            </Link>
            <Link href="/sale" className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors">
              Sale
            </Link>
          </nav>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-700" />
            </button>
            <Link href="/account" className="p-2.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Account">
              <User size={20} className="text-gray-700" />
            </Link>
            <Link href="/wishlist" className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Wishlist">
              <Heart size={20} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Cart">
              <ShoppingBag size={20} className="text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#745B38] text-[#F6EDE1] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Nav trigger */}
          <div className="md:hidden ml-auto">
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
