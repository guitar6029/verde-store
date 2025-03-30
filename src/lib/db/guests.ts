"server only";

import { createClient } from "@/utils/supabase/server";

/**
 * Finds a guest by their email address.
 *
 * @param {string} guestEmail The email address of the guest to find.
 * @returns {Promise<{success: boolean, data: {id: number}, error: string}>} An object containing the guest data, or an error if the guest is not found.
 */
export async function findGuest(guestEmail: string) {
  const supabase = await createClient();
  try {
    const { data: guestData } = await supabase
      .from("guests")
      .select("id")
      .eq("email", guestEmail)
      .single();
    if (guestData) {
      return { success: true, data: guestData, error: null };
    }
    return { success: false, data: null, error: "Guest not found" };
  } catch (error) {
    console.error(error);
    return { success: false, data: null, error: "Internal server error" };
  }
}

export async function createGuest(guestEmail: string, name: string) {
  const supabase = await createClient();

  guestEmail = guestEmail.trim();
  // Validate inputs
  if (!guestEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
    return { success: false, data: null, error: "Invalid email format" };
  }

  if (!name) {
    return { success: false, data: null, error: "Name cannot be empty" };
  }

  try {
    const { data, error } = await supabase
      .from("guests")
      .insert({
        email: guestEmail,
        name: name,
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error creating guest:", error);
      return {
        success: false,
        data: null,
        error: "Failed to insert guest into database",
      };
    }

    return { success: true, data, error: null };
  } catch (err) {
    console.error("Unexpected error in createGuest:", err);
    return { success: false, data: null, error: "Internal server error" };
  }
}
