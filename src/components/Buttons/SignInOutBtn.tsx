"use client";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";

export default function SignInOutBtn({
  signedIn,
  handleClick,
}: {
  signedIn: boolean;
  handleClick?: () => void;
}) {
  const { getTheme } = useThemeStore();

  return (
    <>
      {signedIn ? (
        <button
          onClick={handleClick}
          className={`text-4xl ${
            getTheme()
              ? "bg-[var(--dark-primary)] hover:bg-[var(--dark-secondary)]"
              : "hover:bg-green-300 group-hover:text-green-300"
          }  hover:cursor-pointer p-4  transition duration-300 ease-in text-nowrap`}
        >
          Sign Out
        </button>
      ) : (
        <Link
          href="/login"
          className={` ${
            getTheme() ? "bg-[var(--dark-primary)] " : "hover:text-green-400"
          } transition duration-300 ease-in text-4xl`}
        >
          Sign In
        </Link>
      )}
    </>
  );
}
