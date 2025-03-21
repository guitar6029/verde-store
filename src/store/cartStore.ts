import { create} from "zustand";

type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (item) => set((state) => {
        cart: [...state.cart, item]
    }),
    removeFromCart: (itemId: string) => set((state) => {
        cart: state.cart.filter((item) => item.id !== itemId)
    }),
    clearCart: () => set({ cart: []})
}));