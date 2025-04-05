"use server";

import { FormSchema } from "@/schemas/Form/schema";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const fromEntries = Object.fromEntries(formData);
  const parseResult = FormSchema.safeParse(fromEntries);

  if (!parseResult.success) {
    console.error(parseResult.error);
    return { success: false, data: null, error: "Invalid form data" };
  }

  const data = parseResult.data;
  const { data: dataUser, error } = await supabase.auth.signUp(data);

  if (error) {
    return { success: false, data: null, error: error.message };
  }

  //now create
  if (dataUser?.user?.id) {
    await createUser(dataUser.user.id);
  }

  return { success: true, data: null, error: null };
}

export async function createUser(userId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("users").insert({ id: userId });
  if (error) {
    console.error("Error creating user:", error);
    // return { success: false, data: null, error: "Failed to create user" };
  }
  // return { success: true, data, error: null };
}
