"use server";

import { createClient } from "@/lib/serverActions";

/**
 * Fetches all plants from the database.
 *
 * @returns {data: Plant[], error: { message: string, status: number}}
 */

export async function getPlants() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select();
  return { data, error };
}

/**
 * Fetches a single plant from the database, given its id.
 *
 * @param id The id of the plant to fetch.
 * @returns An object containing the plant data and an optional error.
 */
export async function getPlant(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

  return { data, error };
}
