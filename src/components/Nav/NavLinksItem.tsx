"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconProps } from "@/types/Icon";
export default function NavLinksItem({
  linkText,
  linkUrl,
  Icon,
}: {
  linkText: string;
  linkUrl: string;
  Icon?: React.ComponentType<IconProps>;
}) {


    const pathname = usePathname();

  return (
    <div className="flex flex-row items-center gap-2 w-[100px] justify-center group">
      <Link
        href={linkUrl}
        className={`dark:text-white flex flex-row gap-2 items-center group-hover:text-green-400 transition duration-300 ease-in ${pathname === linkUrl ? "text-green-400" : ""}`}
      >
        {Icon && <Icon size={30} />}

        <span className="text-4xl hidden md:block">{linkText}</span>
      </Link>
    </div>
  );
}
