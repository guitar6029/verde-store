"use client";
import { DetailedOrder, Order } from "@/types/Orders";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function OrdersList({
  orders,
  errors,
}: {
  orders: { order: Order; detailedOrder: DetailedOrder[] }[];
  errors: string | null;
}) {
  if (errors) {
    toast.error(errors ?? "Failed to get orders");
  }

  useEffect(() => {}, [orders]); // Runs whenever `orders` changes

  return (
    <div className="flex flex-col gap-2">
      {orders.map((orderObj) => (
        <div key={orderObj.order.id} className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-2xl font-bold">{orderObj.order.id}</h1>
            {/* <h1 className="text-2xl font-bold">{order.created_at.toLocaleString().split(",")[0]}</h1> */}
            <h1 className="text-2xl font-bold">
              ${orderObj.order.total_price}
            </h1>
          </div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-2xl font-bold">{orderObj.order.status}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
