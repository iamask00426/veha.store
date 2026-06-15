"use client";

import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import type { WishlistItem } from "@/types";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "CLEAR_WISHLIST" }
  | { type: "HYDRATE"; payload: WishlistItem[] };

interface WishlistContextValue {
  items: WishlistItem[];
  totalItems: number;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

const LOCAL_STORAGE_KEY = "brandname_wishlist";

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };

    case "ADD_ITEM": {
      const exists = state.items.some((item) => item.productId === action.payload.productId);
      if (exists) return state;
      return { items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.productId !== action.payload.productId),
      };

    case "CLEAR_WISHLIST":
      return { items: [] };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = safeLocalStorageGet<WishlistItem[]>(LOCAL_STORAGE_KEY, []);
    if (stored.length > 0) {
      dispatch({ type: "HYDRATE", payload: stored });
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    safeLocalStorageSet(LOCAL_STORAGE_KEY, state.items);
  }, [state.items]);

  const addToWishlist = useCallback((productId: string) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { productId, addedAt: new Date().toISOString() },
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      const exists = state.items.some((item) => item.productId === productId);
      if (exists) {
        dispatch({ type: "REMOVE_ITEM", payload: { productId } });
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: { productId, addedAt: new Date().toISOString() },
        });
      }
    },
    [state.items]
  );

  const isWishlisted = useCallback(
    (productId: string) => {
      return state.items.some((item) => item.productId === productId);
    },
    [state.items]
  );

  const clearWishlist = useCallback(() => {
    dispatch({ type: "CLEAR_WISHLIST" });
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        totalItems: state.items.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
