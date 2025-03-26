"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Check if the URL has the expected parameters (like amount) to confirm success
    const queryParams = new URLSearchParams(window.location.search);
    const amount = queryParams.get("amount");

    if (amount) {
      // Payment is successful, clear the cart
      clearCart();
    } else {
      // If there's no amount, consider it an invalid state or failed payment
      router.push("/"); // Redirect to home or another appropriate page
    }
  }, [clearCart, router]);

  return (
    <div className="min-h-screen p-10 flex flex-col">
      <HeaderWithImgBg title="Success" />
      <div className="flex flex-col gap-2 justify-center items-center mx-auto my-auto">
        <h1 className="text-4xl">Thank you for your order!</h1>
        <Link href={"/"} className="text-2xl">Back to Home</Link>
      </div>
    </div>
  );
}
