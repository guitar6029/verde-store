"use server";

import { RegisterSchema } from "@/schemas/Register/schema";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const fromEntries = Object.fromEntries(formData);
  const parseResult = RegisterSchema.safeParse(fromEntries);

  if (!parseResult.success) {
    console.error(parseResult.error);
    return { success: false, data: null, error: "Invalid form data" };
  }

  const data = parseResult.data;
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { success: false, data: null, error: error.message };
  }

  return { success: true, data: null, error: null };
}
