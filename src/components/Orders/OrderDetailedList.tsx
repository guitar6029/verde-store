"use client";

import { Product } from "@/types/Orders";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
export default function OrderDetailedList({
  productsDetails,
}: {
  productsDetails: Product[];
}) {
  useEffect(() => {}, [productsDetails]); // Runs whenever `productsDetails` changes

  return (
    <>
      {productsDetails.map((item: Product) => (
        <div key={item.id ?? "NA"} className="flex flex-row gap-5 p-5">
          <Image
            src={item.image_url ?? ""}
            alt={item.name ?? "NA"}
            width={100}
            height={100}
            className="rounded-xl"
          />
          <div className="flex flex-col gap-4 w-full text-2xl">
            <Link href={`/plants/${item.id}`} className="cursor-pointer hover:underline"><span>{item.name ?? "NA"}</span></Link>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-2">
                <span>Qty: {item.quantity ?? "NA"}</span>
                <span>@ ${item.price_at_purchase.toFixed(2) ?? "NA"} each</span>
              </div>
              <span className="p-2 bg-gray-200 rounded-xl">
                ${(item.price_at_purchase * item.quantity).toFixed(2) ?? "NA"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
