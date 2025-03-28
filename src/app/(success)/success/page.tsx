"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccountStore } from "@/store/accountStore";

export default function SuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { clearCart, getShoppingCart } = useCartStore();
  const { user } = useAccountStore();

  useEffect(() => {
    // Check if the URL has the expected parameters (like amount) to confirm success
    const queryParams = new URLSearchParams(window.location.search);
    const amount = queryParams.get("amount");
    const payment_intent = queryParams.get("payment_intent");

    if (amount) {

      if (payment_intent) {
        // If payment_intent is available, use it to confirm the payment
        fetch("/api/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
             payment_intent, 
             items: getShoppingCart().map((item) => ({
               id: item.id,
               image_url: item.image_url,
               name: item.name,
               price: item.price,
               description: item.description,
               quantity: item.quantity,
               category: item.category,
               user_id: user?.id,
               guest_id: user ? null : "guest",
               
              })),
              amount
            }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          }


      // Payment is successful, clear the cart
      clearCart();
      setIsLoading(false);
    } else {
      // If there's no amount, consider it an invalid state or failed payment
      router.push("/"); // Redirect to home or another appropriate page
    }
  }, [clearCart, router]);


  if (isLoading) {
    return (
      <div className="min-h-screen p-10 flex flex-col">
        <HeaderWithImgBg title="Success" />
        <div className="flex flex-col gap-2 justify-center items-center mx-auto my-auto">
          <h1 className="text-4xl">Loading...</h1>
        </div>
      </div>
    )
  }


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
