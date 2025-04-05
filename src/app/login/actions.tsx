"use server";

import { createClient } from "@/utils/supabase/server";
import { FormSchema } from "@/schemas/Form/schema";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const formEntries = Object.fromEntries(formData);
  const parseResult = FormSchema.safeParse(formEntries);

  if (!parseResult.success) {
    console.error(parseResult.error);
    return { success: false, data: null, error: "Invalid form data" };
  }

  const { data } = parseResult;
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, data: null, error: error.message };
  }

  // if success
  return { success: true, data: null, error: null };
}
