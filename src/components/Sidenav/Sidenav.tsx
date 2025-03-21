import { CircleUser, ShoppingCart, Sprout } from "lucide-react";
import Link from "next/link";

export default function Sidenav() {
  return (
    <div className="min-h-screen border-r-2 border-gray-200 w-[300px] flex flex-col gap-10 items-center justify-center ">
      <div>
        <Link href={"/"} className="flex flex-row gap-2 items-center">
          <h1 className="text-7xl font-semibold">Verde</h1>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-2 w-[100px]">
        <Link href={"/shop"} className="flex flex-row gap-2 items-center">
          <Sprout className="w-10 h-10" />
          <span>Plants</span>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-2 w-[100px]">
        <Link href={"/cart"} className="flex flex-row gap-2 items-center">
          <ShoppingCart className="w-10 h-10" />
          <span>Cart</span>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-2 w-[100px]">
        <Link href={"/account"} className="flex flex-row gap-2 items-center">
          <CircleUser className="w-10 h-10" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
}
