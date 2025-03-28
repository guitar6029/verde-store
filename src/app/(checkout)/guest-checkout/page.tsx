"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import GuestCheckoutSection from "@/components/Checkout/GuestCheckout";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function GuestCheckout() {
  const { getTotalPrice } = useCartStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const totalAmount = getTotalPrice();

    // Redirect if not coming from /cart and totalAmount is 0
    if (pathname !== "/cart" && totalAmount === 0) {
      router.push("/");
    }
  }, [pathname, router, getTotalPrice]);

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const amount = getTotalPrice();

  if (amount === 0) {
    return (
      <div className="min-h-screen p-10 flex flex-col  gap-[3rem]">
        <HeaderWithImgBg title="Guest Checkout" />
        <Link
          href="/cart"
          className="flex flex-row items-center gap-2 hover:text-green-400 transition duration-300 ease-in"
        >
          <ArrowLeft size={30} />
          <span className="text-2xl">Go Back</span>
        </Link>

        <div className="flex flex-col gap-2 justify-center items-center mx-auto">
          <p className="text-2xl">Your cart is empty</p>
          <p className="text-2xl">Please add items to your cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 flex flex-col gap-[3rem]">
      <HeaderWithImgBg title="Checkout" />
      <Link
        href="/cart"
        className="flex flex-row items-center gap-2 hover:text-green-400 transition duration-300 ease-in"
      >
        <ArrowLeft size={30} />
        <span className="text-2xl">Go Back</span>
      </Link>
      <h1 className="text-4xl">Total : ${amount}</h1>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          appearance: {
            theme: "stripe",
          },
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <GuestCheckoutSection amount={amount} />
      </Elements>
    </div>
  );
}
