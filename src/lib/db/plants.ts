"use server";

import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

/**
 * Fetches all plants from the database.
 */
async function fetchPlants(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("products").select();

  if (error) {
    console.error("Error fetching plants:", error);
    return { success: false, data: null, error: error.message };
  }
  return { success: true, data, error: null };
}

// ✅ Create supabase outside, then call the cache
export const getPlants = async () => {
  const supabase = await createClient(); // ✅ Created before unstable_cache
  const cachedFetch = unstable_cache(
    () => fetchPlants(supabase),
    ["plantsCache"],
    {
      revalidate: 300,
    }
  );

  return cachedFetch(); // ✅ Call it separately
};

/**
 * Fetches a single plant by ID.
 */
async function fetchPlant(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

  return { data, error };
}

// ✅ Create supabase outside, then call the cache
export const getPlant = async (id: string) => {
  const supabase = await createClient();
  const cachedFetch = unstable_cache(
    () => fetchPlant(supabase, id),
    [`plantCache-${id}`],
    {
      revalidate: 300,
    }
  );

  return cachedFetch();
};

/**
 * Fetches random plants excluding a given ID.
 */
async function gfetchRandomPlants(
  supabase: SupabaseClient,
  idToIgnore: string,
  limit: number = 5
) {
  if (limit > 5) {
    limit = 5;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .not("id", "eq", idToIgnore)
    .limit(limit);

  if (data && data.length > 0) {
    const shuffledData = data.sort(() => Math.random() - 0.5);
    return { data: shuffledData.slice(0, 5), error };
  }

  return { data, error };
}

// ✅ Create supabase outside, then call the cache
export const getRandomPlants = async (
  idToIgnore: string,
  limit: number = 5
) => {
  const supabase = await createClient();
  const cachedFetch = unstable_cache(
    () => gfetchRandomPlants(supabase, idToIgnore, limit),
    [`randomPlantsCache-${idToIgnore}-${limit}`],
    { revalidate: 300 }
  );

  return cachedFetch();
};
