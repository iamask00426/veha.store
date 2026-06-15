import type { Category } from "@/types";

export const categories: Category[] = [
  // Jewellery top-level
  { slug: "rings", name: "Rings", icon: "💍" },
  { slug: "necklaces", name: "Necklaces & Chains", icon: "📿" },
  { slug: "earrings", name: "Earrings", icon: "✨" },
  { slug: "bangles", name: "Bangles & Bracelets", icon: "🌀" },
  { slug: "mangalsutra", name: "Mangalsutra", icon: "🪢" },
  { slug: "pendants", name: "Pendants", icon: "🔮" },
  { slug: "anklets", name: "Anklets", icon: "🦶" },
  { slug: "nosepins", name: "Nosepins & Nath", icon: "🌸" },
  { slug: "maangtikka", name: "Maang Tikka & Matha Patti", icon: "👑" },
  { slug: "brooches", name: "Brooches & Pins", icon: "📌" },
  { slug: "sets", name: "Jewellery Sets", icon: "💎" },
  // Watches top-level
  { slug: "watches", name: "Watches", icon: "⌚" },
  // Subcategories - Rings
  { slug: "engagement-rings", name: "Engagement Rings", icon: "💍", parent: "rings" },
  { slug: "wedding-bands", name: "Wedding Bands", icon: "💍", parent: "rings" },
  { slug: "solitaire-rings", name: "Solitaire Rings", icon: "💎", parent: "rings" },
  { slug: "cocktail-rings", name: "Cocktail Rings", icon: "🍸", parent: "rings" },
  // Subcategories - Watches
  { slug: "mens-watches", name: "Men's Watches", icon: "⌚", parent: "watches" },
  { slug: "womens-watches", name: "Women's Watches", icon: "⌚", parent: "watches" },
  { slug: "smart-watches", name: "Smart Watches", icon: "📱", parent: "watches" },
  { slug: "luxury-watches", name: "Luxury Watches", icon: "🏆", parent: "watches" },
  { slug: "sports-watches", name: "Sports Watches", icon: "🏃", parent: "watches" },
  // Subcategories - Necklaces
  { slug: "gold-chains", name: "Gold Chains", icon: "✨", parent: "necklaces" },
  { slug: "diamond-necklaces", name: "Diamond Necklaces", icon: "💎", parent: "necklaces" },
  { slug: "pearl-necklaces", name: "Pearl Necklaces", icon: "🤍", parent: "necklaces" },
  { slug: "temple-necklaces", name: "Temple Jewellery Necklaces", icon: "🛕", parent: "necklaces" },
];
