import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; 

export async function middleware(request: NextRequest) {
  const supabase = await createClient();

  try {
    // Get user session data from Supabase
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      return NextResponse.next(); // Proceed with the request if there's an error in fetching user
    }

    // If the user is logged in and trying to access the login page, redirect to home page
    if (user && request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If the user is not logged in and trying to access the /account page, redirect to login page
    if (!user && request.nextUrl.pathname === "/account") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

  } catch (err) {
    console.error("Unexpected error in middleware:", err);
    return NextResponse.next(); // Proceed with the request on unexpected errors
  }

  // If no conditions are met, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
