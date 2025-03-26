"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Supabase client for session checking
import { login } from "./actions"; // Import your login/signup actions
import Link from "next/link";
import type { UserType } from "@/types/User";

type Session = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: UserType | null;
};

export default function LoginPage() {
  const [session, setSession] = useState<Session | null>(null); // State to store session data
  const [loading, setLoading] = useState(true); // State to track loading state
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession(); // Get current session

      if (data.session) {
        setSession(data.session as Session); // Set session state if logged in
        router.push("/"); // Redirect to home/dashboard if already logged in
      }

      setLoading(false); // Set loading to false after the check
    };

    checkUserSession();
  }, [router]);

  //If still loading, return nothing or a loading spinner
  if (loading) {
    return null; // You can also return a loading spinner here if desired
  }

  // If session exists, don't render the login form
  if (session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-5 w-2/4">
        <label htmlFor="email" className="text-2xl font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="text-2xl border-2 border-neutral-300 p-5 rounded-xl"
        />

        <label htmlFor="password" className="text-2xl font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="text-2xl border-2 border-neutral-300 p-5 rounded-xl"
        />
        <button
          formAction={login}
          className="text-4xl p-5 bg-cyan-100 verde hover:cursor-pointer hover:bg-cyan-200 transition duration-300 ease-in"
        >
          Log in
        </button>

        <hr />
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <span className="text-2xl">Don&apos;t have an account?</span>
          <Link href={"/register"} className="text-2xl underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
