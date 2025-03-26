"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState, useEffect } from "react";
import { useAccountStore } from "@/store/accountStore";
import { usePathname, useRouter } from "next/navigation";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const { user, fetchSession } = useAccountStore();
  const router = useRouter();

  useEffect(() => {
    // Call fetchSession on route changes
    fetchSession();
  }, [pathname, fetchSession]);


  // Handle redirection if user is not authenticated
  useEffect(() => {
    if (!user && pathname === "/account") {
      //go back to the previous page
      router.back();
    }
  }, [user, pathname, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
