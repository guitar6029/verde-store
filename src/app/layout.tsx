import type { Metadata } from "next";
import "./globals.css";
import Sidenav from "@/components/Sidenav/Sidenav";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Verde",
  description: "Plants and things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className="antialiased flex flex-row">
        <QueryClientProvider client={queryClient}>
          <Sidenav />
          <main className="flex-grow">{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
