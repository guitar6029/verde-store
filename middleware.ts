import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client'; // Your supabase client

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  // Get user session data from Supabase
  const { data: { user } } = await supabase.auth.getUser(); // Directly fetch the user
  console.log('inside the middleware')
  // If the user is logged in and trying to access the /login page
  if (user && request.nextUrl.pathname === '/login') {
    // Redirect to the home page or dashboard if already logged in
    console.log('User is already logged in, redirecting to home');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is not logged in, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
