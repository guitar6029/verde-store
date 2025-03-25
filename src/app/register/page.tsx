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
      <form className="flex flex-col gap-5 w-2/4">
        <label htmlFor="firstName" className="text-2xl font-semibold">First Name</label>
        <input id="firstName" name="firstName" type="text" required className="text-2xl font-semibold" />

        <label htmlFor="lastName" className="text-2xl font-semibold">Last Name</label>
        <input id="lastName" name="lastName" type="text" required  className="text-2xl font-semibold"/>
        <label htmlFor="email" className="text-2xl font-semibold">Email:</label>
        <input id="email" name="email" type="email" required  className="text-2xl font-semibold"/>

        <label htmlFor="password" className="text-2xl font-semibold">Password:</label>
        <input id="password" name="password" type="password" required  className="text-2xl font-semibold"/>
        <button
          formAction={signup}
          className="text-4xl p-5 bg-cyan-100 verde hover:cursor-pointer hover:bg-cyan-200 transition duration-300 ease-in"
        >
          Sign up
        </button>
        <hr />
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <span className="text-2xl">Already have an account?</span>
          <Link href="/login" className="text-2xl underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
