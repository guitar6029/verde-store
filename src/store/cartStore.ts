import { toast } from "react-toastify";
import { create } from "zustand";
import type { Plant } from "@/types/CardProps";

interface CartState {
  favorites: Plant[];
  cart: Plant[];
  addToCart: (item: Plant) => void;
  removeFromCart: (item: Plant) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getShoppingCart: () => Plant[];
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  favorites: [],
  addToCart: (item) =>
    set((state) => {
      // Check if the item is already in the cart
      const itemInCart = state.cart.find((cartItem) => cartItem.id === item.id);
      if (itemInCart) {
        // Update quantity of the existing item
        const updatedCart = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        toast.success(`${item.name} added to cart`);
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If item isn't in the cart, add it with a quantity of 1
        toast.success(`${item.name} added to cart`);
        return {
          ...state,
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }
    }),

  removeFromCart: (item: Plant) =>
    set((state) => {
      toast.success(`${item.name} removed from cart`);
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== item.id),
      };
    }),
  clearCart: () =>
    set((state) => {
      return { ...state, cart: [] };
    }),
  getTotalPrice: () => {
    const total = get()
      .cart.reduce((accum, item) => accum + item.price * item.quantity, 0)
      .toFixed(2);
    return Number(total);
  },
  getShoppingCart: () => {
    return get().cart;
  },
}));
