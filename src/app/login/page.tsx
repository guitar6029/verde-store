"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { toast } from "react-toastify";
import { login } from "./actions";
import { Session } from "@/types/Session";
import { LoginSchema } from "@/schemas/Login/schema";

export default function LoginPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setSession(data.session as Session);
        router.push("/");
      }
      setLoading(false);
    };

    checkUserSession();
  }, [router]);

  if (loading) {
    return null; // Optional loading spinner
  }

  if (session) {
    return null; // Prevent rendering the login form if already logged in
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());

    // Validate form data using Zod
    const parseResult = LoginSchema.safeParse(formEntries);

    if (!parseResult.success) {
      parseResult.error.errors.forEach((err) => toast.error(err.message));
      return;
    }

    try {
      const { success, error: loginError } = await login(formData); // Pass FormData to the login action
      if (success) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(loginError);
      }
    } catch (error) {
      console.error(error);
      toast.error("Please try again, something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="flex flex-col gap-5 w-2/4">
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
          type="submit"
          className="text-4xl p-5 bg-cyan-100 hover:cursor-pointer hover:bg-cyan-200 transition duration-300 ease-in"
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
