import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// This function creates and returns the Supabase server client, which includes session management via cookies
export async function createClient() {
  const cookieStore = await cookies();

  // Log the Supabase connection for debugging
  console.log('Creating Supabase client...');
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();  // Get all cookies for session management
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)  // Set cookies for session management
            );
          } catch {
            // Handle error if setting cookies fails (useful for SSR)
          }
        },
      },
    }
  );

  // Log the actual client object to verify the connection
  console.log('Supabase client created');

  return supabase;
}
