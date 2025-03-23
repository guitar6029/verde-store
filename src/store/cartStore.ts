import { toast } from "react-toastify";
import { create } from "zustand";
import type { Item } from "@/types/CardProps";

interface CartState {
  favorites: Item[];
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  favorites: [],
  addToCart: (item) =>
    set((state) => {
      //toast success
      toast.success(`${item.name} added to cart`);
      return { ...state, cart: [...state.cart, item] };
    }),
  removeFromCart: (itemId: number) =>
    set((state) => {
      toast.success("Item removed from cart");
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== itemId),
      };
    }),
  clearCart: () =>
    set((state) => {
      return { ...state, cart: [] };
    }),
}));
