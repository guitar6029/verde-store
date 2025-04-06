import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect guests from account page to the homepage
  if (request.nextUrl.pathname === "/account" && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //allow guest to register
  if (request.nextUrl.pathname === "/register") {
    return NextResponse.next();
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)",
    "/account", // Explicitly match /account
    "/success", // Ensure middleware applies to /success
  ],
};
