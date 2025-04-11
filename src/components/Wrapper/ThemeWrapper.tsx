"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { ThemeProvider } from "next-themes";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const theme = useThemeStore((state) => state.toggleTheme); // true = dark
  //   const toggleTheme = useThemeStore((state) => state.toggle); // Function to toggle the theme

  //   useEffect(() => {
  //     const html = document.documentElement;

  //     // Toggle the theme class when the theme changes
  //     if (theme) {
  //       html.classList.add("dark");
  //     } else {
  //       html.classList.remove("dark");
  //     }

  //     // Optionally store the theme in localStorage
  //     localStorage.setItem("theme", theme ? "dark" : "light");

  //   }, [theme]); // Re-run effect when theme state changes

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </>
  );
}
