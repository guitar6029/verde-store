"use client";

import ShoppingCart from "../Icons/ShoppingCart";
import { useCartStore } from "@/store/cartStore";
import { Plant } from "@/types/CardProps";
export default function ShoppingCartWrapper({ item}: { item: Plant }) {
  const { addToCart } = useCartStore();

  const handleClick = () => {
    console.log("Wrapper handling the event!");
    addToCart(item);
  };

  return <ShoppingCart onClick={handleClick} />;
}
