import type { Metadata } from "next";
import "./globals.css";
import Sidenav from "@/components/Sidenav/Sidenav";
import { ToastContainer } from "react-toastify";
import ClientWrapper from "@/components/Wrapper/ClientWrapper";


export const metadata: Metadata = {
  title: {
    default: "Verde",
    template: "%s | Verde", // Dynamically formats titles on subpages
  },
  description: "Nature, Simplified.",
  keywords: ["nature", "sustainability", "eco-friendly"],
  openGraph: {
    title: "Verde",
    description: "Nature, Simplified.",
    // url: "https://verde.com",
    siteName: "Verde",
    // images: [
    //   {
    //     url: "https://verde.com/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Verde - Nature Simplified",
    //   },
    // ],
    type: "website",
  },
};



// export const metadata: Metadata = {
//   title: "Verde",
//   description: "Nature, Simplified.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-row">
        <ClientWrapper>
          <Sidenav />
        </ClientWrapper>
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
