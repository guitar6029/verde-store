import { create } from "zustand";
type Item = {
  id: number;
  image_url: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
};

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
      return { ...state, cart: [...state.cart, item] };
    }),
  removeFromCart: (itemId: number) =>
    set((state) => {
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
