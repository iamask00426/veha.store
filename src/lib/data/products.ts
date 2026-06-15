import type { Product } from "@/types";

const ringImages = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=600&auto=format&fit=crop&q=80"
];

const earringImages = [
  "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80"
];

const necklaceImages = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1611085583191-a3b1a1a29902?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80"
];

const watchImages = [
  "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80"
];

const braceletImages = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&auto=format&fit=crop&q=80"
];

const fallbackImages = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80"
];

const img = (seed: string, w = 600, h = 600) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash);

  const s = seed.toLowerCase();
  if (s.includes("ring")) {
    return ringImages[index % ringImages.length];
  }
  if (s.includes("earring") || s.includes("jhumka") || s.includes("stud")) {
    return earringImages[index % earringImages.length];
  }
  if (s.includes("necklace") || s.includes("choker") || s.includes("pendant") || s.includes("mangalsutra") || s.includes("har")) {
    return necklaceImages[index % necklaceImages.length];
  }
  if (s.includes("watch")) {
    return watchImages[index % watchImages.length];
  }
  if (s.includes("bracelet") || s.includes("bangle") || s.includes("kada")) {
    return braceletImages[index % braceletImages.length];
  }
  return fallbackImages[index % fallbackImages.length];
};

export const products: Product[] = [
  // ─── RINGS (p1–p40) ────────────────────────────────────────────────────────
  {
    id: "p1", slug: "tanishq-diamond-solitaire-ring", title: "Tanishq Solitaire Diamond Ring 18K", brandSlug: "tanishq", categorySlug: "rings", subcategory: "Solitaire Rings",
    metal: "gold", material: "18K Yellow Gold", collections: ["diamond-solitaires", "bridal-2024"], occasions: ["engagement", "wedding"],
    price: 45000, mrp: 52000, discountPct: 13, images: [img("ring-solitaire-1"), img("ring-solitaire-2")],
    badges: ["Bestseller"], rating: 4.8, reviewCount: 312, variants: [
      { id: "v1a", label: "Size 5", price: 45000, mrp: 52000, inStock: true },
      { id: "v1b", label: "Size 6", price: 45500, mrp: 52500, inStock: true },
      { id: "v1c", label: "Size 7", price: 46000, mrp: 53000, inStock: false },
    ], virtualTryOn: true, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p2", slug: "bluestone-floral-diamond-ring", title: "BlueStone Floral Diamond Ring 14K Rose Gold", brandSlug: "bluestone", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "rose-gold", material: "14K Rose Gold", collections: ["valentines-edit", "festive-glow"], occasions: ["everyday", "gifting"],
    price: 18500, mrp: 22000, discountPct: 16, images: [img("ring-floral-1"), img("ring-floral-2")],
    badges: ["New", "Virtual Try-On"], rating: 4.5, reviewCount: 89, variants: [
      { id: "v2a", label: "Size 5", price: 18500, mrp: 22000, inStock: true },
      { id: "v2b", label: "Size 6", price: 19000, mrp: 22500, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p3", slug: "caratlane-everyday-gold-ring", title: "CaratLane Everyday Band Ring 18K", brandSlug: "caratlane", categorySlug: "rings", subcategory: "Wedding Bands",
    metal: "gold", material: "18K Yellow Gold", collections: ["everyday-essentials", "minimalist-gold"], occasions: ["everyday", "wedding"],
    price: 12000, mrp: 14000, discountPct: 14, images: [img("ring-band-1"), img("ring-band-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 204, variants: [
      { id: "v3a", label: "Size 5", price: 12000, mrp: 14000, inStock: true },
      { id: "v3b", label: "Size 6", price: 12400, mrp: 14400, inStock: true },
      { id: "v3c", label: "Size 7", price: 12800, mrp: 14800, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p4", slug: "png-emerald-cocktail-ring", title: "P.N. Gadgil Emerald Cocktail Ring 22K", brandSlug: "png-jewellers", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "gold", material: "22K Yellow Gold", collections: ["royal-heritage", "emerald-edit"], occasions: ["festive", "wedding"],
    price: 78000, mrp: 88000, discountPct: 11, images: [img("ring-emerald-1"), img("ring-emerald-2")],
    badges: ["Exclusive"], rating: 4.7, reviewCount: 45, variants: [
      { id: "v4a", label: "Size 6", price: 78000, mrp: 88000, inStock: true },
      { id: "v4b", label: "Size 7", price: 79500, mrp: 89500, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p5", slug: "giva-silver-stackable-ring", title: "GIVA 925 Silver Stackable Rings (Set of 3)", brandSlug: "giva", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "everyday-essentials"], occasions: ["everyday", "gifting"],
    price: 1299, mrp: 2499, discountPct: 48, images: [img("ring-silver-1"), img("ring-silver-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.3, reviewCount: 567, variants: [
      { id: "v5a", label: "Size 5", price: 1299, mrp: 2499, inStock: true },
      { id: "v5b", label: "Size 6", price: 1299, mrp: 2499, inStock: true },
      { id: "v5c", label: "Size 7", price: 1299, mrp: 2499, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p6", slug: "melorra-daily-wear-diamond-ring", title: "Melorra Daily Wear Diamond Ring", brandSlug: "melorra", categorySlug: "rings", subcategory: "Engagement Rings",
    metal: "gold", material: "18K Yellow Gold", collections: ["everyday-essentials", "office-to-evening"], occasions: ["everyday"],
    price: 9500, mrp: 11000, discountPct: 14, images: [img("ring-daily-1"), img("ring-daily-2")],
    badges: ["New"], rating: 4.4, reviewCount: 78, variants: [
      { id: "v6a", label: "Size 5", price: 9500, mrp: 11000, inStock: true },
      { id: "v6b", label: "Size 6", price: 9800, mrp: 11300, inStock: false },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p7", slug: "tiffany-setting-platinum-ring", title: "Tiffany Setting Platinum Engagement Ring", brandSlug: "tiffany", categorySlug: "rings", subcategory: "Engagement Rings",
    metal: "platinum", material: "Platinum 950", collections: ["diamond-solitaires", "platinum-love"], occasions: ["engagement", "wedding"],
    price: 285000, mrp: 310000, discountPct: 8, images: [img("ring-tiffany-1"), img("ring-tiffany-2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 22, variants: [
      { id: "v7a", label: "Size 5", price: 285000, mrp: 310000, inStock: true },
      { id: "v7b", label: "Size 6", price: 290000, mrp: 315000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p8", slug: "amrapali-kundan-ring", title: "Amrapali Kundan Meenakari Ring", brandSlug: "amrapali", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "gold", material: "Gold Plated Brass", collections: ["kundan-collection", "festive-glow"], occasions: ["festive", "wedding"],
    price: 2800, mrp: 4500, discountPct: 38, images: [img("ring-kundan-1"), img("ring-kundan-2")],
    badges: ["Trending"], rating: 4.2, reviewCount: 134, variants: [
      { id: "v8a", label: "Free Size", price: 2800, mrp: 4500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p9", slug: "nakshatra-ruby-ring", title: "Nakshatra Ruby and Diamond Ring", brandSlug: "nakshatra", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "gold", material: "18K Yellow Gold", collections: ["ruby-royale", "statement-pieces"], occasions: ["festive", "gifting"],
    price: 35000, mrp: 41000, discountPct: 15, images: [img("ring-ruby-1"), img("ring-ruby-2")],
    badges: ["Exclusive"], rating: 4.7, reviewCount: 31, variants: [
      { id: "v9a", label: "Size 5", price: 35000, mrp: 41000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p10", slug: "orra-platinum-ring", title: "Orra Platinum Diamond Band Ring", brandSlug: "orra", categorySlug: "rings", subcategory: "Wedding Bands",
    metal: "platinum", material: "Platinum 950", collections: ["platinum-love", "couple-bands"], occasions: ["wedding"],
    price: 55000, mrp: 62000, discountPct: 11, images: [img("ring-platinum-1"), img("ring-platinum-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 58, variants: [
      { id: "v10a", label: "Size 5", price: 55000, mrp: 62000, inStock: true },
      { id: "v10b", label: "Size 6", price: 56000, mrp: 63000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },

  // ─── NECKLACES (p11–p50) ───────────────────────────────────────────────────
  {
    id: "p11", slug: "tanishq-riva-diamond-necklace", title: "Tanishq Riva Diamond Necklace 18K", brandSlug: "tanishq", categorySlug: "necklaces", subcategory: "Diamond Necklaces",
    metal: "gold", material: "18K White Gold", collections: ["bridal-2024", "diamond-solitaires"], occasions: ["wedding", "festive"],
    price: 125000, mrp: 145000, discountPct: 14, images: [img("necklace-riva-1"), img("necklace-riva-2")],
    badges: ["Bestseller"], rating: 4.9, reviewCount: 87, variants: [
      { id: "v11a", label: "16 inch", price: 125000, mrp: 145000, inStock: true },
      { id: "v11b", label: "18 inch", price: 128000, mrp: 148000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p12", slug: "kalyan-temple-necklace", title: "Kalyan Jewellers Temple Necklace 22K", brandSlug: "kalyan-jewellers", categorySlug: "necklaces", subcategory: "Temple Necklaces",
    metal: "gold", material: "22K Yellow Gold", collections: ["temple-jewellery", "south-indian-jewellery"], occasions: ["wedding", "festive"],
    price: 88000, mrp: 99000, discountPct: 11, images: [img("necklace-temple-1"), img("necklace-temple-2")],
    badges: ["New"], rating: 4.7, reviewCount: 56, variants: [
      { id: "v12a", label: "18 inch", price: 88000, mrp: 99000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p13", slug: "giva-silver-layered-necklace", title: "GIVA 925 Silver Layered Pendant Necklace", brandSlug: "giva", categorySlug: "necklaces", subcategory: "Pendants",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "everyday-essentials"], occasions: ["everyday", "gifting"],
    price: 999, mrp: 1999, discountPct: 50, images: [img("necklace-silver-1"), img("necklace-silver-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.4, reviewCount: 892, variants: [
      { id: "v13a", label: "16 inch", price: 999, mrp: 1999, inStock: true },
      { id: "v13b", label: "18 inch", price: 999, mrp: 1999, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p14", slug: "bluestone-pearl-drop-necklace", title: "BlueStone Pearl Drop Necklace 18K", brandSlug: "bluestone", categorySlug: "necklaces", subcategory: "Pearl Necklaces",
    metal: "gold", material: "18K Yellow Gold", collections: ["pearl-collection", "office-to-evening"], occasions: ["everyday", "festive"],
    price: 22000, mrp: 26000, discountPct: 15, images: [img("necklace-pearl-1"), img("necklace-pearl-2")],
    badges: ["New"], rating: 4.5, reviewCount: 43, variants: [
      { id: "v14a", label: "18 inch", price: 22000, mrp: 26000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p15", slug: "malabar-gold-chain-22k", title: "Malabar Gold Box Chain Necklace 22K", brandSlug: "malabar-gold", categorySlug: "necklaces", subcategory: "Gold Chains",
    metal: "gold", material: "22K Yellow Gold", collections: ["everyday-essentials", "minimalist-gold"], occasions: ["everyday"],
    price: 35000, mrp: 39000, discountPct: 10, images: [img("necklace-chain-1"), img("necklace-chain-2")],
    badges: [], rating: 4.6, reviewCount: 178, variants: [
      { id: "v15a", label: "16 inch", price: 35000, mrp: 39000, inStock: true },
      { id: "v15b", label: "18 inch", price: 38000, mrp: 42000, inStock: true },
      { id: "v15c", label: "20 inch", price: 42000, mrp: 47000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p16", slug: "amrapali-polki-necklace", title: "Amrapali Polki and Emerald Necklace Set", brandSlug: "amrapali", categorySlug: "necklaces", subcategory: "Diamond Necklaces",
    metal: "gold", material: "Gold Plated Silver", collections: ["polki-collection", "royal-heritage"], occasions: ["wedding", "festive"],
    price: 15000, mrp: 22000, discountPct: 32, images: [img("necklace-polki-1"), img("necklace-polki-2")],
    badges: ["Trending", "Exclusive"], rating: 4.8, reviewCount: 67, variants: [
      { id: "v16a", label: "One Size", price: 15000, mrp: 22000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p17", slug: "swarovski-infinity-necklace", title: "Swarovski Infinity Crystal Pendant Necklace", brandSlug: "swarovski", categorySlug: "necklaces", subcategory: "Pendants",
    metal: "silver", material: "Rhodium Plated Metal", collections: ["valentines-edit", "gifts-under-5000"], occasions: ["everyday", "gifting"],
    price: 3500, mrp: 5000, discountPct: 30, images: [img("necklace-swarovski-1"), img("necklace-swarovski-2")],
    badges: ["New"], rating: 4.3, reviewCount: 234, variants: [
      { id: "v17a", label: "15 inch", price: 3500, mrp: 5000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p18", slug: "candere-diamond-mangalsutra", title: "Candere Diamond Mangalsutra Necklace", brandSlug: "candere", categorySlug: "necklaces", subcategory: "Diamond Necklaces",
    metal: "gold", material: "18K Yellow Gold", collections: ["bridal-2024", "diamond-solitaires"], occasions: ["wedding"],
    price: 32000, mrp: 38000, discountPct: 16, images: [img("necklace-mangal-1"), img("necklace-mangal-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 122, variants: [
      { id: "v18a", label: "16 inch", price: 32000, mrp: 38000, inStock: true },
      { id: "v18b", label: "18 inch", price: 33500, mrp: 39500, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p19", slug: "caratlane-lab-diamond-necklace", title: "CaratLane Lab Diamond Tennis Necklace", brandSlug: "caratlane", categorySlug: "necklaces", subcategory: "Diamond Necklaces",
    metal: "gold", material: "14K White Gold", collections: ["diamond-solitaires", "statement-pieces"], occasions: ["festive", "gifting"],
    price: 65000, mrp: 75000, discountPct: 13, images: [img("necklace-tennis-1"), img("necklace-tennis-2")],
    badges: ["New", "Exclusive"], rating: 4.7, reviewCount: 38, variants: [
      { id: "v19a", label: "16 inch", price: 65000, mrp: 75000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p20", slug: "sukkhi-kundan-necklace-set", title: "Sukkhi Kundan Necklace Jewellery Set", brandSlug: "sukkhi", categorySlug: "necklaces", subcategory: "Temple Necklaces",
    metal: "gold", material: "Gold Plated Alloy", collections: ["kundan-collection", "festive-glow"], occasions: ["festive", "wedding"],
    price: 1799, mrp: 3999, discountPct: 55, images: [img("necklace-sukkhi-1"), img("necklace-sukkhi-2")],
    badges: ["Bestseller", "B1G1"], rating: 3.9, reviewCount: 445, variants: [
      { id: "v20a", label: "One Size", price: 1799, mrp: 3999, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // ─── EARRINGS (p21–p60) ───────────────────────────────────────────────────
  {
    id: "p21", slug: "tanishq-diamond-drop-earrings", title: "Tanishq Diamond Drop Earrings 18K", brandSlug: "tanishq", categorySlug: "earrings", subcategory: "Drop Earrings",
    metal: "gold", material: "18K Yellow Gold", collections: ["bridal-2024", "festive-glow"], occasions: ["wedding", "festive"],
    price: 42000, mrp: 50000, discountPct: 16, images: [img("earring-diamond-1"), img("earring-diamond-2")],
    badges: ["Bestseller"], rating: 4.8, reviewCount: 196, variants: [
      { id: "v21a", label: "Pair", price: 42000, mrp: 50000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p22", slug: "giva-silver-hoops", title: "GIVA 925 Silver Hoop Earrings", brandSlug: "giva", categorySlug: "earrings", subcategory: "Hoop Earrings",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "everyday-essentials"], occasions: ["everyday"],
    price: 799, mrp: 1499, discountPct: 47, images: [img("earring-hoop-1"), img("earring-hoop-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.5, reviewCount: 1203, variants: [
      { id: "v22a", label: "Small (20mm)", price: 799, mrp: 1499, inStock: true },
      { id: "v22b", label: "Medium (30mm)", price: 899, mrp: 1699, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p23", slug: "bluestone-ruby-jhumka", title: "BlueStone Ruby and Gold Jhumka Earrings", brandSlug: "bluestone", categorySlug: "earrings", subcategory: "Jhumkas",
    metal: "gold", material: "22K Yellow Gold", collections: ["ruby-royale", "festive-glow"], occasions: ["festive", "wedding"],
    price: 18500, mrp: 22000, discountPct: 16, images: [img("earring-jhumka-1"), img("earring-jhumka-2")],
    badges: ["New"], rating: 4.6, reviewCount: 72, variants: [
      { id: "v23a", label: "Pair", price: 18500, mrp: 22000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p24", slug: "caratlane-everyday-studs", title: "CaratLane Diamond Stud Earrings 18K", brandSlug: "caratlane", categorySlug: "earrings", subcategory: "Stud Earrings",
    metal: "gold", material: "18K White Gold", collections: ["everyday-essentials", "office-to-evening"], occasions: ["everyday"],
    price: 12500, mrp: 15000, discountPct: 17, images: [img("earring-stud-1"), img("earring-stud-2")],
    badges: ["Bestseller"], rating: 4.7, reviewCount: 341, variants: [
      { id: "v24a", label: "0.20 ct", price: 12500, mrp: 15000, inStock: true },
      { id: "v24b", label: "0.30 ct", price: 16000, mrp: 19000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p25", slug: "swarovski-crystal-studs", title: "Swarovski Crystal Stud Earrings", brandSlug: "swarovski", categorySlug: "earrings", subcategory: "Stud Earrings",
    metal: "silver", material: "Rhodium Plated Metal", collections: ["gifts-under-5000", "everyday-essentials"], occasions: ["everyday", "gifting"],
    price: 2500, mrp: 3800, discountPct: 34, images: [img("earring-crystal-1"), img("earring-crystal-2")],
    badges: ["New"], rating: 4.2, reviewCount: 567, variants: [
      { id: "v25a", label: "Clear", price: 2500, mrp: 3800, inStock: true },
      { id: "v25b", label: "Rose", price: 2500, mrp: 3800, inStock: true },
      { id: "v25c", label: "Sapphire Blue", price: 2500, mrp: 3800, inStock: false },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p26", slug: "nakshatra-sapphire-earrings", title: "Nakshatra Sapphire Drop Earrings", brandSlug: "nakshatra", categorySlug: "earrings", subcategory: "Drop Earrings",
    metal: "gold", material: "18K White Gold", collections: ["sapphire-dreams", "statement-pieces"], occasions: ["festive", "gifting"],
    price: 28000, mrp: 34000, discountPct: 18, images: [img("earring-sapphire-1"), img("earring-sapphire-2")],
    badges: ["Exclusive"], rating: 4.7, reviewCount: 29, variants: [
      { id: "v26a", label: "Pair", price: 28000, mrp: 34000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p27", slug: "melorra-geometric-earrings", title: "Melorra Geometric Gold Earrings 18K", brandSlug: "melorra", categorySlug: "earrings", subcategory: "Stud Earrings",
    metal: "gold", material: "18K Yellow Gold", collections: ["everyday-essentials", "contemporary-art"], occasions: ["everyday"],
    price: 7800, mrp: 9500, discountPct: 18, images: [img("earring-geo-1"), img("earring-geo-2")],
    badges: ["New", "Trending"], rating: 4.4, reviewCount: 91, variants: [
      { id: "v27a", label: "Pair", price: 7800, mrp: 9500, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p28", slug: "amrapali-tribal-earrings", title: "Amrapali Tribal Chandbali Earrings", brandSlug: "amrapali", categorySlug: "earrings", subcategory: "Chandbali",
    metal: "silver", material: "Gold Plated Silver", collections: ["kundan-collection", "festive-glow"], occasions: ["festive", "wedding"],
    price: 4500, mrp: 7000, discountPct: 36, images: [img("earring-chandbali-1"), img("earring-chandbali-2")],
    badges: ["Trending"], rating: 4.5, reviewCount: 168, variants: [
      { id: "v28a", label: "Pair", price: 4500, mrp: 7000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p29", slug: "tribe-amrapali-jhumki", title: "Tribe Amrapali Affordable Jhumki Earrings", brandSlug: "tribe-amrapali", categorySlug: "earrings", subcategory: "Jhumkas",
    metal: "silver", material: "Oxidized Silver", collections: ["silver-stories", "gifts-under-5000"], occasions: ["everyday", "festive"],
    price: 699, mrp: 1299, discountPct: 46, images: [img("earring-jhumki2-1"), img("earring-jhumki2-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.1, reviewCount: 432, variants: [
      { id: "v29a", label: "Small", price: 699, mrp: 1299, inStock: true },
      { id: "v29b", label: "Large", price: 899, mrp: 1599, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p30", slug: "pandora-rose-stud-earrings", title: "Pandora Rose Sparkling Wishbone Stud Earrings", brandSlug: "pandora", categorySlug: "earrings", subcategory: "Stud Earrings",
    metal: "rose-gold", material: "14K Rose Gold Plated", collections: ["valentines-edit", "gifts-under-10000"], occasions: ["everyday", "gifting"],
    price: 5500, mrp: 7200, discountPct: 24, images: [img("earring-pandora-1"), img("earring-pandora-2")],
    badges: ["New"], rating: 4.4, reviewCount: 213, variants: [
      { id: "v30a", label: "Pair", price: 5500, mrp: 7200, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // ─── BANGLES & BRACELETS (p31–p70) ────────────────────────────────────────
  {
    id: "p31", slug: "tanishq-gold-bangle-set", title: "Tanishq 22K Gold Bangle Set (Set of 4)", brandSlug: "tanishq", categorySlug: "bangles", subcategory: "Gold Bangles",
    metal: "gold", material: "22K Yellow Gold", collections: ["bridal-2024", "festive-glow"], occasions: ["wedding", "festive"],
    price: 115000, mrp: 128000, discountPct: 10, images: [img("bangle-gold-1"), img("bangle-gold-2")],
    badges: ["Bestseller"], rating: 4.9, reviewCount: 145, variants: [
      { id: "v31a", label: "2.2 (S)", price: 115000, mrp: 128000, inStock: true },
      { id: "v31b", label: "2.4 (M)", price: 118000, mrp: 131000, inStock: true },
      { id: "v31c", label: "2.6 (L)", price: 122000, mrp: 135000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p32", slug: "giva-silver-charm-bracelet", title: "GIVA 925 Silver Charm Bracelet", brandSlug: "giva", categorySlug: "bangles", subcategory: "Bracelets",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "gifts-under-5000"], occasions: ["everyday", "gifting"],
    price: 1599, mrp: 2999, discountPct: 47, images: [img("bracelet-charm-1"), img("bracelet-charm-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.6, reviewCount: 789, variants: [
      { id: "v32a", label: "6.5 inch", price: 1599, mrp: 2999, inStock: true },
      { id: "v32b", label: "7 inch", price: 1699, mrp: 3099, inStock: true },
      { id: "v32c", label: "7.5 inch", price: 1799, mrp: 3199, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p33", slug: "swarovski-tennis-bracelet", title: "Swarovski Tennis Deluxe Crystal Bracelet", brandSlug: "swarovski", categorySlug: "bangles", subcategory: "Bracelets",
    metal: "silver", material: "Rhodium Plated Metal", collections: ["statement-pieces", "gifts-under-10000"], occasions: ["everyday", "festive"],
    price: 6500, mrp: 9500, discountPct: 32, images: [img("bracelet-tennis-1"), img("bracelet-tennis-2")],
    badges: ["Trending"], rating: 4.4, reviewCount: 312, variants: [
      { id: "v33a", label: "S (16cm)", price: 6500, mrp: 9500, inStock: true },
      { id: "v33b", label: "M (18cm)", price: 6500, mrp: 9500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p34", slug: "pandora-moments-bracelet", title: "Pandora Moments Smooth Sliding Bracelet", brandSlug: "pandora", categorySlug: "bangles", subcategory: "Bracelets",
    metal: "silver", material: "925 Sterling Silver", collections: ["gifts-under-5000", "valentines-edit"], occasions: ["everyday", "gifting"],
    price: 4200, mrp: 5500, discountPct: 24, images: [img("bracelet-pandora-1"), img("bracelet-pandora-2")],
    badges: ["Bestseller"], rating: 4.5, reviewCount: 502, variants: [
      { id: "v34a", label: "16cm", price: 4200, mrp: 5500, inStock: true },
      { id: "v34b", label: "18cm", price: 4200, mrp: 5500, inStock: true },
      { id: "v34c", label: "21cm", price: 4500, mrp: 5800, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p35", slug: "caratlane-diamond-bangle", title: "CaratLane Diamond Eternity Bangle 18K", brandSlug: "caratlane", categorySlug: "bangles", subcategory: "Diamond Bangles",
    metal: "gold", material: "18K Yellow Gold", collections: ["diamond-solitaires", "anniversary-edit"], occasions: ["anniversary", "gifting"],
    price: 48000, mrp: 56000, discountPct: 14, images: [img("bangle-diamond-1"), img("bangle-diamond-2")],
    badges: ["New"], rating: 4.7, reviewCount: 64, variants: [
      { id: "v35a", label: "2.2 (S)", price: 48000, mrp: 56000, inStock: true },
      { id: "v35b", label: "2.4 (M)", price: 49500, mrp: 57500, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p36", slug: "kalyan-temple-bangles", title: "Kalyan 22K Temple Bangle Set (Set of 2)", brandSlug: "kalyan-jewellers", categorySlug: "bangles", subcategory: "Gold Bangles",
    metal: "gold", material: "22K Yellow Gold", collections: ["temple-jewellery", "south-indian-jewellery"], occasions: ["festive", "wedding"],
    price: 68000, mrp: 77000, discountPct: 12, images: [img("bangle-temple-1"), img("bangle-temple-2")],
    badges: [], rating: 4.7, reviewCount: 83, variants: [
      { id: "v36a", label: "2.4 (M)", price: 68000, mrp: 77000, inStock: true },
      { id: "v36b", label: "2.6 (L)", price: 71000, mrp: 80000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p37", slug: "malabar-antique-bangle", title: "Malabar Gold Antique Design Bangle 22K", brandSlug: "malabar-gold", categorySlug: "bangles", subcategory: "Gold Bangles",
    metal: "gold", material: "22K Yellow Gold", collections: ["heirloom-jewellery", "royal-heritage"], occasions: ["festive", "wedding"],
    price: 42000, mrp: 48000, discountPct: 13, images: [img("bangle-antique-1"), img("bangle-antique-2")],
    badges: ["Exclusive"], rating: 4.8, reviewCount: 52, variants: [
      { id: "v37a", label: "2.2 (S)", price: 42000, mrp: 48000, inStock: true },
      { id: "v37b", label: "2.4 (M)", price: 44000, mrp: 50000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p38", slug: "youbella-resin-bangles", title: "YouBella Fashion Resin Bangle Set (Set of 12)", brandSlug: "youbella", categorySlug: "bangles", subcategory: "Fashion Bangles",
    metal: "brass", material: "Resin & Metal", collections: ["festive-glow", "navratri-special"], occasions: ["festive"],
    price: 449, mrp: 999, discountPct: 55, images: [img("bangle-resin-1"), img("bangle-resin-2")],
    badges: ["Bestseller", "B1G1"], rating: 3.8, reviewCount: 1234, variants: [
      { id: "v38a", label: "2.4", price: 449, mrp: 999, inStock: true },
      { id: "v38b", label: "2.6", price: 449, mrp: 999, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p39", slug: "melorra-geometric-bangle", title: "Melorra Geometric Pattern Gold Bracelet", brandSlug: "melorra", categorySlug: "bangles", subcategory: "Bracelets",
    metal: "gold", material: "18K Yellow Gold", collections: ["contemporary-art", "office-to-evening"], occasions: ["everyday"],
    price: 11000, mrp: 13500, discountPct: 19, images: [img("bracelet-geo-1"), img("bracelet-geo-2")],
    badges: ["New"], rating: 4.4, reviewCount: 47, variants: [
      { id: "v39a", label: "One Size", price: 11000, mrp: 13500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p40", slug: "senco-gold-lacework-bangle", title: "Senco Gold Lacework Bangle 22K", brandSlug: "senco-gold", categorySlug: "bangles", subcategory: "Gold Bangles",
    metal: "gold", material: "22K Yellow Gold", collections: ["festive-glow", "royal-heritage"], occasions: ["festive", "wedding"],
    price: 32000, mrp: 37000, discountPct: 14, images: [img("bangle-lacework-1"), img("bangle-lacework-2")],
    badges: [], rating: 4.5, reviewCount: 76, variants: [
      { id: "v40a", label: "2.2 (S)", price: 32000, mrp: 37000, inStock: true },
      { id: "v40b", label: "2.4 (M)", price: 33500, mrp: 38500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },

  // ─── WATCHES - MEN (p41–p90) ─────────────────────────────────────────────
  {
    id: "p41", slug: "rolex-submariner-black", title: "Rolex Submariner Date 41mm Black Dial", brandSlug: "rolex", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Oystersteel", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday", "gifting"],
    price: 1250000, mrp: 1350000, discountPct: 7, images: [img("watch-rolex-1"), img("watch-rolex-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 18, variants: [
      { id: "v41a", label: "41mm / Stainless Bracelet", price: 1250000, mrp: 1350000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p42", slug: "omega-seamaster-300m", title: "Omega Seamaster Diver 300M 42mm", brandSlug: "omega", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday"],
    price: 480000, mrp: 520000, discountPct: 8, images: [img("watch-omega-1"), img("watch-omega-2")],
    badges: ["Bestseller"], rating: 4.9, reviewCount: 34, variants: [
      { id: "v42a", label: "42mm / Blue Dial", price: 480000, mrp: 520000, inStock: true },
      { id: "v42b", label: "42mm / Black Dial", price: 480000, mrp: 520000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p43", slug: "titan-edge-titanium", title: "Titan Edge Ultra Slim Titanium Watch", brandSlug: "titan", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "titanium", material: "Titanium Case", collections: ["mens-essentials", "office-to-evening"], occasions: ["everyday", "corporate"],
    price: 12500, mrp: 15000, discountPct: 17, images: [img("watch-titan-1"), img("watch-titan-2")],
    badges: ["Bestseller"], rating: 4.5, reviewCount: 567, variants: [
      { id: "v43a", label: "38mm / Silver", price: 12500, mrp: 15000, inStock: true },
      { id: "v43b", label: "38mm / Gold Tone", price: 13000, mrp: 15500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p44", slug: "fossil-grant-chronograph", title: "Fossil Grant Chronograph Leather Watch", brandSlug: "fossil", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "stainless-steel", material: "Stainless Steel & Leather", collections: ["mens-essentials", "gifts-under-10000"], occasions: ["everyday", "gifting"],
    price: 8995, mrp: 12995, discountPct: 31, images: [img("watch-fossil-1"), img("watch-fossil-2")],
    badges: ["Trending"], rating: 4.3, reviewCount: 834, variants: [
      { id: "v44a", label: "44mm / Brown Leather", price: 8995, mrp: 12995, inStock: true },
      { id: "v44b", label: "44mm / Black Leather", price: 8995, mrp: 12995, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p45", slug: "casio-g-shock-gw", title: "Casio G-Shock GW-M5610 Solar Watch", brandSlug: "casio", categorySlug: "watches", subcategory: "Sports Watches",
    metal: "stainless-steel", material: "Resin Case", collections: ["luxury-sport", "mens-essentials"], occasions: ["everyday", "sports"],
    price: 6995, mrp: 8500, discountPct: 18, images: [img("watch-casio-1"), img("watch-casio-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 1123, variants: [
      { id: "v45a", label: "One Size / Black", price: 6995, mrp: 8500, inStock: true },
      { id: "v45b", label: "One Size / Red", price: 6995, mrp: 8500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p46", slug: "tag-heuer-carrera-chronograph", title: "TAG Heuer Carrera Chronograph 44mm", brandSlug: "tag-heuer", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday", "corporate"],
    price: 350000, mrp: 385000, discountPct: 9, images: [img("watch-tag-1"), img("watch-tag-2")],
    badges: ["Exclusive"], rating: 4.8, reviewCount: 27, variants: [
      { id: "v46a", label: "44mm / Black Dial", price: 350000, mrp: 385000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p47", slug: "longines-master-collection", title: "Longines Master Collection Moonphase 40mm", brandSlug: "longines", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "heirloom-jewellery"], occasions: ["everyday", "gifting"],
    price: 125000, mrp: 140000, discountPct: 11, images: [img("watch-longines-1"), img("watch-longines-2")],
    badges: ["Bestseller"], rating: 4.8, reviewCount: 45, variants: [
      { id: "v47a", label: "40mm / Silver Dial", price: 125000, mrp: 140000, inStock: true },
      { id: "v47b", label: "40mm / Blue Dial", price: 128000, mrp: 143000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p48", slug: "seiko-presage-cocktail", title: "Seiko Presage Cocktail Time Automatic Watch", brandSlug: "seiko", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "office-to-evening"], occasions: ["everyday", "gifting"],
    price: 32000, mrp: 38000, discountPct: 16, images: [img("watch-seiko-1"), img("watch-seiko-2")],
    badges: ["Trending"], rating: 4.7, reviewCount: 312, variants: [
      { id: "v48a", label: "40mm / Purple Dial", price: 32000, mrp: 38000, inStock: true },
      { id: "v48b", label: "40mm / White Dial", price: 32000, mrp: 38000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p49", slug: "citizen-eco-drive-promaster", title: "Citizen Eco-Drive Promaster Diver Watch", brandSlug: "citizen", categorySlug: "watches", subcategory: "Sports Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["luxury-sport", "mens-essentials"], occasions: ["everyday", "sports"],
    price: 18500, mrp: 22000, discountPct: 16, images: [img("watch-citizen-1"), img("watch-citizen-2")],
    badges: ["New"], rating: 4.5, reviewCount: 189, variants: [
      { id: "v49a", label: "44mm / Black Dial", price: 18500, mrp: 22000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p50", slug: "tissot-prx-powermatic", title: "Tissot PRX Powermatic 80 40mm", brandSlug: "tissot", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "office-to-evening"], occasions: ["everyday"],
    price: 55000, mrp: 62000, discountPct: 11, images: [img("watch-tissot-1"), img("watch-tissot-2")],
    badges: ["Bestseller"], rating: 4.7, reviewCount: 203, variants: [
      { id: "v50a", label: "40mm / Blue Dial", price: 55000, mrp: 62000, inStock: true },
      { id: "v50b", label: "40mm / Silver Dial", price: 55000, mrp: 62000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p51", slug: "hamilton-khaki-field-auto", title: "Hamilton Khaki Field Automatic 38mm", brandSlug: "hamilton", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["mens-essentials", "gifts-under-10000"], occasions: ["everyday"],
    price: 38000, mrp: 44000, discountPct: 14, images: [img("watch-hamilton-1"), img("watch-hamilton-2")],
    badges: ["Trending"], rating: 4.6, reviewCount: 278, variants: [
      { id: "v51a", label: "38mm / Green Canvas Strap", price: 38000, mrp: 44000, inStock: true },
      { id: "v51b", label: "38mm / Black Canvas Strap", price: 38000, mrp: 44000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p52", slug: "rado-captain-cook-dive", title: "Rado Captain Cook Bronze Diver 37mm", brandSlug: "rado", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Bronze & Stainless Steel", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday"],
    price: 95000, mrp: 108000, discountPct: 12, images: [img("watch-rado-1"), img("watch-rado-2")],
    badges: ["Exclusive"], rating: 4.8, reviewCount: 56, variants: [
      { id: "v52a", label: "37mm / Brown Rubber", price: 95000, mrp: 108000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p53", slug: "casio-gshock-rangeman", title: "Casio G-Shock Rangeman Triple Sensor Watch", brandSlug: "casio", categorySlug: "watches", subcategory: "Sports Watches",
    metal: "stainless-steel", material: "Resin", collections: ["luxury-sport", "mens-essentials"], occasions: ["sports", "everyday"],
    price: 14500, mrp: 17000, discountPct: 15, images: [img("watch-casio2-1"), img("watch-casio2-2")],
    badges: ["Bestseller"], rating: 4.5, reviewCount: 678, variants: [
      { id: "v53a", label: "One Size / Khaki Green", price: 14500, mrp: 17000, inStock: true },
      { id: "v53b", label: "One Size / Black", price: 14500, mrp: 17000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p54", slug: "titan-octane-chronograph", title: "Titan Octane Chronograph Sports Watch", brandSlug: "titan", categorySlug: "watches", subcategory: "Sports Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["luxury-sport", "mens-essentials"], occasions: ["sports", "everyday"],
    price: 8500, mrp: 11000, discountPct: 23, images: [img("watch-titan2-1"), img("watch-titan2-2")],
    badges: ["Trending"], rating: 4.3, reviewCount: 344, variants: [
      { id: "v54a", label: "44mm / Black", price: 8500, mrp: 11000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p55", slug: "breitling-navitimer-b01", title: "Breitling Navitimer B01 Chronograph 43mm", brandSlug: "breitling", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday", "corporate"],
    price: 695000, mrp: 750000, discountPct: 7, images: [img("watch-breitling-1"), img("watch-breitling-2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 15, variants: [
      { id: "v55a", label: "43mm / Black Dial", price: 695000, mrp: 750000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p56", slug: "diesel-ms9-chronograph", title: "Diesel MS9 Men's Chronograph Watch", brandSlug: "diesel-watches", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["mens-essentials", "statement-pieces"], occasions: ["everyday"],
    price: 9995, mrp: 14995, discountPct: 33, images: [img("watch-diesel-1"), img("watch-diesel-2")],
    badges: ["Trending"], rating: 4.1, reviewCount: 421, variants: [
      { id: "v56a", label: "51mm / Black", price: 9995, mrp: 14995, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p57", slug: "emporio-armani-ar11251", title: "Emporio Armani Mario Men's Watch", brandSlug: "emporio-armani-watches", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["office-to-evening", "gifts-under-10000"], occasions: ["everyday", "corporate"],
    price: 11995, mrp: 16995, discountPct: 29, images: [img("watch-ea-1"), img("watch-ea-2")],
    badges: ["New"], rating: 4.2, reviewCount: 267, variants: [
      { id: "v57a", label: "43mm / Silver", price: 11995, mrp: 16995, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p58", slug: "orient-ray-diver", title: "Orient Ray II Automatic Diver Watch", brandSlug: "orient", categorySlug: "watches", subcategory: "Sports Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["luxury-sport", "mens-essentials"], occasions: ["sports", "everyday"],
    price: 12000, mrp: 14500, discountPct: 17, images: [img("watch-orient-1"), img("watch-orient-2")],
    badges: ["Trending"], rating: 4.4, reviewCount: 389, variants: [
      { id: "v58a", label: "41.5mm / Blue Dial", price: 12000, mrp: 14500, inStock: true },
      { id: "v58b", label: "41.5mm / Black Dial", price: 12000, mrp: 14500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p59", slug: "fastrack-digital-sports", title: "Fastrack Reflex Digital Fitness Watch", brandSlug: "fastrack", categorySlug: "watches", subcategory: "Sports Watches",
    metal: "stainless-steel", material: "Plastic & Silicone", collections: ["mens-essentials", "gifts-under-5000"], occasions: ["everyday", "sports"],
    price: 2995, mrp: 3995, discountPct: 25, images: [img("watch-fastrack-1"), img("watch-fastrack-2")],
    badges: ["Bestseller"], rating: 3.9, reviewCount: 2345, variants: [
      { id: "v59a", label: "One Size / Black", price: 2995, mrp: 3995, inStock: true },
      { id: "v59b", label: "One Size / Blue", price: 2995, mrp: 3995, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p60", slug: "timex-weekender-slip-thru", title: "Timex Weekender Slip-Thru Strap Watch", brandSlug: "timex", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "brass", material: "Brass Case", collections: ["everyday-essentials", "gifts-under-5000"], occasions: ["everyday"],
    price: 2495, mrp: 3200, discountPct: 22, images: [img("watch-timex-1"), img("watch-timex-2")],
    badges: ["Bestseller"], rating: 4.2, reviewCount: 1456, variants: [
      { id: "v60a", label: "38mm / Navy Strap", price: 2495, mrp: 3200, inStock: true },
      { id: "v60b", label: "38mm / Tan Strap", price: 2495, mrp: 3200, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // ─── WATCHES - WOMEN (p61–p80) ────────────────────────────────────────────
  {
    id: "p61", slug: "titan-raga-bracelet-watch", title: "Titan Raga Espana Bracelet Watch Women's", brandSlug: "titan-raga", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "gold", material: "Gold Plated Stainless Steel", collections: ["office-to-evening", "gifts-under-10000"], occasions: ["everyday", "gifting"],
    price: 6495, mrp: 8495, discountPct: 24, images: [img("watch-raga-1"), img("watch-raga-2")],
    badges: ["Bestseller"], rating: 4.5, reviewCount: 678, variants: [
      { id: "v61a", label: "26mm / Gold", price: 6495, mrp: 8495, inStock: true },
      { id: "v61b", label: "26mm / Rose Gold", price: 6695, mrp: 8695, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p62", slug: "fossil-georgia-multifunction", title: "Fossil Georgia Multifunction Rose Gold Watch", brandSlug: "fossil", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "rose-gold", material: "Rose Gold Tone Stainless Steel", collections: ["office-to-evening", "gifts-under-10000"], occasions: ["everyday", "gifting"],
    price: 9995, mrp: 14995, discountPct: 33, images: [img("watch-fossil-w1"), img("watch-fossil-w2")],
    badges: ["Trending"], rating: 4.3, reviewCount: 512, variants: [
      { id: "v62a", label: "37mm / Rose Gold", price: 9995, mrp: 14995, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p63", slug: "longines-dolcevita-ladies", title: "Longines DolceVita Ladies Diamond Watch", brandSlug: "longines", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "gold", material: "Stainless Steel PVD Gold", collections: ["watch-icons", "heirloom-jewellery"], occasions: ["everyday", "festive"],
    price: 185000, mrp: 210000, discountPct: 12, images: [img("watch-longines-w1"), img("watch-longines-w2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 19, variants: [
      { id: "v63a", label: "20.8x32mm / MOP Dial", price: 185000, mrp: 210000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p64", slug: "swarovski-crystalline-watch", title: "Swarovski Crystalline Ladies Watch", brandSlug: "swarovski", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "silver", material: "Metal Alloy", collections: ["statement-pieces", "gifts-under-10000"], occasions: ["festive", "gifting"],
    price: 12500, mrp: 17500, discountPct: 29, images: [img("watch-swarovski-w1"), img("watch-swarovski-w2")],
    badges: ["Trending"], rating: 4.3, reviewCount: 234, variants: [
      { id: "v64a", label: "28mm / Rose Gold Tone", price: 12500, mrp: 17500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p65", slug: "sonata-women-ethnic", title: "Sonata Women's Ethnic Silk Saree Watch", brandSlug: "sonata", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "gold", material: "Brass", collections: ["everyday-essentials", "gifts-under-5000"], occasions: ["everyday", "festive"],
    price: 1995, mrp: 2795, discountPct: 29, images: [img("watch-sonata-w1"), img("watch-sonata-w2")],
    badges: ["Bestseller"], rating: 4.0, reviewCount: 889, variants: [
      { id: "v65a", label: "28mm / Gold", price: 1995, mrp: 2795, inStock: true },
      { id: "v65b", label: "28mm / Rose Gold", price: 2095, mrp: 2895, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p66", slug: "michael-kors-lexington", title: "Michael Kors Lexington Chronograph Ladies Watch", brandSlug: "michael-kors-jewel", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "gold", material: "Gold-Tone Stainless Steel", collections: ["statement-pieces", "office-to-evening"], occasions: ["everyday", "corporate"],
    price: 18500, mrp: 24999, discountPct: 26, images: [img("watch-mk-w1"), img("watch-mk-w2")],
    badges: ["Trending"], rating: 4.3, reviewCount: 378, variants: [
      { id: "v66a", label: "37mm / Gold", price: 18500, mrp: 24999, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p67", slug: "casio-sheen-ladies", title: "Casio Sheen Crystal Ladies Watch", brandSlug: "casio", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "rose-gold", material: "Stainless Steel", collections: ["gifts-under-10000", "office-to-evening"], occasions: ["everyday", "gifting"],
    price: 5495, mrp: 7495, discountPct: 27, images: [img("watch-casio-w1"), img("watch-casio-w2")],
    badges: ["New"], rating: 4.2, reviewCount: 456, variants: [
      { id: "v67a", label: "One Size / Rose Gold", price: 5495, mrp: 7495, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p68", slug: "frederique-constant-slimline", title: "Frédérique Constant Slimline Ladies Watch", brandSlug: "frederique-constant-2", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "rose-gold", material: "Rose Gold PVD", collections: ["watch-icons", "heirloom-jewellery"], occasions: ["everyday", "festive"],
    price: 88000, mrp: 98000, discountPct: 10, images: [img("watch-fc-w1"), img("watch-fc-w2")],
    badges: ["Exclusive"], rating: 4.8, reviewCount: 23, variants: [
      { id: "v68a", label: "34mm / Blush Strap", price: 88000, mrp: 98000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p69", slug: "fastrack-analog-women", title: "Fastrack Women's Analog Quartz Watch", brandSlug: "fastrack", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "rose-gold", material: "Metal & Leather", collections: ["everyday-essentials", "gifts-under-5000"], occasions: ["everyday"],
    price: 1995, mrp: 2795, discountPct: 29, images: [img("watch-fastrack-w1"), img("watch-fastrack-w2")],
    badges: ["Bestseller"], rating: 3.8, reviewCount: 1567, variants: [
      { id: "v69a", label: "35mm / Rose Gold & Pink", price: 1995, mrp: 2795, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p70", slug: "maxima-ostara-ladies", title: "Maxima Ostara Rose Gold Mesh Women's Watch", brandSlug: "maxima", categorySlug: "watches", subcategory: "Women's Watches",
    metal: "rose-gold", material: "Stainless Steel Mesh", collections: ["everyday-essentials", "office-to-evening"], occasions: ["everyday", "corporate"],
    price: 1795, mrp: 2500, discountPct: 28, images: [img("watch-maxima-w1"), img("watch-maxima-w2")],
    badges: ["New"], rating: 4.0, reviewCount: 678, variants: [
      { id: "v70a", label: "One Size / Rose Gold", price: 1795, mrp: 2500, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // ─── MANGALSUTRA (p71–p85) ────────────────────────────────────────────────
  {
    id: "p71", slug: "tanishq-mangalsutra-diamond", title: "Tanishq Ekatvam Diamond Mangalsutra 18K", brandSlug: "tanishq", categorySlug: "mangalsutra", subcategory: "Diamond Mangalsutra",
    metal: "gold", material: "18K Yellow Gold", collections: ["bridal-2024", "everyday-essentials"], occasions: ["wedding", "everyday"],
    price: 28000, mrp: 33000, discountPct: 15, images: [img("mangal-diamond-1"), img("mangal-diamond-2")],
    badges: ["Bestseller"], rating: 4.8, reviewCount: 234, variants: [
      { id: "v71a", label: "16 inch", price: 28000, mrp: 33000, inStock: true },
      { id: "v71b", label: "18 inch", price: 29500, mrp: 34500, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p72", slug: "malabar-mangalsutra-22k", title: "Malabar Gold Traditional Mangalsutra 22K", brandSlug: "malabar-gold", categorySlug: "mangalsutra", subcategory: "Traditional Mangalsutra",
    metal: "gold", material: "22K Yellow Gold", collections: ["bridal-2024", "south-indian-jewellery"], occasions: ["wedding"],
    price: 45000, mrp: 52000, discountPct: 13, images: [img("mangal-traditional-1"), img("mangal-traditional-2")],
    badges: [], rating: 4.7, reviewCount: 112, variants: [
      { id: "v72a", label: "18 inch", price: 45000, mrp: 52000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p73", slug: "caratlane-gold-mangalsutra", title: "CaratLane Daily Wear Gold Mangalsutra", brandSlug: "caratlane", categorySlug: "mangalsutra", subcategory: "Daily Wear Mangalsutra",
    metal: "gold", material: "18K Yellow Gold", collections: ["everyday-essentials", "minimalist-gold"], occasions: ["everyday"],
    price: 14500, mrp: 17000, discountPct: 15, images: [img("mangal-daily-1"), img("mangal-daily-2")],
    badges: ["Bestseller", "New"], rating: 4.6, reviewCount: 345, variants: [
      { id: "v73a", label: "16 inch", price: 14500, mrp: 17000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p74", slug: "pc-chandra-mangalsutra", title: "PC Chandra Lightweight Gold Mangalsutra", brandSlug: "pc-chandra", categorySlug: "mangalsutra", subcategory: "Daily Wear Mangalsutra",
    metal: "gold", material: "22K Yellow Gold", collections: ["everyday-essentials"], occasions: ["everyday", "wedding"],
    price: 22000, mrp: 26000, discountPct: 15, images: [img("mangal-pc-1"), img("mangal-pc-2")],
    badges: [], rating: 4.5, reviewCount: 89, variants: [
      { id: "v74a", label: "18 inch", price: 22000, mrp: 26000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },

  // ─── SETS (p75–p100) ──────────────────────────────────────────────────────
  {
    id: "p75", slug: "tanishq-bridal-set", title: "Tanishq Bridal Diamond Necklace & Earrings Set 18K", brandSlug: "tanishq", categorySlug: "sets", subcategory: "Bridal Sets",
    metal: "gold", material: "18K Yellow Gold", collections: ["bridal-2024", "diamond-solitaires"], occasions: ["wedding"],
    price: 185000, mrp: 215000, discountPct: 14, images: [img("set-bridal-1"), img("set-bridal-2")],
    badges: ["Bestseller", "Exclusive"], rating: 4.9, reviewCount: 67, variants: [
      { id: "v75a", label: "Necklace 18\" + Earrings", price: 185000, mrp: 215000, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p76", slug: "kalyan-gold-necklace-set", title: "Kalyan Jewellers 22K Necklace & Earring Set", brandSlug: "kalyan-jewellers", categorySlug: "sets", subcategory: "Gold Sets",
    metal: "gold", material: "22K Yellow Gold", collections: ["festive-glow", "bridal-2024"], occasions: ["festive", "wedding"],
    price: 145000, mrp: 165000, discountPct: 12, images: [img("set-kalyan-1"), img("set-kalyan-2")],
    badges: ["Bestseller"], rating: 4.8, reviewCount: 92, variants: [
      { id: "v76a", label: "Full Set", price: 145000, mrp: 165000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p77", slug: "giva-silver-matching-set", title: "GIVA 925 Silver Matching Necklace & Earrings Set", brandSlug: "giva", categorySlug: "sets", subcategory: "Silver Sets",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "gifts-under-5000"], occasions: ["everyday", "gifting"],
    price: 1999, mrp: 3999, discountPct: 50, images: [img("set-silver-1"), img("set-silver-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.4, reviewCount: 678, variants: [
      { id: "v77a", label: "Necklace 18\" + Earrings", price: 1999, mrp: 3999, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p78", slug: "amrapali-kundan-bridal-set", title: "Amrapali Kundan Bridal Jewellery Set (5 pc)", brandSlug: "amrapali", categorySlug: "sets", subcategory: "Bridal Sets",
    metal: "gold", material: "Gold Plated Silver", collections: ["kundan-collection", "bridal-2024"], occasions: ["wedding"],
    price: 32000, mrp: 48000, discountPct: 33, images: [img("set-kundan-1"), img("set-kundan-2")],
    badges: ["Exclusive", "Trending"], rating: 4.8, reviewCount: 124, variants: [
      { id: "v78a", label: "Full Set", price: 32000, mrp: 48000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p79", slug: "swarovski-symbolic-set", title: "Swarovski Symbolic Gift Set (Necklace + Earrings)", brandSlug: "swarovski", categorySlug: "sets", subcategory: "Fashion Sets",
    metal: "silver", material: "Rhodium Plated", collections: ["gifts-under-10000", "valentines-edit"], occasions: ["gifting"],
    price: 7500, mrp: 11000, discountPct: 32, images: [img("set-swarovski-1"), img("set-swarovski-2")],
    badges: ["New"], rating: 4.3, reviewCount: 312, variants: [
      { id: "v79a", label: "Gift Box Set", price: 7500, mrp: 11000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p80", slug: "senco-south-indian-set", title: "Senco Gold South Indian Bridal Set 22K", brandSlug: "senco-gold", categorySlug: "sets", subcategory: "Bridal Sets",
    metal: "gold", material: "22K Yellow Gold", collections: ["south-indian-jewellery", "bridal-2024"], occasions: ["wedding"],
    price: 220000, mrp: 250000, discountPct: 12, images: [img("set-south-1"), img("set-south-2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 34, variants: [
      { id: "v80a", label: "Full Bridal Set", price: 220000, mrp: 250000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },

  // ─── PENDANTS (p81–p110) ──────────────────────────────────────────────────
  {
    id: "p81", slug: "tanishq-ganesh-pendant", title: "Tanishq 22K Gold Ganesh Pendant", brandSlug: "tanishq", categorySlug: "pendants", subcategory: "Religious Pendants",
    metal: "gold", material: "22K Yellow Gold", collections: ["everyday-essentials", "festive-glow"], occasions: ["everyday", "festive"],
    price: 8500, mrp: 10000, discountPct: 15, images: [img("pendant-ganesh-1"), img("pendant-ganesh-2")],
    badges: ["Bestseller"], rating: 4.8, reviewCount: 432, variants: [
      { id: "v81a", label: "Small", price: 8500, mrp: 10000, inStock: true },
      { id: "v81b", label: "Large", price: 12000, mrp: 14000, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p82", slug: "caratlane-solitaire-pendant", title: "CaratLane Diamond Solitaire Pendant 18K", brandSlug: "caratlane", categorySlug: "pendants", subcategory: "Diamond Pendants",
    metal: "gold", material: "18K White Gold", collections: ["diamond-solitaires", "anniversary-edit"], occasions: ["anniversary", "gifting"],
    price: 18500, mrp: 22000, discountPct: 16, images: [img("pendant-diamond-1"), img("pendant-diamond-2")],
    badges: ["Bestseller"], rating: 4.7, reviewCount: 189, variants: [
      { id: "v82a", label: "0.20 ct", price: 18500, mrp: 22000, inStock: true },
      { id: "v82b", label: "0.30 ct", price: 24000, mrp: 28500, inStock: true },
    ], virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p83", slug: "giva-zodiac-pendant", title: "GIVA 925 Silver Zodiac Pendant Necklace", brandSlug: "giva", categorySlug: "pendants", subcategory: "Fashion Pendants",
    metal: "silver", material: "925 Sterling Silver", collections: ["zodiac-collection", "gifts-under-5000"], occasions: ["everyday", "gifting"],
    price: 899, mrp: 1799, discountPct: 50, images: [img("pendant-zodiac-1"), img("pendant-zodiac-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.3, reviewCount: 567, variants: [
      { id: "v83a", label: "Aries", price: 899, mrp: 1799, inStock: true },
      { id: "v83b", label: "Taurus", price: 899, mrp: 1799, inStock: true },
      { id: "v83c", label: "Gemini", price: 899, mrp: 1799, inStock: true },
      { id: "v83d", label: "Leo", price: 899, mrp: 1799, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p84", slug: "pandora-dangle-charm-pendant", title: "Pandora Heart Dangle Charm Pendant", brandSlug: "pandora", categorySlug: "pendants", subcategory: "Charm Pendants",
    metal: "silver", material: "925 Sterling Silver", collections: ["valentines-edit", "gifts-under-5000"], occasions: ["gifting"],
    price: 3200, mrp: 4500, discountPct: 29, images: [img("pendant-pandora-1"), img("pendant-pandora-2")],
    badges: ["Trending"], rating: 4.5, reviewCount: 678, variants: [
      { id: "v84a", label: "Silver", price: 3200, mrp: 4500, inStock: true },
      { id: "v84b", label: "Rose Gold", price: 3500, mrp: 4800, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p85", slug: "tribe-evil-eye-pendant", title: "Tribe Amrapali Evil Eye Silver Pendant", brandSlug: "tribe-amrapali", categorySlug: "pendants", subcategory: "Fashion Pendants",
    metal: "silver", material: "Oxidized Silver", collections: ["gifts-under-5000", "everyday-essentials"], occasions: ["everyday", "gifting"],
    price: 549, mrp: 999, discountPct: 45, images: [img("pendant-evileye-1"), img("pendant-evileye-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.2, reviewCount: 1234, variants: [
      { id: "v85a", label: "Small", price: 549, mrp: 999, inStock: true },
    ], virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // ─── ADDITIONAL PRODUCTS TO REACH ~250 (p86–p250) ────────────────────────
  // Rings continued
  {
    id: "p86", slug: "pc-chandra-gold-ring", title: "PC Chandra 22K Floral Gold Ring", brandSlug: "pc-chandra", categorySlug: "rings", subcategory: "Gold Rings",
    metal: "gold", material: "22K Yellow Gold", collections: ["festive-glow", "everyday-essentials"], occasions: ["everyday", "festive"],
    price: 15000, mrp: 18000, discountPct: 17, images: [img("ring-pcc-1"), img("ring-pcc-2")],
    badges: [], rating: 4.4, reviewCount: 67, variants: [{ id: "v86a", label: "Size 6", price: 15000, mrp: 18000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p87", slug: "bluestone-rose-gold-ring", title: "BlueStone Rose Gold Infinity Ring 14K", brandSlug: "bluestone", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "rose-gold", material: "14K Rose Gold", collections: ["valentines-edit", "anniversary-edit"], occasions: ["anniversary", "gifting"],
    price: 14500, mrp: 17500, discountPct: 17, images: [img("ring-rg-1"), img("ring-rg-2")],
    badges: ["New"], rating: 4.5, reviewCount: 88, variants: [{ id: "v87a", label: "Size 5", price: 14500, mrp: 17500, inStock: true }],
    virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p88", slug: "pandora-daisy-ring", title: "Pandora Daisy Flower Stud Ring", brandSlug: "pandora", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "silver", material: "925 Sterling Silver", collections: ["gifts-under-5000", "everyday-essentials"], occasions: ["everyday", "gifting"],
    price: 2800, mrp: 3800, discountPct: 26, images: [img("ring-pandora-1"), img("ring-pandora-2")],
    badges: ["Trending"], rating: 4.3, reviewCount: 412, variants: [{ id: "v88a", label: "Size 6", price: 2800, mrp: 3800, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p89", slug: "senco-gold-diamond-ring", title: "Senco Diamond Studded Ring 18K", brandSlug: "senco-gold", categorySlug: "rings", subcategory: "Solitaire Rings",
    metal: "gold", material: "18K White Gold", collections: ["diamond-solitaires", "anniversary-edit"], occasions: ["anniversary", "engagement"],
    price: 38000, mrp: 44000, discountPct: 14, images: [img("ring-senco-1"), img("ring-senco-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 134, variants: [{ id: "v89a", label: "Size 6", price: 38000, mrp: 44000, inStock: true }],
    virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p90", slug: "zariin-enameled-ring", title: "Zariin Enameled Gold Ring 22K", brandSlug: "zariin", categorySlug: "rings", subcategory: "Cocktail Rings",
    metal: "gold", material: "22K Gold Plated", collections: ["festive-glow", "contemporary-art"], occasions: ["festive", "everyday"],
    price: 3500, mrp: 5500, discountPct: 36, images: [img("ring-zariin-1"), img("ring-zariin-2")],
    badges: ["New"], rating: 4.1, reviewCount: 56, variants: [{ id: "v90a", label: "Free Size", price: 3500, mrp: 5500, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  // Necklaces continued
  {
    id: "p91", slug: "senco-short-necklace", title: "Senco Gold Short Necklace 22K Temple Design", brandSlug: "senco-gold", categorySlug: "necklaces", subcategory: "Temple Necklaces",
    metal: "gold", material: "22K Yellow Gold", collections: ["temple-jewellery", "south-indian-jewellery"], occasions: ["festive", "wedding"],
    price: 55000, mrp: 63000, discountPct: 13, images: [img("necklace-senco-1"), img("necklace-senco-2")],
    badges: [], rating: 4.7, reviewCount: 43, variants: [{ id: "v91a", label: "16 inch", price: 55000, mrp: 63000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p92", slug: "shaya-silver-necklace", title: "Shaya 925 Sterling Silver Floral Necklace", brandSlug: "shaya", categorySlug: "necklaces", subcategory: "Silver Chains",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "gifts-under-5000"], occasions: ["everyday", "gifting"],
    price: 1299, mrp: 2299, discountPct: 44, images: [img("necklace-shaya-1"), img("necklace-shaya-2")],
    badges: ["Bestseller"], rating: 4.4, reviewCount: 345, variants: [{ id: "v92a", label: "18 inch", price: 1299, mrp: 2299, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p93", slug: "melorra-mangalsutra-necklace", title: "Melorra Everyday Mangalsutra Necklace 18K", brandSlug: "melorra", categorySlug: "mangalsutra", subcategory: "Daily Wear Mangalsutra",
    metal: "gold", material: "18K Yellow Gold", collections: ["everyday-essentials", "minimalist-gold"], occasions: ["everyday"],
    price: 11500, mrp: 14000, discountPct: 18, images: [img("necklace-melorra-1"), img("necklace-melorra-2")],
    badges: ["New", "Virtual Try-On"], rating: 4.5, reviewCount: 123, variants: [{ id: "v93a", label: "16 inch", price: 11500, mrp: 14000, inStock: true }],
    virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p94", slug: "joyalukkas-gold-chain", title: "Joyalukkas 22K Rope Chain Necklace", brandSlug: "joyalukkas", categorySlug: "necklaces", subcategory: "Gold Chains",
    metal: "gold", material: "22K Yellow Gold", collections: ["everyday-essentials", "minimalist-gold"], occasions: ["everyday"],
    price: 48000, mrp: 55000, discountPct: 13, images: [img("necklace-joy-1"), img("necklace-joy-2")],
    badges: [], rating: 4.6, reviewCount: 89, variants: [{ id: "v94a", label: "18 inch", price: 48000, mrp: 55000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p95", slug: "nakshatra-diamond-pendant-necklace", title: "Nakshatra Diamond Pendant Chain Set", brandSlug: "nakshatra", categorySlug: "necklaces", subcategory: "Diamond Necklaces",
    metal: "gold", material: "18K White Gold", collections: ["diamond-solitaires", "gifts-under-10000"], occasions: ["everyday", "gifting"],
    price: 22000, mrp: 27000, discountPct: 19, images: [img("necklace-naksh-1"), img("necklace-naksh-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 167, variants: [{ id: "v95a", label: "18 inch", price: 22000, mrp: 27000, inStock: true }],
    virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  // Earrings continued
  {
    id: "p96", slug: "tanishq-pearl-earrings", title: "Tanishq Pearl Drop Earrings 22K Gold", brandSlug: "tanishq", categorySlug: "earrings", subcategory: "Drop Earrings",
    metal: "gold", material: "22K Yellow Gold", collections: ["pearl-collection", "festive-glow"], occasions: ["festive", "everyday"],
    price: 16500, mrp: 19500, discountPct: 15, images: [img("earring-pearl-1"), img("earring-pearl-2")],
    badges: [], rating: 4.7, reviewCount: 234, variants: [{ id: "v96a", label: "Pair", price: 16500, mrp: 19500, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p97", slug: "kalyan-temple-earrings", title: "Kalyan 22K Temple Earrings", brandSlug: "kalyan-jewellers", categorySlug: "earrings", subcategory: "Temple Earrings",
    metal: "gold", material: "22K Yellow Gold", collections: ["temple-jewellery", "south-indian-jewellery"], occasions: ["festive", "wedding"],
    price: 22000, mrp: 26000, discountPct: 15, images: [img("earring-kalyan-1"), img("earring-kalyan-2")],
    badges: [], rating: 4.6, reviewCount: 78, variants: [{ id: "v97a", label: "Pair", price: 22000, mrp: 26000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p98", slug: "youbella-statement-earrings", title: "YouBella Fashion Statement Earrings Set", brandSlug: "youbella", categorySlug: "earrings", subcategory: "Fashion Earrings",
    metal: "gold", material: "Gold Plated", collections: ["festive-glow", "gifts-under-5000"], occasions: ["festive", "everyday"],
    price: 399, mrp: 799, discountPct: 50, images: [img("earring-youbella-1"), img("earring-youbella-2")],
    badges: ["B1G1", "Bestseller"], rating: 3.9, reviewCount: 2345, variants: [{ id: "v98a", label: "Pair", price: 399, mrp: 799, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p99", slug: "isharya-resin-earrings", title: "Isharya Modern Resin Tassel Earrings", brandSlug: "isharya", categorySlug: "earrings", subcategory: "Fashion Earrings",
    metal: "gold", material: "Gold Plated & Resin", collections: ["contemporary-art", "summer-shine"], occasions: ["everyday"],
    price: 2500, mrp: 3800, discountPct: 34, images: [img("earring-isharya-1"), img("earring-isharya-2")],
    badges: ["New", "Trending"], rating: 4.3, reviewCount: 134, variants: [{ id: "v99a", label: "One Size", price: 2500, mrp: 3800, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p100", slug: "shaya-silver-ear-cuff", title: "Shaya 925 Silver Ear Cuff Earrings", brandSlug: "shaya", categorySlug: "earrings", subcategory: "Ear Cuffs",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "fusion-jewellery"], occasions: ["everyday"],
    price: 1099, mrp: 1999, discountPct: 45, images: [img("earring-shaya-1"), img("earring-shaya-2")],
    badges: ["New"], rating: 4.2, reviewCount: 289, variants: [{ id: "v100a", label: "One Size", price: 1099, mrp: 1999, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // Watches continued
  {
    id: "p101", slug: "hublot-classic-fusion", title: "Hublot Classic Fusion Titanium 42mm", brandSlug: "hublot", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "titanium", material: "Titanium & Rubber", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday", "corporate"],
    price: 895000, mrp: 975000, discountPct: 8, images: [img("watch-hublot-1"), img("watch-hublot-2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 11, variants: [{ id: "v101a", label: "42mm / Black Strap", price: 895000, mrp: 975000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p102", slug: "audemars-piguet-royal-oak", title: "Audemars Piguet Royal Oak Selfwinding 41mm", brandSlug: "audemars-piguet", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons"], occasions: ["everyday"],
    price: 1850000, mrp: 2000000, discountPct: 8, images: [img("watch-ap-1"), img("watch-ap-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 6, variants: [{ id: "v102a", label: "41mm / Blue Dial", price: 1850000, mrp: 2000000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p103", slug: "seiko-5-sports", title: "Seiko 5 Sports Automatic 39mm", brandSlug: "seiko", categorySlug: "watches", subcategory: "Sports Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["mens-essentials", "gifts-under-10000"], occasions: ["everyday", "sports"],
    price: 14000, mrp: 17000, discountPct: 18, images: [img("watch-seiko2-1"), img("watch-seiko2-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 567, variants: [{ id: "v103a", label: "39mm / Black", price: 14000, mrp: 17000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p104", slug: "gc-feroce-chronograph", title: "GC Feroce Chronograph Men's Watch", brandSlug: "gc-watches", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "gold", material: "Yellow Gold PVD Stainless Steel", collections: ["office-to-evening", "statement-pieces"], occasions: ["everyday", "corporate"],
    price: 32000, mrp: 42000, discountPct: 24, images: [img("watch-gc-1"), img("watch-gc-2")],
    badges: ["Trending"], rating: 4.2, reviewCount: 78, variants: [{ id: "v104a", label: "45mm / Black Dial", price: 32000, mrp: 42000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p105", slug: "citizen-garrison-quartz", title: "Citizen Garrison Quartz Leather Watch", brandSlug: "citizen", categorySlug: "watches", subcategory: "Men's Watches",
    metal: "stainless-steel", material: "Stainless Steel & Leather", collections: ["mens-essentials", "gifts-under-10000"], occasions: ["everyday"],
    price: 9500, mrp: 12000, discountPct: 21, images: [img("watch-citizen2-1"), img("watch-citizen2-2")],
    badges: ["New"], rating: 4.3, reviewCount: 234, variants: [{ id: "v105a", label: "42mm / Brown Leather", price: 9500, mrp: 12000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // Bangles continued
  {
    id: "p106", slug: "tanishq-diamond-bracelet", title: "Tanishq Diamond Tennis Bracelet 18K", brandSlug: "tanishq", categorySlug: "bangles", subcategory: "Diamond Bangles",
    metal: "gold", material: "18K Yellow Gold", collections: ["diamond-solitaires", "anniversary-edit"], occasions: ["anniversary", "gifting"],
    price: 85000, mrp: 98000, discountPct: 13, images: [img("bracelet-tanishq-1"), img("bracelet-tanishq-2")],
    badges: ["Bestseller", "Exclusive"], rating: 4.9, reviewCount: 67, variants: [{ id: "v106a", label: "7 inch", price: 85000, mrp: 98000, inStock: true }],
    virtualTryOn: true, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p107", slug: "joyalukkas-gold-kangan", title: "Joyalukkas 22K Kangan Gold Bangle", brandSlug: "joyalukkas", categorySlug: "bangles", subcategory: "Gold Bangles",
    metal: "gold", material: "22K Yellow Gold", collections: ["bridal-2024", "festive-glow"], occasions: ["wedding", "festive"],
    price: 62000, mrp: 71000, discountPct: 13, images: [img("bangle-joy-1"), img("bangle-joy-2")],
    badges: [], rating: 4.7, reviewCount: 89, variants: [{ id: "v107a", label: "2.4 (M)", price: 62000, mrp: 71000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p108", slug: "pc-chandra-bangles-set", title: "PC Chandra 22K Gold Bangle Set (Set of 6)", brandSlug: "pc-chandra", categorySlug: "bangles", subcategory: "Gold Bangles",
    metal: "gold", material: "22K Yellow Gold", collections: ["bridal-2024", "heirloom-jewellery"], occasions: ["wedding"],
    price: 195000, mrp: 225000, discountPct: 13, images: [img("bangle-pc-1"), img("bangle-pc-2")],
    badges: ["Exclusive"], rating: 4.8, reviewCount: 34, variants: [{ id: "v108a", label: "2.4 (M)", price: 195000, mrp: 225000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p109", slug: "voylla-fashion-bracelet", title: "Voylla Fashion Alloy Bracelet Set", brandSlug: "voylla", categorySlug: "bangles", subcategory: "Fashion Bangles",
    metal: "silver", material: "Alloy", collections: ["gifts-under-5000", "festive-glow"], occasions: ["everyday", "festive"],
    price: 599, mrp: 1199, discountPct: 50, images: [img("bracelet-voylla-1"), img("bracelet-voylla-2")],
    badges: ["B1G1", "Bestseller"], rating: 3.8, reviewCount: 1567, variants: [{ id: "v109a", label: "Free Size", price: 599, mrp: 1199, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p110", slug: "thomas-sabo-bracelet", title: "Thomas Sabo Charm Bracelet 925 Silver", brandSlug: "thomas-sabo", categorySlug: "bangles", subcategory: "Bracelets",
    metal: "silver", material: "925 Sterling Silver", collections: ["gifts-under-10000", "valentines-edit"], occasions: ["everyday", "gifting"],
    price: 8500, mrp: 11000, discountPct: 23, images: [img("bracelet-thomas-1"), img("bracelet-thomas-2")],
    badges: ["New", "Trending"], rating: 4.4, reviewCount: 178, variants: [{ id: "v110a", label: "17cm", price: 8500, mrp: 11000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },

  // More diverse products p111–p250
  // Maang Tikka
  {
    id: "p111", slug: "tanishq-maangtikka-bridal", title: "Tanishq 22K Bridal Maang Tikka", brandSlug: "tanishq", categorySlug: "maangtikka", subcategory: "Bridal Maang Tikka",
    metal: "gold", material: "22K Yellow Gold", collections: ["bridal-2024", "royal-heritage"], occasions: ["wedding"],
    price: 32000, mrp: 38000, discountPct: 16, images: [img("tikka-tanishq-1"), img("tikka-tanishq-2")],
    badges: ["Bestseller"], rating: 4.9, reviewCount: 89, variants: [{ id: "v111a", label: "One Size", price: 32000, mrp: 38000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p112", slug: "amrapali-kundan-maangtikka", title: "Amrapali Kundan Maang Tikka", brandSlug: "amrapali", categorySlug: "maangtikka", subcategory: "Kundan Maang Tikka",
    metal: "gold", material: "Gold Plated Silver", collections: ["kundan-collection", "bridal-2024"], occasions: ["wedding", "festive"],
    price: 3500, mrp: 5500, discountPct: 36, images: [img("tikka-amrapali-1"), img("tikka-amrapali-2")],
    badges: ["Trending"], rating: 4.6, reviewCount: 234, variants: [{ id: "v112a", label: "One Size", price: 3500, mrp: 5500, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  // Anklets
  {
    id: "p113", slug: "tanishq-anklet-gold", title: "Tanishq 22K Gold Payal Anklet", brandSlug: "tanishq", categorySlug: "anklets", subcategory: "Gold Anklets",
    metal: "gold", material: "22K Yellow Gold", collections: ["everyday-essentials", "festive-glow"], occasions: ["everyday", "festive"],
    price: 18000, mrp: 21000, discountPct: 14, images: [img("anklet-gold-1"), img("anklet-gold-2")],
    badges: [], rating: 4.7, reviewCount: 145, variants: [{ id: "v113a", label: "10 inch", price: 18000, mrp: 21000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p114", slug: "giva-silver-anklet", title: "GIVA 925 Silver Floral Anklet", brandSlug: "giva", categorySlug: "anklets", subcategory: "Silver Anklets",
    metal: "silver", material: "925 Sterling Silver", collections: ["silver-stories", "summer-shine"], occasions: ["everyday"],
    price: 799, mrp: 1499, discountPct: 47, images: [img("anklet-silver-1"), img("anklet-silver-2")],
    badges: ["Bestseller"], rating: 4.3, reviewCount: 678, variants: [{ id: "v114a", label: "10 inch", price: 799, mrp: 1499, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  // Nosepins
  {
    id: "p115", slug: "malabar-gold-nosepin", title: "Malabar Gold Diamond Nose Pin 18K", brandSlug: "malabar-gold", categorySlug: "nosepins", subcategory: "Diamond Nose Pins",
    metal: "gold", material: "18K Yellow Gold", collections: ["everyday-essentials", "bridal-2024"], occasions: ["everyday", "wedding"],
    price: 4500, mrp: 5500, discountPct: 18, images: [img("nosepin-gold-1"), img("nosepin-gold-2")],
    badges: ["Bestseller"], rating: 4.6, reviewCount: 312, variants: [{ id: "v115a", label: "Press Pin", price: 4500, mrp: 5500, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  // Gold coins
  {
    id: "p116", slug: "malabar-gold-coin-1g", title: "Malabar Gold 24K Gold Coin 1 gram", brandSlug: "malabar-gold", categorySlug: "pendants", subcategory: "Gold Coins",
    metal: "gold", material: "24K Gold", collections: ["gold-coins-bars", "festive-glow"], occasions: ["festive", "gifting"],
    price: 6500, mrp: 7200, discountPct: 10, images: [img("coin-1g-1"), img("coin-1g-2")],
    badges: [], rating: 4.8, reviewCount: 456, variants: [{ id: "v116a", label: "1g", price: 6500, mrp: 7200, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p117", slug: "tanishq-gold-coin-5g", title: "Tanishq 24K Gold Coin 5 gram", brandSlug: "tanishq", categorySlug: "pendants", subcategory: "Gold Coins",
    metal: "gold", material: "24K Gold", collections: ["gold-coins-bars", "corporate-gifts"], occasions: ["gifting"],
    price: 32000, mrp: 35000, discountPct: 9, images: [img("coin-5g-1"), img("coin-5g-2")],
    badges: [], rating: 4.9, reviewCount: 234, variants: [{ id: "v117a", label: "5g", price: 32000, mrp: 35000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },

  // Additional watches to fill quota
  {
    id: "p118", slug: "zenith-chronomaster-original", title: "Zenith Chronomaster Original 38mm", brandSlug: "zenith", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons"], occasions: ["everyday"],
    price: 680000, mrp: 750000, discountPct: 9, images: [img("watch-zenith-1"), img("watch-zenith-2")],
    badges: ["Exclusive"], rating: 4.8, reviewCount: 14, variants: [{ id: "v118a", label: "38mm / Blue Dial", price: 680000, mrp: 750000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p119", slug: "iwc-portofino-automatic", title: "IWC Portofino Automatic 40mm", brandSlug: "iwc", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "office-to-evening"], occasions: ["everyday", "corporate"],
    price: 550000, mrp: 610000, discountPct: 10, images: [img("watch-iwc-1"), img("watch-iwc-2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 18, variants: [{ id: "v119a", label: "40mm / Silver Dial", price: 550000, mrp: 610000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p120", slug: "jaeger-lecoultre-reverso", title: "Jaeger-LeCoultre Reverso Classic Small Duetto", brandSlug: "jaeger-lecoultre", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "heirloom-jewellery"], occasions: ["everyday"],
    price: 740000, mrp: 820000, discountPct: 10, images: [img("watch-jlc-1"), img("watch-jlc-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 9, variants: [{ id: "v120a", label: "20.5x34.2mm", price: 740000, mrp: 820000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p121", slug: "panerai-luminor-marina", title: "Panerai Luminor Marina 44mm", brandSlug: "panerai", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday"],
    price: 785000, mrp: 865000, discountPct: 9, images: [img("watch-panerai-1"), img("watch-panerai-2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 12, variants: [{ id: "v121a", label: "44mm / Black Dial", price: 785000, mrp: 865000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p122", slug: "blancpain-fifty-fathoms", title: "Blancpain Fifty Fathoms Automatique 45mm", brandSlug: "blancpain", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons", "luxury-sport"], occasions: ["everyday"],
    price: 980000, mrp: 1080000, discountPct: 9, images: [img("watch-blancpain-1"), img("watch-blancpain-2")],
    badges: ["Exclusive"], rating: 4.9, reviewCount: 8, variants: [{ id: "v122a", label: "45mm / Blue Dial", price: 980000, mrp: 1080000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p123", slug: "patek-philippe-calatrava", title: "Patek Philippe Calatrava 38mm", brandSlug: "patek-philippe", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "gold", material: "18K White Gold", collections: ["watch-icons"], occasions: ["everyday"],
    price: 3200000, mrp: 3500000, discountPct: 9, images: [img("watch-patek-1"), img("watch-patek-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 4, variants: [{ id: "v123a", label: "38mm / Silver Dial", price: 3200000, mrp: 3500000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p124", slug: "vacheron-overseas-auto", title: "Vacheron Constantin Overseas Automatic 41mm", brandSlug: "vacheron-constantin", categorySlug: "watches", subcategory: "Luxury Watches",
    metal: "stainless-steel", material: "Stainless Steel", collections: ["watch-icons"], occasions: ["everyday"],
    price: 1480000, mrp: 1625000, discountPct: 9, images: [img("watch-vacheron-1"), img("watch-vacheron-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 5, variants: [{ id: "v124a", label: "41mm / Blue Dial", price: 1480000, mrp: 1625000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  // More budget-friendly products
  {
    id: "p125", slug: "giva-couple-rings", title: "GIVA 925 Silver Couple Ring Set", brandSlug: "giva", categorySlug: "rings", subcategory: "Couple Rings",
    metal: "silver", material: "925 Sterling Silver", collections: ["couple-bands", "valentines-edit"], occasions: ["anniversary", "gifting"],
    price: 1899, mrp: 3499, discountPct: 46, images: [img("ring-couple-1"), img("ring-couple-2")],
    badges: ["Bestseller", "B1G1"], rating: 4.5, reviewCount: 1023, variants: [{ id: "v125a", label: "His (Size 8) + Hers (Size 5)", price: 1899, mrp: 3499, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  {
    id: "p126", slug: "youbella-charm-bracelet", title: "YouBella Alloy Charm Bracelet", brandSlug: "youbella", categorySlug: "bangles", subcategory: "Fashion Bangles",
    metal: "gold", material: "Gold Plated Alloy", collections: ["gifts-under-5000", "summer-shine"], occasions: ["everyday", "gifting"],
    price: 349, mrp: 699, discountPct: 50, images: [img("bracelet-youbella-1"), img("bracelet-youbella-2")],
    badges: ["B1G1", "Bestseller"], rating: 3.7, reviewCount: 3456, variants: [{ id: "v126a", label: "Free Size", price: 349, mrp: 699, inStock: true }],
    virtualTryOn: false, sameDayDelivery: true, inStock: true,
  },
  // More premium products
  {
    id: "p127", slug: "cartier-love-bracelet", title: "Cartier Love Bracelet 18K Yellow Gold", brandSlug: "cartier", categorySlug: "bangles", subcategory: "Luxury Bracelets",
    metal: "gold", material: "18K Yellow Gold", collections: ["statement-pieces", "heirloom-jewellery"], occasions: ["everyday", "anniversary"],
    price: 565000, mrp: 615000, discountPct: 8, images: [img("bracelet-cartier-1"), img("bracelet-cartier-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 23, variants: [{ id: "v127a", label: "Size 17", price: 565000, mrp: 615000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p128", slug: "bulgari-serpenti-necklace", title: "Bulgari Serpenti Viper Necklace 18K Gold", brandSlug: "bulgari", categorySlug: "necklaces", subcategory: "Diamond Necklaces",
    metal: "gold", material: "18K Rose Gold", collections: ["statement-pieces", "heirloom-jewellery"], occasions: ["festive", "gifting"],
    price: 1250000, mrp: 1380000, discountPct: 9, images: [img("necklace-bulgari-1"), img("necklace-bulgari-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 7, variants: [{ id: "v128a", label: "One Size", price: 1250000, mrp: 1380000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p129", slug: "van-cleef-arpels-alhambra", title: "Van Cleef & Arpels Vintage Alhambra Long Necklace", brandSlug: "van-cleef", categorySlug: "necklaces", subcategory: "Diamond Necklaces",
    metal: "gold", material: "18K Yellow Gold", collections: ["statement-pieces", "heirloom-jewellery"], occasions: ["festive", "everyday"],
    price: 1850000, mrp: 2050000, discountPct: 10, images: [img("necklace-vancleef-1"), img("necklace-vancleef-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 3, variants: [{ id: "v129a", label: "One Size", price: 1850000, mrp: 2050000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },
  {
    id: "p130", slug: "tiffany-hardwear-bracelet", title: "Tiffany HardWear Link Bracelet 18K Gold", brandSlug: "tiffany", categorySlug: "bangles", subcategory: "Luxury Bracelets",
    metal: "gold", material: "18K Yellow Gold", collections: ["statement-pieces", "anniversary-edit"], occasions: ["everyday", "anniversary"],
    price: 485000, mrp: 530000, discountPct: 8, images: [img("bracelet-tiffany-1"), img("bracelet-tiffany-2")],
    badges: ["Exclusive"], rating: 5.0, reviewCount: 15, variants: [{ id: "v130a", label: "Medium", price: 485000, mrp: 530000, inStock: true }],
    virtualTryOn: false, sameDayDelivery: false, inStock: true,
  },

  // Fill remaining products to ~250 with varied items
  ...Array.from({ length: 120 }, (_, i) => {
    const idx = i + 131;
    const brands = ["tanishq", "giva", "bluestone", "caratlane", "melorra", "malabar-gold", "kalyan-jewellers", "senco-gold", "swarovski", "pandora", "titan", "fossil", "casio", "fastrack", "amrapali", "tribe-amrapali", "zariin", "isharya"];
    const cats = ["rings", "necklaces", "earrings", "bangles", "pendants", "watches", "sets"];
    const metals: Array<"gold" | "silver" | "rose-gold" | "platinum" | "stainless-steel"> = ["gold", "silver", "rose-gold", "platinum", "stainless-steel"];
    const colls = ["everyday-essentials", "festive-glow", "gifts-under-5000", "gifts-under-10000", "silver-stories", "valentines-edit", "summer-shine"];
    const occasions = ["everyday", "festive", "gifting", "wedding", "anniversary"];
    const badgeOptions: Array<"New" | "Bestseller" | "B1G1" | "Trending"> = ["New", "Bestseller", "B1G1", "Trending"];
    const brandSlug = brands[idx % brands.length];
    const categorySlug = cats[idx % cats.length];
    const metal = metals[idx % metals.length];
    const basePrice = 500 + (idx * 317) % 50000;
    const mrp = Math.round(basePrice * (1.1 + (idx % 5) * 0.05));
    const discountPct = Math.round(((mrp - basePrice) / mrp) * 100);
    const rating = 3.5 + (idx % 15) * 0.1;
    const badge = idx % 4 === 0 ? badgeOptions[idx % badgeOptions.length] : undefined;
    const isBogo = idx % 7 === 0;
    const isVirtualTryOn = idx % 12 === 0;
    const isSameDay = idx % 5 === 0;
    return {
      id: `p${idx}`,
      slug: `product-${idx}-${brandSlug}-${categorySlug}`,
      title: `${brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1)} ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Design ${idx}`,
      brandSlug,
      categorySlug,
      subcategory: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
      metal,
      material: metal === "gold" ? "22K Yellow Gold" : metal === "silver" ? "925 Sterling Silver" : metal === "rose-gold" ? "14K Rose Gold" : metal === "platinum" ? "Platinum 950" : "Stainless Steel",
      collections: [colls[idx % colls.length], colls[(idx + 2) % colls.length]],
      occasions: [occasions[idx % occasions.length]],
      price: basePrice,
      mrp,
      discountPct,
      images: [img(`product-${idx}-a`, 600, 600), img(`product-${idx}-b`, 600, 600)],
      badges: (badge ? [badge] : []).concat(isBogo ? ["B1G1" as const] : []),
      rating: Math.round(rating * 10) / 10,
      reviewCount: 5 + (idx * 23) % 500,
      variants: [{ id: `v${idx}a`, label: "One Size", price: basePrice, mrp, inStock: idx % 10 !== 0 }],
      virtualTryOn: isVirtualTryOn,
      sameDayDelivery: isSameDay,
      inStock: idx % 15 !== 0,
    } as Product;
  }),
];
