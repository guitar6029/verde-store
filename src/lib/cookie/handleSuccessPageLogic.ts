"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Server action for handling cookies on the success page
export async function handleSuccessPageLogic(orderId?: string) {
  const cookieStore = await cookies();
  const hasVisited = cookieStore.get("success_page_visited")?.value;

  // If the cookie does not exist, restrict access
  if (!hasVisited) {
    redirect("/"); // Redirect to the homepage
  }

  // Immediately delete the cookie to prevent revisits
  cookieStore.set("success_page_visited", "", {
    path: "/",
    expires: new Date(0), // Expire the cookie
  });

  return { orderId }; // Return the orderId for further rendering
}