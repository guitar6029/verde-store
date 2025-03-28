"use client";
import { useCartStore } from "@/store/cartStore";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import Link from "next/link";

export default function GuestSuccessPage() {
  const { clearCart } = useCartStore();

  clearCart();

  return (
    <div className="min-h-screen p-10 flex flex-col">
      <HeaderWithImgBg title="Success" />
      <div className="flex flex-col gap-2 justify-center items-center mx-auto my-auto">
        <h1 className="text-4xl">Thank you for your order!</h1>
        <Link href={"/"} className="text-2xl">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
