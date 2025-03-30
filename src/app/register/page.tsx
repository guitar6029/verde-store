"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Make sure to create the supabase client instance
import { signup } from "./actions"; // Import your login/signup actions
import Link from "next/link";
import { RegisterSchema } from "@/schemas/Register/schema";
import { toast } from "react-toastify";

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

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries = Object.fromEntries(formData.entries());

    //validate form data using zod
    const parseResult = RegisterSchema.safeParse(formEntries);
    if (!parseResult.success) {
      parseResult.error.errors.forEach((err) => toast.error(err.message));
      return;
    }

    try {
      const { success, error: registerError } = await signup(formData); // Pass FormData to the login action
      if (success) {
        toast.success("Registration successful! Please check your email.");
        router.push("/register/confirm");
      } else {
        toast.error(registerError);
      }
    } catch (error) {
      console.error(error);
      toast.error("Please try again, something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleRegister} className="flex flex-col gap-5 w-2/4">
        <label htmlFor="firstName" className="text-2xl font-semibold">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          minLength={1}
          maxLength={50}
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
        />

        <label htmlFor="lastName" className="text-2xl font-semibold">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          minLength={1}
          maxLength={50}
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
        />
        <label htmlFor="email" className="text-2xl font-semibold">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={50}
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
        />

        <label htmlFor="password" className="text-2xl font-semibold">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          required
          className="text-2xl font-semibold rounded-lg p-5 border-2 border-gray-300"
        />
        <button
          type="submit"
          className="text-4xl p-5 bg-green-200 verde hover:cursor-pointer hover:bg-green-300 transition duration-300 ease-in"
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
