"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Fetches all plants from the database.
 *
 * @returns {data: Plant[], error: { message: string, status: number}}
 */

export async function getPlants() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select();
  
  if (error) {
    console.error("Error fetching plants:", error);
    return []
  }
  
  return data ?? [];
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


/**
 * Fetches a list of up to 5 random plants from the database, excluding the plant with the specified ID.
 *
 * @param idToIgnore The ID of the plant to exclude from the results.
 * @returns An object containing the shuffled plant data and an optional error.
 */

export async function getRandomPlants(idToIgnore: number, limit : number = 5) {
  const supabase = await createClient();
  
  if (limit > 5) {
    limit = 5
  }

  // Fetch 5 random products, excluding the one with the given ID
  const { data, error } = await supabase
    .from("products")
    .select("*") // Explicitly select all columns
    .not("id", "eq", idToIgnore) // Exclude the product with the given ID
    .limit(limit); // Limit results

  // Shuffle the results client-side for randomness
  if (data && data.length > 0) {
    const shuffledData = data.sort(() => Math.random() - 0.5); // Randomly shuffle the results
    return { data: shuffledData.slice(0, 5), error };
  }

  return { data, error };
}
