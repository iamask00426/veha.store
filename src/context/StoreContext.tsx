"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product, Order, OrderCustomer, Coupon, CartItem, OrderStatus } from "@/types";
import { products as initialProducts } from "@/lib/data/products";
import { coupons as initialCoupons } from "@/lib/data/coupons";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/utils";

interface StoreContextType {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  addProduct: (product: Omit<Product, "id" | "slug">) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (customer: OrderCustomer, items: CartItem[], subtotal: number, discount: number, shipping: number, total: number, paymentMethod: string) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load initial data
  useEffect(() => {
    // Products
    const localProducts = safeLocalStorageGet<Product[]>("veha_products", []);
    if (localProducts && localProducts.length > 0) {
      setProducts(localProducts);
    } else {
      setProducts(initialProducts);
      safeLocalStorageSet("veha_products", initialProducts);
    }

    // Orders
    const localOrders = safeLocalStorageGet<Order[]>("veha_orders", []);
    if (localOrders && localOrders.length > 0) {
      setOrders(localOrders);
    } else {
      // Seed a couple of default orders for dashboard realism
      const seedOrders: Order[] = [
        {
          id: "ORD-9281",
          customer: {
            name: "Rohit Sharma",
            email: "rohit@gmail.com",
            phone: "9876543210",
            address: "Flat 402, Sea Breeze Apts, Bandra West",
            city: "Mumbai",
            zip: "400050"
          },
          items: [
            {
              productId: "p1",
              variantId: null,
              qty: 1,
              price: 18500,
              mrp: 22000,
              title: "Tanishq Solitaire Diamond Ring 18K",
              image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
              brandSlug: "tanishq"
            }
          ],
          subtotal: 18500,
          discount: 1500,
          shipping: 0,
          total: 17000,
          status: "Delivered",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          paymentMethod: "UPI"
        },
        {
          id: "ORD-1847",
          customer: {
            name: "Priya Patel",
            email: "priya@yahoo.com",
            phone: "9823456781",
            address: "12, Rosewood Enclave, Jubilee Hills",
            city: "Hyderabad",
            zip: "500033"
          },
          items: [
            {
              productId: "p2",
              variantId: null,
              qty: 1,
              price: 4999,
              mrp: 5999,
              title: "BlueStone Floral Diamond Ring 14K Rose Gold",
              image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80",
              brandSlug: "bluestone"
            }
          ],
          subtotal: 4999,
          discount: 500,
          shipping: 0,
          total: 4499,
          status: "Shipped",
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          paymentMethod: "Card"
        }
      ];
      setOrders(seedOrders);
      safeLocalStorageSet("veha_orders", seedOrders);
    }

    // Coupons
    const localCoupons = safeLocalStorageGet<Coupon[]>("veha_coupons", []);
    if (localCoupons && localCoupons.length > 0) {
      setCoupons(localCoupons);
    } else {
      setCoupons(initialCoupons);
      safeLocalStorageSet("veha_coupons", initialCoupons);
    }

    setLoaded(true);
  }, []);

  // Save updates to localStorage
  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    safeLocalStorageSet("veha_products", updated);
  };

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    safeLocalStorageSet("veha_orders", updated);
  };

  const saveCoupons = (updated: Coupon[]) => {
    setCoupons(updated);
    safeLocalStorageSet("veha_coupons", updated);
  };

  // CRUD Operations
  const addProduct = (p: Omit<Product, "id" | "slug">) => {
    const id = "p_" + Date.now();
    const slug = p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const newProduct: Product = {
      ...p,
      id,
      slug,
      rating: 5,
      reviewCount: 0
    };

    saveProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const title = updatedFields.title ?? p.title;
        const slug = updatedFields.title
          ? title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
          : p.slug;

        return {
          ...p,
          ...updatedFields,
          slug
        };
      }
      return p;
    });
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const createOrder = (
    customer: OrderCustomer,
    items: CartItem[],
    subtotal: number,
    discount: number,
    shipping: number,
    total: number,
    paymentMethod: string
  ): string => {
    const id = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id,
      customer,
      items,
      subtotal,
      discount,
      shipping,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
      paymentMethod
    };

    saveOrders([newOrder, ...orders]);
    return id;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    });
    saveOrders(updated);
  };

  const addCoupon = (c: Coupon) => {
    // Check if code already exists
    if (coupons.some((x) => x.code.toUpperCase() === c.code.toUpperCase())) {
      return;
    }
    const newCoupon: Coupon = {
      ...c,
      code: c.code.toUpperCase()
    };
    saveCoupons([...coupons, newCoupon]);
  };

  const deleteCoupon = (code: string) => {
    const updated = coupons.filter((c) => c.code.toUpperCase() !== code.toUpperCase());
    saveCoupons(updated);
  };

  return (
    <StoreContext.Provider
      value={{
        products: loaded ? products : initialProducts,
        orders,
        coupons: loaded ? coupons : initialCoupons,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus,
        addCoupon,
        deleteCoupon
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
