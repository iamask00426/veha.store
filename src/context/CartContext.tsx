"use client";

import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import type { CartItem } from "@/types";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId: string | null } }
  | { type: "UPDATE_QTY"; payload: { productId: string; variantId: string | null; qty: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId: string | null) => void;
  updateQty: (productId: string, variantId: string | null, qty: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId?: string | null) => boolean;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

const LOCAL_STORAGE_KEY = "brandname_cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };

    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === action.payload.productId &&
            item.variantId === action.payload.variantId
              ? { ...item, qty: item.qty + action.payload.qty }
              : item
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.variantId === action.payload.variantId
            )
        ),
      };

    case "UPDATE_QTY":
      if (action.payload.qty <= 0) {
        return {
          items: state.items.filter(
            (item) =>
              !(
                item.productId === action.payload.productId &&
                item.variantId === action.payload.variantId
              )
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = safeLocalStorageGet<CartItem[]>(LOCAL_STORAGE_KEY, []);
    if (stored.length > 0) {
      dispatch({ type: "HYDRATE", payload: stored });
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    safeLocalStorageSet(LOCAL_STORAGE_KEY, state.items);
  }, [state.items]);

  const addToCart = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeFromCart = useCallback((productId: string, variantId: string | null) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
  }, []);

  const updateQty = useCallback(
    (productId: string, variantId: string | null, qty: number) => {
      dispatch({ type: "UPDATE_QTY", payload: { productId, variantId, qty } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const isInCart = useCallback(
    (productId: string, variantId?: string | null) => {
      return state.items.some(
        (item) =>
          item.productId === productId &&
          (variantId === undefined || item.variantId === variantId)
      );
    },
    [state.items]
  );

  const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
