import { NextRequest } from "next/server";
import { createClient } from "../supabase/server";

export async function allowGuestAccess(request: NextRequest): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const guestPaths = ["/checkout", "/cart", "/register", "/plants"];

  // Guests are allowed access to these paths
  if (!user) {
    return guestPaths.includes(request.nextUrl.pathname);
  }

  // If a user is logged in, return false (they are not restricted)
  return false;
}
