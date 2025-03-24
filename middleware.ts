import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; 

export async function middleware(request: NextRequest) {
  
  const supabase = await createClient();

  //get user session data from supabase
  const { data: {user}, error} = await supabase.auth.getUser();

  //if there is an error, log it and proceed
  if (error) {
    console.error("Error fetching user:", error);
  }

  // if user is logged in and trying to acess login page, redirect to home page
  if (user && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  

  // If the user is not logged in, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
