"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Finds a user by their ID and returns their first name and last name.
 *
 * @param id The ID of the user to find.
 * @returns An object containing the user's first name and last name, or an error if the user is not found.
 */
export async function getUser(id: string) {
  const supabase = await createClient();
  //find the user with the given id
  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name")
    .eq("id", id)
    .single();

  return { data, error };
}
