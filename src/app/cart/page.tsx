"use client";

import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { useCartStore } from "@/store/cartStore";
import { Trash2 as Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Cart() {
  const { getTotalPrice, getShoppingCart, removeFromCart } = useCartStore();

  return (
    <div className="p-10 flex flex-col gap-10">
      <HeaderWithImgBg title="Cart" />
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">Total Price: ${getTotalPrice()}</h1>
        <Link href="/checkout" className="group hover:cursor-pointer">
          <button disabled={getShoppingCart().length === 0} className="disabled:opacity-50 disabled:hover:bg-red-300 disabled:hover:cursor-not-allowed  group-hover:cursor-pointer verde bg-green-100 p-5 rounded-full hover:bg-green-200 transition duration-300 ease-in text-5xl">
            Checkout
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        {getShoppingCart().map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-center gap-10 rounded-xl bg-cyan-50 p-10 hover:bg-cyan-100 transition duration-300 ease-in"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">{item.name}</h1>
              <span className="italic text-gray-400">{item.category}</span>
              <h1 className="text-2xl">${item.price}</h1>
            </div>

            <Image
              src={item.image_url}
              alt={item.name}
              width={150}
              height={150}
              className="object-contain rounded-xl"
            />
            <span className="text-5xl verde">x {item.quantity}</span>
            <div onClick={() => removeFromCart(item)} className="group hover:cursor-pointer flex flex-row items-center justify-center p-5 rounded-full bg-red-100 hover:bg-red-200 transition duration-300 ease-in group">
              <Trash className="w-5 h-5 group-hover:cursor-pointer group-hover:text-red-600 group-hover:scale-110" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
