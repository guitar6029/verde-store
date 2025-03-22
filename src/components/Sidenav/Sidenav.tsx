import { ShoppingCart, Sprout } from "lucide-react";
import Link from "next/link";
import AccountLink from "../Account/AccountLink";

export default function Sidenav() {
  return (
    <div className="min-h-screen border-r-2 border-gray-200 w-[300px] flex flex-col gap-10 items-center justify-center verde">
      <div>
        <Link
          href={"/"}
          className="flex flex-row gap-2 items-center justify-center"
        >
          <h1 className="text-5xl font-semibold">Verde</h1>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-2 w-[100px] justify-center group">
        <Link
          href={"/plants"}
          className="flex flex-row gap-2 items-center group-hover:text-green-400 transition duration-300 ease-in"
        >
          <Sprout className="w-5 h-5" />
          <span className="text-4xl hidden md:block">Plants</span>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-2 w-[100px] justify-center group">
        <Link
          href={"/cart"}
          className="flex flex-row gap-2 items-center group-hover:text-green-400 transition duration-300 ease-in"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-4xl hidden md:block">Cart</span>
        </Link>
      </div>

      {/* For Account Related */}
      <AccountLink />
    </div>
  );
}
