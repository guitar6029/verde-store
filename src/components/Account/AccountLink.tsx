"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { createClient } from "@/utils/supabase/client";
import NavLinksItem from "../Nav/NavLinksItem";

/**
 * A navigation link for the user to access their account or sign out.
 * If the user is signed in, it shows a link to the account page and a sign out button.
 * If the user is not signed in, it shows a link to the login page.
 * @returns A JSX element representing the account link.
 */
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
          <NavLinksItem
            linkText="Account"
            linkUrl="/account"
            Icon={SquareUserRound}
          />

          <button
            onClick={handleSignOut}
            className="text-4xl group-hover:text-green-400 hover:cursor-pointer p-4 hover:bg-cyan-200 transition duration-300 ease-in text-nowrap"
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
