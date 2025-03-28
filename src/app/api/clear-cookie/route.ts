import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the cookie by setting its expiration to the past
  response.cookies.set("success_page_visited", "", {
    path: "/",
    expires: new Date(0), // Expired immediately
  });

  return response;
}