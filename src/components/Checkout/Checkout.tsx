"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/User";
import LoadingPartial from "../Loading/LoadingPartial";
import LoadingSpinner from "../Icons/Loading";

//: ReactNode
export default function CheckoutSession({
  amount,
  user,
}: {
  amount: number;
  user: UserType | null;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { getShoppingCart } = useCartStore();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast.error("Failed to create payment intent.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error initializing payment intent.");
      });
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
      return;
    }

    let paymentIntentid;

    //step 1 confirm payment
    try {
      const { paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret!,
        confirmParams: {
          return_url: "http://localhost:3000/success", // Required, but won't be used immediately
        },
        redirect: "if_required", // Prevents auto-redirect
      });

      if (paymentIntent && paymentIntent.status === "succeeded") {
        paymentIntentid = paymentIntent.id;
      }
    } catch {
      setLoading(false);
      toast.error("Error confirming payment");
      //stop everything, and do not continue
      return;
    }

    /******* step 2
     * save guest and order or save order with the user ,
     * include the payment_intent, guest name, email, amount, and items
     */

    try {
      // create the guest or find existing guest

      const response = await fetch("/api/complete-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_id: paymentIntentid,
          amount,
          items: getShoppingCart().map((item) => ({
            id: item.id,
            image_url: item.image_url,
            name: item.name,
            price: item.price,
            description: item.description,
            quantity: item.quantity,
          })),
          userId: user ? user.id : null,
        }),
      });
      const { success, data, error } = await response.json();

      if (success) {
        setLoading(false);
        router.replace(`/success?order_id=${data.order_id}`);
      }

      if (error || success === false) {
        // stop everything, and do not continue
        // also toast the error
        toast.error(error);
        setLoading(false);
        return;
      }
    } catch {
      setLoading(false);
      toast.error("Error saving order");
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return <LoadingPartial />;
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
        className="p-5 flex flex-row items-center gap-4 bg-cyan-100 verde text-5xl w-full mt-5 hover:cursor-pointer hover:bg-cyan-200 transition duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{loading ? "Processing..." : "Submit Order"}</span>
        {loading ? <LoadingSpinner /> : null}
      </button>
    </form>
  );
}
