import type { Metadata } from "next";
import "./globals.css";
import Sidenav from "@/components/Sidenav/Sidenav";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Verde",
  description: "Plants and things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-row">
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
      </body>
    </html>
  );
}
