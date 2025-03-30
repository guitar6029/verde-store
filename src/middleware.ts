// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if guest is trying to go to /cart , let them in
  if (request.nextUrl.pathname === "/cart" && !user) {
    return NextResponse.next();
  }

  //if guest is trying to go to /register , let them in
  if (request.nextUrl.pathname === "/register" && !user) {
    return NextResponse.next();
  }

  // if guest is trying to go to /plants , let them in
  if (request.nextUrl.pathname === "/plants" && !user) {
    return NextResponse.next();
  }

  // if guest trying to go to account page, redirect them back to homepage
  if (request.nextUrl.pathname === "/account" && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return await updateSession(request);
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)", // Current pattern
    "/account", // Explicitly match /account
  ],
};
