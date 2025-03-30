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

  const visited = request.cookies.get("visited"); // Fetch the cookie value

  // Restrict access to /success if the cookie value is "true"
  if (request.nextUrl.pathname === "/success" && visited?.value === "true") {
    console.log("visited is true"); // Debugging output
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to homepage
  }

  // Reset the cookie when accessing /success
  if (request.nextUrl.pathname === "/success") {
    const response = NextResponse.next(); // Create a response object
    response.cookies.set("visited", "null", { path: "/" }); // Reset the cookie
    return response;
  }


//   // **Handle /success page logic**
//   const visited = request.cookies.get("visited");
//   console.log("visited", visited);

//   // Reset the cookie when accessing /success
//   if (request.nextUrl.pathname === "/success") {
//     const response = NextResponse.next();
//     response.cookies.set("visited", "null", { path: "/" }); // Reset the cookie
//     return response;
//   }

//   // Restrict access to /success if visited is "true"
//   if (request.nextUrl.pathname === "/success" && visited?.value === "true") {
//     console.log("visited is true");
//     return NextResponse.redirect(new URL("/", request.url)); // Redirect to homepage
//   }

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