"use client";
import { DetailedOrder, Order } from "@/types/Orders";
import { useEffect } from "react";
import { toast } from "react-toastify";
import OrderTracker from "@/components/Orders/OrderTracker";
import { format } from "date-fns";
import Link from "next/link";

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
    <div className="flex flex-col">
      {orders.map((orderObj) => (
        <div
          key={orderObj.order.id}
          className="grid grid-cols-4 gap-[5rem] shadow-xl shadow-neutral-200 hover:shadow-neutral-400 transition duration-300 ease-in p-10"
        >
          <div className="col-span-4 flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
              <h1 className="text-2xl text-gray-400">ORDER # </h1>
              <span className="font-bold text-2xl">{orderObj.order.id}</span>
            </div>
            <div className="flex flex-row gap-2">
              <Link
                href={`/orders/${orderObj.order.id}`}
                className="p-4 w-full lg:w-fit rounded-xl bg-green-200 hover:bg-green-300 flex flex-row items-center justify-center transition duration-300 ease-in text-blue-600  hover:underline"
              >
                <span className="text-2xl">View order details</span>
              </Link>
              <Link
                href={`/invoices/${orderObj.order.id}`}
                className="p-4 w-full lg:w-fit rounded-xl bg-cyan-200 hover:bg-cyan-300 flex flex-row items-center justify-center transition duration-300 ease-in text-blue-600  hover:underline"
              >
                <span className="text-2xl">View invoice details</span>
              </Link>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-2">
            <div className="flex flex-row gap-10">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-gray-400">ORDER PLACED</h1>
                <span className="text-2xl">
                  {format(orderObj.order.created_at, "MM/dd/yyyy")}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-gray-400">TOTAL</h1>
                <span className="text-2xl ">
                  ${orderObj.order.total_price}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-5 xl:gap-2">
            <OrderTracker currentStatus={orderObj.order.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
