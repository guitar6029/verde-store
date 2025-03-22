"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Type-casting for convenience
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Sign up the user
  const { data: userData, error: signupError } = await supabase.auth.signUp(
    data
  );

  if (signupError) {
    return redirect("/error");
  }

  // Once the user is signed up, you should have the user data in userData
  if (userData?.user) {
    // Insert the new user into the "users" table
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userData.user.id, // Use the user ID from Supabase Auth
        email: userData.user.email, // Add other user-specific fields if needed
        created_at: new Date().toISOString(),
        // Add other fields as necessary
      },
    ]);

    if (insertError) {
      return redirect("/login/error");
    }
  }

  // Revalidate path and redirect to home
  revalidatePath("/", "layout");
  return redirect("/");
}
