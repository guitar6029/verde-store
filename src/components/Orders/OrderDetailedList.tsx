"use client";

import { Product } from "@/types/Orders";
import Image from "next/image";
import { useEffect } from "react";
export default function OrderDetailedList({
  productsDetails,
}: {
  productsDetails: Product[];
}) {
  useEffect(() => {}, [productsDetails]); // Runs whenever `productsDetails` changes

  return (
    <>
      {productsDetails.map((item: Product) => (
        <div key={item.id ?? "NA"} className="flex flex-row gap-2">
          <Image
            src={item.image_url ?? ""}
            alt={item.name ?? "NA"}
            width={100}
            height={100}
            className="rounded-xl"
          />
          <span>{item.quantity ?? "NA"}</span>
          <span>${item.price_at_purchase ?? "NA"}</span>
          <span>{item.name ?? "NA"}</span>
        </div>
      ))}
    </>
  );
}
