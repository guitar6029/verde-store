"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function AccountLink() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user session on component mount and listen to auth state changes
  useEffect(() => {
    const supabase = createClient();

    // Fetch the current user
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("User object:", data?.user);
        setUser(data?.user); // Set user state
      }
      setLoading(false); // Update loading state to false
    };

    fetchUser(); // Initial fetch of the user

    // Listen for authentication state changes (sign-in/sign-out)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user); // Update user state on sign-in
        } else {
          setUser(null); // Clear user state on sign-out
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // This effect runs once when the component mounts

  // Handle user sign out
  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    } else {
      setUser(null); // Clear the user from state
      router.push("/"); // Optionally redirect to the homepage or login page
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching user session
  }

  return (
    <div className="flex flex-row items-center gap-2 w-[100px] justify-center group">
      {user ? (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSignOut}
            className="text-4xl group-hover:text-green-400 transition duration-300 ease-in"
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