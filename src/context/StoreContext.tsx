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
  createOrder: (customer: OrderCustomer, items: CartItem[], subtotal: number, discount: number, shipping: number, total: number, paymentMethod: string, couponCode?: string) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingId?: string, carrier?: string) => void;
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
      const migrated = localProducts.map(p => ({
        ...p,
        stock: p.stock !== undefined ? p.stock : (p.inStock ? 10 : 0)
      }));
      setProducts(migrated);
      safeLocalStorageSet("veha_products", migrated);
    } else {
      const seeded = initialProducts.map(p => ({
        ...p,
        stock: p.inStock ? 10 : 0
      }));
      setProducts(seeded);
      safeLocalStorageSet("veha_products", seeded);
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
      const migrated = localCoupons.map(c => ({
        ...c,
        usageCount: c.usageCount !== undefined ? c.usageCount : 0,
        isActive: c.isActive !== undefined ? c.isActive : true
      }));
      setCoupons(migrated);
      safeLocalStorageSet("veha_coupons", migrated);
    } else {
      const seeded = initialCoupons.map(c => ({
        ...c,
        usageCount: 0,
        isActive: true
      }));
      setCoupons(seeded);
      safeLocalStorageSet("veha_coupons", seeded);
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
    
    const stock = p.stock !== undefined ? p.stock : 10;
    const newProduct: Product = {
      ...p,
      id,
      slug,
      rating: 5,
      reviewCount: 0,
      stock,
      inStock: stock > 0
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

        const stock = updatedFields.stock !== undefined ? updatedFields.stock : p.stock;
        const inStock = updatedFields.inStock !== undefined 
          ? updatedFields.inStock 
          : (stock !== undefined ? stock > 0 : p.inStock);

        return {
          ...p,
          ...updatedFields,
          slug,
          stock,
          inStock
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
    paymentMethod: string,
    couponCode?: string
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

    // Deduct product stocks
    const updatedProducts = products.map(p => {
      const orderItem = items.find(item => item.productId === p.id);
      if (orderItem) {
        const currentStock = p.stock ?? 10;
        const newStock = Math.max(0, currentStock - orderItem.qty);
        return {
          ...p,
          stock: newStock,
          inStock: newStock > 0
        };
      }
      return p;
    });
    saveProducts(updatedProducts);

    // Increment coupon usage
    if (couponCode) {
      const updatedCoupons = coupons.map(c => {
        if (c.code.toUpperCase() === couponCode.toUpperCase()) {
          return {
            ...c,
            usageCount: (c.usageCount ?? 0) + 1
          };
        }
        return c;
      });
      saveCoupons(updatedCoupons);
    }

    saveOrders([newOrder, ...orders]);
    return id;
  };

  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    trackingId?: string, 
    carrier?: string
  ) => {
    const orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate) return;

    const prevStatus = orderToUpdate.status;
    
    // Restock if cancelled
    if (status === "Cancelled" && prevStatus !== "Cancelled") {
      const updatedProducts = products.map(p => {
        const orderItem = orderToUpdate.items.find(item => item.productId === p.id);
        if (orderItem) {
          const currentStock = p.stock ?? 0;
          const newStock = currentStock + orderItem.qty;
          return {
            ...p,
            stock: newStock,
            inStock: newStock > 0
          };
        }
        return p;
      });
      saveProducts(updatedProducts);
    }

    // Deduct stock if un-cancelled
    if (prevStatus === "Cancelled" && status !== "Cancelled") {
      const updatedProducts = products.map(p => {
        const orderItem = orderToUpdate.items.find(item => item.productId === p.id);
        if (orderItem) {
          const currentStock = p.stock ?? 0;
          const newStock = Math.max(0, currentStock - orderItem.qty);
          return {
            ...p,
            stock: newStock,
            inStock: newStock > 0
          };
        }
        return p;
      });
      saveProducts(updatedProducts);
    }

    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { 
          ...o, 
          status,
          trackingId: trackingId !== undefined ? trackingId : o.trackingId,
          carrier: carrier !== undefined ? carrier : o.carrier
        };
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
      code: c.code.toUpperCase(),
      usageCount: 0,
      isActive: true
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
