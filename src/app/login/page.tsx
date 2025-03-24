"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Supabase client for session checking
import { login } from "./actions"; // Import your login/signup actions
import Link from "next/link";

export default function LoginPage() {
  const [session, setSession] = useState(null); // State to store session data
  const [loading, setLoading] = useState(true); // State to track loading state
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession(); // Get current session

      if (data.session) {
        setSession(data.session); // Set session state if logged in
        router.push("/"); // Redirect to home/dashboard if already logged in
      }

      setLoading(false); // Set loading to false after the check
    };

    checkUserSession();
  }, [router]);

  // If still loading, return nothing or a loading spinner
  if (loading) {
    return null; // You can also return a loading spinner here if desired
  }

  // If session exists, don't render the login form
  if (session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-2 w-2/4">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button
          formAction={login}
          className="text-3xl font-bold p-2 bg-cyan-100"
        >
          Log in
        </button>

        <hr />
        <div className="flex flex-row gap-2 items-center">
          <span>Don&apos;t have an account?</span>
          <Link href={"/register"}>Sign up</Link>
        </div>
      </form>
    </div>
  );
}
