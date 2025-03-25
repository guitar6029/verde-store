"use client";

import { ShoppingCart, Sprout } from "lucide-react";
import Link from "next/link";
import AccountLink from "../Account/AccountLink";
import { Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const WINDOW_SIZE = 1024;
const tailwindClassNames = ["hidden", "absolute", "top-0", "left-0", "z-[9]"];
/**
 * A sidebar component that handles window resizing. If the window width is
 * less than or equal to the WINDOW_SIZE, the menu is hidden and an icon
 * appears in the top-left corner. When the icon is clicked, the menu is
 * shown with an animation. If the window width is greater than the WINDOW_SIZE,
 * the menu is shown by default.
 *
 * @returns A JSX element representing the sidebar component.
 */
export default function Sidenav() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const menu = useRef<HTMLDivElement>(null);
  const menuIcon = useRef<HTMLDivElement>(null);

  //add a listener for window resize
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // if the window width is less than or equal to the WINDOW_SIZE, hide the menu
    if (windowWidth <= WINDOW_SIZE) {
      for (let i = 0; i < tailwindClassNames.length; i++) {
        menu.current?.classList.add(tailwindClassNames[i]);
      }

      menuIcon.current?.classList.remove("hidden");
      menuIcon.current?.classList.add("flex");
    }

    // if the window width is greater than the WINDOW_SIZE, show the menu
    if (windowWidth > WINDOW_SIZE) {
      for (let i = 0; i < tailwindClassNames.length; i++) {
        menu.current?.classList.remove(tailwindClassNames[i]);
      }
      menuIcon.current?.classList.remove("flex");
      menuIcon.current?.classList.add("hidden");
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const handleMenu = () => {
    if (windowWidth <= WINDOW_SIZE) {
      // Check if the menu is hidden, and apply the correct animation
      if (menu.current?.classList.contains("hidden")) {
        menu.current?.classList.remove("hidden");
        menu.current?.classList.remove("animation-slide-to-left"); // Slide out to the left
        menu.current?.classList.add("animation-slide-from-left"); // Remove sliding in
      } else {
        // Remove conflicting animation classes
        menu.current?.classList.remove("animation-slide-from-left");
        menu.current?.classList.add("animation-slide-to-left"); // Add the "slide out" animation

        // Delay the "hidden" class addition until the animation completes
        setTimeout(() => {
          menu.current?.classList.add("hidden"); // Hide menu after animation finishes
        }, 500); // Match this duration to your CSS animation time (0.5s in this case)
      }
    }
  };

  return (
    <>
      <div
        ref={menuIcon}
        onClick={handleMenu}
        className="absolute top-10 left-10 z-[10] flex flex-row items-center justify-center p-5 rounded-full bg-green-100 hover:bg-green-200 transition duration-300 ease-in group hover:cursor-pointer"
      >
        <Menu size={30} />
      </div>
      <div
        ref={menu}
        className="bg-white flex min-h-screen border-r-2 border-gray-200 min-w-[300px] max-width-[400px] flex-col gap-10 items-center justify-center verde"
      >
        <div>
          <Link
            href={"/"}
            className="flex flex-row gap-2 items-center justify-center"
          >
            <h1 className="text-5xl font-semibold">Verde</h1>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-2 w-[100px] justify-center group">
          <Link
            href={"/plants"}
            className="flex flex-row gap-2 items-center group-hover:text-green-400 transition duration-300 ease-in"
          >
            <Sprout size={30} />
            <span className="text-4xl hidden md:block">Plants</span>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-2 w-[100px] justify-center group">
          <Link
            href={"/cart"}
            className="flex flex-row gap-2 items-center group-hover:text-green-400 transition duration-300 ease-in"
          >
            <ShoppingCart size={30} />
            <span className="text-4xl hidden md:block">Cart</span>
          </Link>
        </div>

        {/* For Account Related */}
        <AccountLink />
      </div>
    </>
  );
}
