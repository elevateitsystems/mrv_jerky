// src/lib/store/useCartStore.ts
import { create } from "zustand";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = "mrv_jerky_cart";

export const useCartStore = create<CartState>((set) => {
  // Load initial cart state on client side
  const getInitialItems = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveCart = (items: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  };

  return {
    items: getInitialItems(),

    addItem: (productId) =>
      set((state) => {
        const existing = state.items.find((item) => item.productId === productId);
        let newItems;
        if (existing) {
          newItems = state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...state.items, { productId, quantity: 1 }];
        }
        saveCart(newItems);
        return { items: newItems };
      }),

    removeItem: (productId) =>
      set((state) => {
        const newItems = state.items.filter((item) => item.productId !== productId);
        saveCart(newItems);
        return { items: newItems };
      }),

    updateQuantity: (productId, quantity) =>
      set((state) => {
        if (quantity <= 0) {
          const newItems = state.items.filter((item) => item.productId !== productId);
          saveCart(newItems);
          return { items: newItems };
        }
        const newItems = state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        saveCart(newItems);
        return { items: newItems };
      }),

    clearCart: () =>
      set(() => {
        saveCart([]);
        return { items: [] };
      }),
  };
});
