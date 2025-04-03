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
  increaseQuantity: (item: Plant) => void;
  decreaseQuantity: (item: Plant) => void;
}

//create localStora
const loadCartFromLocalStorage = (): Plant[] => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const localStoredCart = localStorage.getItem("cart");
      return localStoredCart ? JSON.parse(localStoredCart) : [];
    } catch (error) {
      console.error("Error loading cart from local storage:", error);
      return [];
    }
  }
  return [];
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: loadCartFromLocalStorage(),
  favorites: [],
  addToCart: (item) =>
    set((state) => {
      // Check if the item already exists in the cart
      const itemExists = state.cart.find((cartItem) => cartItem.id === item.id);

      // Update or add the item in the cart
      const updatedCart = itemExists
        ? state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...state.cart, { ...item, quantity: 1 }];

      // Save updated cart to local storage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      // Show toast notification
      toast.success(`${item.name} added to cart`);

      return { ...state, cart: updatedCart };
    }),

  removeFromCart: (item: Plant) =>
    set((state) => {
      toast.success(`${item.name} removed from cart`);
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== item.id
      );

      //save to local storage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }),
  clearCart: () =>
    set((state) => {
      const updatedCart: Plant[] = [];
      // Save to local storage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      // Only update the 'cart' property
      return { ...state, cart: updatedCart };
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
  increaseQuantity: (item) =>
    set((state) => {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      toast.success(`${item.name} added to cart`);
      // Save to local storage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return { ...state, cart: updatedCart };
    }),
  decreaseQuantity: (item) =>
    set((state) => {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: item.quantity > 1 ? cartItem.quantity - 1 : 1,
            }
          : cartItem
      );
      toast.success(`${item.name} removed from cart`);
      // Save to local storage
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }),
}));
