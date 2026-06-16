// ─── Domain Types for BRAND_NAME Jewelry & Watch Marketplace ───────────────

export type Metal = "gold" | "silver" | "platinum" | "rose-gold" | "titanium" | "stainless-steel" | "brass" | "copper";

export type BadgeType = "New" | "Bestseller" | "B1G1" | "Limited" | "Sale" | "Trending" | "Exclusive" | "Virtual Try-On" | "Same Day";

export interface ProductVariant {
  id: string;
  label: string; // e.g. "18K Yellow Gold / Size 7" or "42mm / Black Dial"
  price: number;
  mrp: number;
  inStock: boolean;
  images?: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brandSlug: string;
  categorySlug: string;
  subcategory: string;
  metal: Metal;
  material: string; // e.g. "18K Yellow Gold", "316L Stainless Steel"
  collections: string[]; // collection slugs
  occasions: string[]; // e.g. ["wedding", "everyday", "gifting"]
  price: number; // INR selling price
  mrp: number; // INR MRP
  discountPct: number;
  images: string[];
  badges: BadgeType[];
  rating: number; // 1–5
  reviewCount: number;
  variants: ProductVariant[];
  virtualTryOn: boolean;
  sameDayDelivery: boolean;
  inStock: boolean;
  description?: string;
}

export interface Brand {
  slug: string;
  name: string;
  logo: string;
  banner: string;
  tagline?: string;
  country?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string; // emoji or icon name
  parent?: string; // parent category slug
}

export interface Collection {
  slug: string;
  name: string;
  banner: string;
  description?: string;
}

export interface Review {
  id: string;
  customerName: string;
  city: string;
  avatar: string;
  productId: string;
  stars: number; // 1–5
  text: string;
  date?: string;
}

export type CouponType = "percent" | "flat" | "freeShipping" | "bogo";

export interface Coupon {
  code: string;
  type: CouponType;
  value: number; // percent off or flat INR off
  minOrder: number; // minimum cart value in INR
  appliesTo: "all" | string[]; // "all" or array of categorySlug / brandSlug
  description?: string;
  expiresAt?: string;
}

// ─── Cart & Wishlist ────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId: string | null;
  qty: number;
  price: number;
  mrp: number;
  title: string;
  image: string;
  brandSlug: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: string;
}
