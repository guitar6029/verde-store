"use client";

import ShoppingCart from "../Icons/ShoppingCart";
import { useCartStore } from "@/store/cartStore";
import { Plant } from "@/types/CardProps";
export default function ShoppingCartWrapper({ item }: { item: Plant }) {
  const { addToCart } = useCartStore();

  /**
   * Handles the click event on the shopping cart icon.
   * Adds the item to the cart by calling addToCart.
   */
  const handleClick = () => {
    addToCart(item);
  };

  return <ShoppingCart onClick={handleClick} />;
}
