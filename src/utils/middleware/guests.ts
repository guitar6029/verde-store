import { NextRequest } from "next/server";
import { createClient } from "../supabase/server";

export async function allowGuestAccess(request: NextRequest): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const guestPaths = ["/checkout", "/cart", "/register", "/plants"];

  // Guests are allowed access to specific paths, including dynamic /plants/[id] paths
  if (!user) {
    const path = request.nextUrl.pathname;

    // Check if the path is explicitly listed or starts with "/plants/"
    return guestPaths.includes(path) || path.startsWith("/plants/");
  }

  // If a user is logged in, return false (they are not restricted)
  return false;
}