"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { createClient } from "@/utils/supabase/client";

export default function AccountLink() {
  const { user } = useUserContext(); // Access user from the context
  const router = useRouter();


  // Handle user sign out
  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/"); // Redirect to homepage or login page
    }
  };

  return (
    <div className="flex flex-row items-center gap-2 w-[100px] justify-center">
      {user ? (
        <div className="flex flex-col gap-20">
          <div className="flex flex-row items-center gap-2 w-[100px] justify-center group">
            <Link
              href={"/account"}
              className="flex flex-row gap-2 items-center group-hover:text-green-400 transition duration-300 ease-in"
            >
              <SquareUserRound size={30} />
              <span className="text-4xl hidden md:block">Account</span>
            </Link>
          </div>

          <button
            onClick={handleSignOut}
            className="text-4xl group-hover:text-green-400 transition duration-300 ease-in hover:cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          href={"/login"}
          className="hover:text-green-400 transition duration-300 ease-in text-4xl"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}