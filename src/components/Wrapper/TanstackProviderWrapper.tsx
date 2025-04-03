"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState, useEffect } from "react";
import { useAccountStore } from "@/store/accountStore";
import { usePathname } from "next/navigation";
interface ClientWrapperProps {
  children: ReactNode;
}

export default function TanstackProviderWrapper({
  children,
}: ClientWrapperProps) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const { fetchSession } = useAccountStore();

  useEffect(() => {
    // Call fetchSession on route changes
    fetchSession();
  }, [pathname, fetchSession]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
