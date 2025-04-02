"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { toast } from "react-toastify";
import { login } from "./actions";
import { Session } from "@/types/Session";
import { LoginSchema } from "@/schemas/Login/schema";
import LoadingSpinner from "@/components/Icons/Loading";

export default function LoginPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
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
    setLoginLoading(true);

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
        setLoginLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoginLoading(false);
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
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
        />

        <label htmlFor="password" className="text-2xl font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
        />
        <button
          type="submit"
          disabled={loginLoading}
          className="text-5xl verde p-5 bg-green-200 hover:cursor-pointer hover:bg-green-300 transition duration-300 ease-in"
        >
          {loginLoading ? (
            <div className="flex flex-row gap-4 items-center justify-center">
              <LoadingSpinner />
              <span>Processing...</span>
            </div>
          ) : (
            "Log in"
          )}
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
