import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { allowGuestAccess } from "./utils/middleware/guests";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  ///test purpsoe only
  if (
    request.nextUrl.pathname === "/api/create-payment-intent" ||
    request.nextUrl.pathname === "/api/complete-order"
  ) {
    return NextResponse.next(); // Continue without redirecting
  }

  if (await allowGuestAccess(request)) {
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)",
    "/account", // Explicitly match /account
    "/success", // Ensure middleware applies to /success
  ],
};
