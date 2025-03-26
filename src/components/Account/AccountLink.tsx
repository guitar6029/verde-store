import { useRouter } from "next/navigation";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";
import { useAccountStore } from "@/store/accountStore"; // Import Zustand store
import { createClient } from "@/utils/supabase/client";
import NavLinksItem from "../Nav/NavLinksItem";

export default function AccountLink() {
  const { user, logout } = useAccountStore(); // Access user and logout from Zustand store
  const router = useRouter();

  // Handle user sign out
  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      // Clear user state in the store after sign-out
      logout(); // This will set the user to null in the store

      router.push("/"); // Redirect to homepage or login page
    }
  };

  return (
    <div className="flex flex-row items-center gap-2 w-[100px] justify-center">
      {user ? (
        <div className="flex flex-col gap-5"> {/* Reduced gap from 20 to 5 for better spacing */}
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
          href="/login"
          className="hover:text-green-400 transition duration-300 ease-in text-4xl"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
