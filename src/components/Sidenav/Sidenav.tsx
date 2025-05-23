"use client";

import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import NavLinks from "../Nav/NavigationLinks";
import Link from "next/link";
import MainIconBtn from "../Buttons/MainIconButton";
const WINDOW_SIZE = 1024;
const tailwindClassNames = ["hidden", "absolute", "top-0", "left-0", "z-[9]"];

/**
 * A responsive sidebar component that is visible on larger screens and
 * hidden on smaller screens. When the window width is less than or equal to
 * the WINDOW_SIZE, a menu icon appears on the top left corner of the screen.
 * When the menu icon is clicked, the sidebar slides out from the left.
 * When the window width is greater than the WINDOW_SIZE, the sidebar is always
 * visible and the menu icon is hidden.
 *
 * @returns A JSX element representing the sidebar component
 */
export default function Sidenav() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu state
  const menu = useRef<HTMLDivElement>(null);
  const menuIcon = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Add event listener for window resize and safely set windowWidth
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set windowWidth after the component has mounted
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Add event listener for a click outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen && // Trigger only if menu is open
        menu.current &&
        menuIcon.current?.classList.contains("flex") &&
        !menu.current.contains(event.target as Node)
      ) {
        handleMenu(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]); // Depend on isMenuOpen

  // Add a listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // If the window width is less than or equal to the WINDOW_SIZE, hide the menu
    if (windowWidth && windowWidth <= WINDOW_SIZE) {
      for (let i = 0; i < tailwindClassNames.length; i++) {
        menu.current?.classList.add(tailwindClassNames[i]);
      }

      menuIcon.current?.classList.remove("hidden");
      menuIcon.current?.classList.add("flex");
    }

    // If the window width is greater than the WINDOW_SIZE, show the menu
    if (windowWidth && windowWidth > WINDOW_SIZE) {
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

  const handleMenu = (clickedOutside: boolean = false) => {
    if (isAnimating && !clickedOutside) return; // Prevent multiple clicks

    if (windowWidth && windowWidth <= WINDOW_SIZE) {
      setIsAnimating(true);
      if (clickedOutside) {
        setIsAnimating(false);
        // Close the menu
        setIsMenuOpen(false); // Update state
        menu.current?.classList.remove("animation-slide-from-left");
        menu.current?.classList.add("animation-slide-to-left"); // Add the "slide out" animation

        // Delay the "hidden" class addition until the animation completes
        setTimeout(() => {
          menu.current?.classList.add("hidden"); // Hide menu after animation finishes
          setIsAnimating(false);
        }, 300); // Match this duration to your CSS animation time (0.5s in this case)
        return;
      }

      // Check if the menu is hidden, and apply the correct animation
      if (menu.current?.classList.contains("hidden")) {
        menu.current?.classList.remove("hidden");
        menu.current?.classList.remove("animation-slide-to-left"); // Slide out to the left
        menu.current?.classList.add("animation-slide-from-left"); // Remove sliding in
        setIsMenuOpen(true); // Update state
      } else {
        menu.current?.classList.remove("animation-slide-from-left"); // Remove sliding in
        menu.current?.classList.add("animation-slide-to-left"); // Add the "slide out" animation

        // Delay the "hidden" class addition until the animation completes
        setTimeout(() => {
          menu.current?.classList.add("hidden"); // Hide menu after animation finishes
          setIsAnimating(false);
        }, 300); // Match this duration to your CSS animation time (0.5s in this case)
        setIsMenuOpen(false); // Update state
      }
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  function getIconForMenu() {
    //first if the window size is larger than the WINDOW_SIZE, then return menu icon
    if (windowWidth && windowWidth > WINDOW_SIZE) {
      return Menu;
    } else {
      //if menu is opened , then retu X
      // if menu is closed , then return menu
      if (isMenuOpen) {
        return X;
      } else {
        return Menu;
      }
    }
  }

  return (
    <>
      <MainIconBtn
        refValue={menuIcon}
        size={30}
        Icon={getIconForMenu()}
        handleEvent={() => handleMenu()}
        className="absolute top-5 left-5 z-[10]"
      />

      <div
        ref={menu}
        className=" sidenav-gradient flex min-h-screen border-r-2 border-gray-200 min-w-[300px] max-width-[400px] flex-col gap-10 items-center justify-center verde"
      >
        <div>
          <Link
            href={"/"}
            className="flex flex-row gap-2 items-center justify-center bg-green-200 p-5 transition duration-300 ease-in hover:bg-green-300 hover:cursor-pointer"
          >
            <h1 className="text-5xl font-semibold p-5 bg-green-300">Verde</h1>
          </Link>
        </div>

        <NavLinks />
      </div>
    </>
  );
}
