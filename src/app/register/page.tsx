"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Make sure to create the supabase client instance
import { signup } from "./actions"; // Import your login/signup actions
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession(); // Get the current session

      if (data.session) {
        // If user is authenticated, redirect to home or dashboard
        router.push("/"); // Or you can redirect to a different page
      }
    };

    checkUserSession();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-2 w-2/4">
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" required />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" required />
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button
          formAction={signup}
          className="text-3xl font-bold p-2 bg-cyan-200"
        >
          Sign up
        </button>
        <hr />
        <div className="flex flex-row gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="text-3xl font-bold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
