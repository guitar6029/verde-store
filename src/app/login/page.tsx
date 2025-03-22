"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Make sure to create the supabase client instance
import { login, signup } from './actions'; // Import your login/signup actions

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
      <form className="flex flex-col gap-2">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </div>
  );
}
