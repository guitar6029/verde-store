// /lib/db/favorites.ts

"use server";

import { createClient } from "@/utils/supabase/server";

// Function to fetch the favorites for a given userId
export async function getFavorites(userId: string) {
  const supabase = await createClient(); // Initialize the Supabase client
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id") // Select only the product_id (to keep it simple)
    .eq("user_id", userId); // Filter by user_id

  // Error handling
  if (error) {
    console.error("Error fetching favorites:", error);
    return { data: [], error: error.message }; // Return empty data with error message
  }

  return { data, error: null }; // Return the favorites data, with no error
}

// Add favorite
export async function addFavorite(userId: string, productId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, product_id: productId }]);
  return { data, error };
}

// Remove favorite
export async function removeFavorite(userId: string, productId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  return { data, error };
}

export async function fetchUserAndFavorites() {
  const supabase = await createClient();
  const { data: userObject, error: userError } = await supabase.auth.getUser();
  if (userError || !userObject.user) {
    console.error("Error fetching user:", userError);
    return { favorites: [] };
  }

  const { data: favoritesData, error: favoritesError } = await getFavorites(
    userObject.user.id
  );

  return {
    user: userObject.user,
    favorites: favoritesError ? [] : favoritesData,
  };
}
