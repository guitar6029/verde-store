// /src/app/api/handle-cookie/route.ts

import { cookies } from "next/headers";

// Handling GET request
export async function GET() {
  const cookieStore = await cookies();
  const hasVisited = cookieStore.get("success_page_visited")?.value;

  return new Response(JSON.stringify({ visited: hasVisited }), {
    status: 200,
  });
}

// Handling POST request
export async function POST() {
  const cookie = await cookies();
  cookie.set("success_page_visited", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 5, // 5 minutes
  });

  return new Response("Cookie set successfully", { status: 200 });
}
