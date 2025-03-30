import Link from "next/link";
import ClearCart from "@/components/Cart/ClearCart";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.order_id;

  return (
    <div className="min-h-screen p-10 flex flex-col gap-5">
      <ClearCart /> {/* Automatically clears the user's cart */}
      <h1 className="text-4xl">Thank you for your order!</h1>
      <span className="text-2xl">Order ID: {orderId}</span>
      <Link href={"/"} className="text-2xl mt-2">
        Back to Home
      </Link>
    </div>
  );
}
