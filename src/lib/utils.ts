// ─── Format & Currency Utilities ─────────────────────────────────────────────

/**
 * Format a number as Indian Rupee currency string
 * e.g. 125000 → "₹1,25,000"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get a human-readable discount label
 * e.g. discountPct=15 → "15% OFF"
 */
export function getDiscountLabel(discountPct: number): string {
  return `${discountPct}% OFF`;
}

/**
 * Calculate discount percentage from price and MRP
 */
export function calcDiscount(price: number, mrp: number): number {
  if (mrp <= 0) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Calculate savings amount
 */
export function calcSavings(price: number, mrp: number): number {
  return mrp - price;
}

// ─── Slug & String Utilities ──────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ─── Rating Utilities ─────────────────────────────────────────────────────────

/**
 * Returns an array of star values: 1 = full, 0.5 = half, 0 = empty
 */
export function getStarValues(rating: number): Array<"full" | "half" | "empty"> {
  const stars: Array<"full" | "half" | "empty"> = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push("full");
    else if (rating >= i - 0.5) stars.push("half");
    else stars.push("empty");
  }
  return stars;
}

// ─── Product Utilities ────────────────────────────────────────────────────────

export function getLowestPrice(variants: Array<{ price: number; inStock: boolean }>): number {
  const inStock = variants.filter((v) => v.inStock);
  if (inStock.length === 0) return variants[0]?.price ?? 0;
  return Math.min(...inStock.map((v) => v.price));
}

// ─── Cart Utilities ───────────────────────────────────────────────────────────

export function calcCartTotal(items: Array<{ price: number; qty: number }>): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function calcCartMRP(items: Array<{ mrp: number; qty: number }>): number {
  return items.reduce((sum, item) => sum + item.mrp * item.qty, 0);
}

export function calcCartSavings(
  items: Array<{ price: number; mrp: number; qty: number }>
): number {
  return calcCartMRP(items) - calcCartTotal(items);
}

// ─── Local Storage Utilities ──────────────────────────────────────────────────

export function safeLocalStorageGet<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function safeLocalStorageSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}
