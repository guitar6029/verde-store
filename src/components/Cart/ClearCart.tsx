"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function ClearCart() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null; // This component does not render anything
}
