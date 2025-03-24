"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutSection from "@/components/Checkout/CheckoutSection";
export default function Checkout() {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  //demo test
  const amount = 45.55;

  return (
    <div className="min-h-screen p-10 flex flex-col  gap-[3rem]">
      <HeaderWithImgBg title="Checkout" />
      <h1 className="text-4xl">Amount : {amount}</h1>
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
        <CheckoutSection amount={amount} />
      </Elements>
    </div>
  );
}
