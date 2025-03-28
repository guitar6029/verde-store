import Link from "next/link";
import ClearCart from "@/components/Cart/ClearCart";
import { handleSuccessPageLogic } from "@/lib/cookie/handleSuccessPageLogic"; // Import Server Action

export default async function GuestSuccessPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  const orderId = searchParams?.order_id;

  // Use the server action to handle cookie validation and deletion
  const { orderId: validatedOrderId } = await handleSuccessPageLogic(orderId);

  // Render the success page
  return (
    <div className="min-h-screen p-10 flex flex-col">
      <ClearCart /> {/* Automatically clears the user's cart */}
      <h1 className="text-4xl">Thank you for your order!</h1>
      <span>Order ID: {validatedOrderId}</span>
      <Link href={"/"} className="text-2xl">
        Back to Home
      </Link>
    </div>
  );
}
