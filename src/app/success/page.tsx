import Link from "next/link";
import ClearCart from "@/components/Cart/ClearCart"; // Import ClearCart component
import { checkSuccessPageCookie, setSuccessPageCookie } from "@/utils/cookies"; // Import the cookie utility

export default async function GuestSuccessPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  const orderId = searchParams?.order_id;

  // First check if the cookie exists
  const hasVisited = await checkSuccessPageCookie();

  if (!hasVisited) {
    // If the user hasn't visited the success page before, set the cookie
    await setSuccessPageCookie();
  }

  // Render the success page
  return (
    <div className="min-h-screen p-10 flex flex-col">
      <ClearCart /> {/* Automatically clears the user's cart */}
      <h1 className="text-4xl">Thank you for your order!</h1>
      <span>Order ID: {orderId}</span>
      <Link href={"/"} className="text-2xl">
        Back to Home
      </Link>
    </div>
  );
}
