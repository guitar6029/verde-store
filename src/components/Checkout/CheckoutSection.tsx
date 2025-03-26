"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { toast } from "react-toastify";


export default function CheckoutSection({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setLoading(false);
      toast.error(submitError.message);
    }

    //confirm payment
    const { error: confirmError } = await stripe.confirmPayment({
      elements, // Stripe Elements instance
      clientSecret: clientSecret!, // Keep this here; Stripe needs it
      confirmParams: {
        return_url: `http://localhost:3000/success?amount=${amount}`, // Clean URL (no secret exposed)
      },
    });

    if (confirmError) {
      setLoading(false);
      toast.error(confirmError.message);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="shadow-xl shadow-neutral-200 hover:shadow-neutral-400 transition duration-300 ease-in p-10 flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-2">
          <span>Loading...</span>
          <svg
            className="mr-3 -ml-1 size-5 animate-spin text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmitPayment}
      className="shadow-xl shadow-neutral-200 hover:shadow-neutral-400 transition duration-300 ease-in p-10"
    >
      {clientSecret && <PaymentElement />}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="p-5 flex flex-row items-center gap-2 bg-cyan-100 verde text-5xl w-full mt-5 hover:cursor-pointer hover:bg-cyan-200 transition duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{loading ? "Processing..." : "Make Payment"}</span>
        {loading && (
          <svg
            className="mr-3 -ml-1 size-5 animate-spin text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </button>
    </form>
  );
}
