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

export default function GuestCheckoutSection({ amount }: { amount: number }) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
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

    if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      setLoading(false);
      return;
    }

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
          return_url: "http://localhost:3000/guest-success", // Required, but won't be used immediately
        },
        redirect: "if_required", // Prevents auto-redirect
      });

      if (paymentIntent && paymentIntent.status === "succeeded") {
        paymentIntentid = paymentIntent.id;
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error confirming payment");
      //stop everything, and do not continue
      return;
    }

    /******* step 2
     * save guest and order ,
     * include the payment_intent, guest name, email, amount, and items
     */

    try {
      // create the guest or find existing guest

      const response = await fetch("/api/save-guest-and-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_id: paymentIntentid,
          name: name,
          guestEmail,
          amount,
          items: getShoppingCart().map((item) => ({
            id: item.id,
            image_url: item.image_url,
            name: item.name,
            price: item.price,
            description: item.description,
            quantity: item.quantity,
          })),
        }),
      });
      const { success, data, error } = await response.json();

      if (success) {
        setLoading(false);

        // Call the API to handle the cookie
        try {
          const response = await fetch("/api/handle-cookie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to handle cookie");
          }

          console.log("Cookie handled successfully");
          // Redirect to the success page with the order ID
          router.push(`/success?order_id=${data.order_id}`);
        } catch (error) {
          console.error("Error handling cookie:", error);
        }
      }

      if (error || success === false) {
        // stop everything, and do not continue
        // also toast the error
        toast.error(error);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error saving guest and order");
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
      <div className="flex flex-col gap-5 mb-[3rem]">
        <label htmlFor="guest-name">Name</label>
        <input
          type="text"
          name="guest-name"
          id="guest-name"
          placeholder="Guest Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-blue-500 rounded-lg p-5 border-2  focus:outline-none focus:border-blue-500 w-[25rem]"
        />
        <label htmlFor="guest-email">Email</label>
        <input
          type="email"
          name="guest-email"
          id="guest-email"
          placeholder="Guest Email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          className="border-blue-500 rounded-lg p-5 border-2  focus:outline-none focus:border-blue-500 w-[25rem]"
        />
      </div>
      {clientSecret && <PaymentElement />}
      <button
        type="submit"
        disabled={!stripe || loading || guestEmail === "" || name === ""}
        className="p-5 flex flex-row items-center gap-2 bg-cyan-100 verde text-5xl w-full mt-5 hover:cursor-pointer hover:bg-cyan-200 transition duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{loading ? "Processing..." : "Make Payment as Guest"}</span>
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
