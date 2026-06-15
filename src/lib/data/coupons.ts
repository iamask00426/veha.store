import type { Coupon } from "@/types";

export const coupons: Coupon[] = [
  { code: "WELCOME10", type: "percent", value: 10, minOrder: 2000, appliesTo: "all", description: "10% off on your first order", expiresAt: "2025-12-31" },
  { code: "FLAT500", type: "flat", value: 500, minOrder: 5000, appliesTo: "all", description: "₹500 off on orders above ₹5,000", expiresAt: "2025-03-31" },
  { code: "BRIDAL15", type: "percent", value: 15, minOrder: 25000, appliesTo: ["rings", "sets", "mangalsutra", "maangtikka"], description: "15% off on bridal jewellery", expiresAt: "2025-06-30" },
  { code: "WATCHLOVER", type: "flat", value: 2000, minOrder: 15000, appliesTo: ["watches"], description: "₹2,000 off on watch purchases above ₹15,000", expiresAt: "2025-04-30" },
  { code: "FREESHIP", type: "freeShipping", value: 0, minOrder: 999, appliesTo: "all", description: "Free shipping on orders above ₹999", expiresAt: "2025-12-31" },
  { code: "BOGO2024", type: "bogo", value: 1, minOrder: 3000, appliesTo: ["bangles", "earrings"], description: "Buy 1 Get 1 Free on selected bangles & earrings", expiresAt: "2025-02-28" },
  { code: "DIWALI20", type: "percent", value: 20, minOrder: 10000, appliesTo: "all", description: "Diwali Special - 20% off!", expiresAt: "2024-11-15" },
  { code: "SILVER25", type: "percent", value: 25, minOrder: 1500, appliesTo: ["giva", "johareez", "peora", "shaya"], description: "25% off on all silver jewellery brands", expiresAt: "2025-03-31" },
  { code: "LUXURY5", type: "percent", value: 5, minOrder: 50000, appliesTo: ["rolex", "omega", "tag-heuer", "cartier"], description: "5% off on luxury timepieces above ₹50,000", expiresAt: "2025-12-31" },
  { code: "NEWUSER", type: "flat", value: 1000, minOrder: 3000, appliesTo: "all", description: "₹1,000 off for new users", expiresAt: "2025-12-31" },
];
