import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow guests to access these paths
  if (request.nextUrl.pathname === "/cart" && !user) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/register" && !user) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/plants" && !user) {
    return NextResponse.next();
  }

  // Redirect guests from account page to the homepage
  if (request.nextUrl.pathname === "/account" && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const visited = request.cookies.get("visited")?.value;

  if (request.nextUrl.pathname === "/success") {
    if (!visited || visited === "false") {
      // Allow access and mark it as visited
      const response = NextResponse.next();
      response.cookies.set("visited", "true", { path: "/", httpOnly: true });
      return response;
    }

    //if already visited, redirect to homepage
    // If already visited, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default session handling
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)", // Current pattern
    "/account", // Explicitly match /account
    "/success", // Ensure middleware applies to /success
  ],
};
