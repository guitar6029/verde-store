import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client'; // Your supabase client
import {Session} from '@supabase/supabase-js'
interface SessionData {
  user?: unknown; // Replace 'any' with the actual type of the user object
  session: Session;
}

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  // Check if the user is already logged in
  const { data }: { data: SessionData } = await supabase.auth.getSession() as { data: SessionData };

  // If the user is logged in and trying to access the /login page
  if (data.user && request.nextUrl.pathname === '/login') {
    // Redirect to the home page or dashboard if already logged in
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not logged in, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};