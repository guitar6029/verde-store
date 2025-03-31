"use client";

import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { useCartStore } from "@/store/cartStore";
import { Trash2 as Trash, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAccountStore } from "@/store/accountStore";
export default function Cart() {
  //get user from store
  const { user } = useAccountStore();

  const {
    getTotalPrice,
    getShoppingCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  if (getShoppingCart().length === 0) {
    return (
      <div className="p-10 flex flex-col gap-10 min-h-screen">
        <HeaderWithImgBg title="Cart" />
        <div className="flex flex-col items-center justify-center mx-auto my-auto">
          <h1 className="text-2xl font-bold">Your cart is empty.</h1>
          <span className="text-gray-400">Add some plants to your cart.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col gap-10 min-h-screen">
      <HeaderWithImgBg title="Cart" />

      {getShoppingCart().length > 0 && (
        <div className="flex flex-row items-center justify-end">
          <button
            onClick={() => clearCart()}
            className="flex flex-row items-center gap-2 cursor-pointer verde bg-red-100 p-5 rounded-full hover:bg-red-200 transition duration-300 ease-in text-5xl"
          >
            <Trash size={30} />
            <span>Clear All</span>
          </button>
        </div>
      )}
      <div className="flex flex-col gap-10 overflow-auto max-h-[50vh]">
        {getShoppingCart().map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-5 rounded-xl p-10 h-[500px]"
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
            <div className="w-fit flex flex-row items-center justify-center gap-3 bg-green-50 border-2 border-green-200 rounded-full p-5">
              <div className="flex flex-row items-center gap-3">
                <button
                  onClick={() => increaseQuantity(item)}
                  className="flex flex-row items-center justify-center p-5 rounded-full border-2 border-green-300 group hover:cursor-pointer bg-green-200 hover:bg-green-300"
                >
                  <Plus className="w-3 h-3 group-hover:cursor-pointer" />
                </button>
                <span className="text-2xl">{item.quantity}</span>
                <button
                  disabled={item.quantity === 1}
                  onClick={() => decreaseQuantity(item)}
                  className="flex flex-row items-center justify-center p-5 rounded-full border-2 disabled:opacity-50  border-green-300 group hover:cursor-pointer bg-green-200 hover:bg-green-300"
                >
                  <Minus className="w-3 h-3 group-hover:cursor-pointer" />
                </button>
              </div>
              <div
                onClick={() => removeFromCart(item)}
                className=" group hover:cursor-pointer p-5 flex flex-row items-center justify-center rounded-full bg-red-200 hover:bg-red-300 transition duration-300 ease-in group"
              >
                <Trash className="w-3 h-3 group-hover:cursor-pointer group-hover:text-black group-hover:scale-110" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-between p-10">
        <h1 className="text-2xl font-bold p-5">Total ${getTotalPrice()}</h1>
        {user ? (
          <Link href="/checkout" className="group hover:cursor-pointer">
            <button
              disabled={getShoppingCart().length === 0}
              className="disabled:opacity-50 disabled:hover:bg-red-300 disabled:hover:cursor-not-allowed  group-hover:cursor-pointer verde bg-green-100 p-5 rounded-full hover:bg-green-200 transition duration-300 ease-in text-5xl"
            >
              Checkout
            </button>
          </Link>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <Link href="/checkout" className="group hover:cursor-pointer">
              <button
                disabled={getShoppingCart().length === 0}
                className="disabled:opacity-50 disabled:hover:bg-red-300 disabled:hover:cursor-not-allowed  group-hover:cursor-pointer verde bg-green-100 p-5 rounded-full hover:bg-green-200 transition duration-300 ease-in text-5xl"
              >
                Checkout as Guest
              </button>
            </Link>
            <span className="text-2xl">Or</span>
            <Link href="/login" className="group hover:cursor-pointer">
              <button className="group-hover:cursor-pointer verde bg-green-100 p-5 rounded-full hover:bg-green-200 transition duration-300 ease-in text-5xl">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
