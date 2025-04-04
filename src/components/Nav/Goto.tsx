import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GotoBtn({
  gotoPath,
  text,
}: {
  gotoPath: string;
  text: string;
}) {
  return (
    <Link
      href={gotoPath}
      className="flex flex-row items-center gap-2 hover:text-green-400 transition duration-300 ease-in"
    >
      <span className="text-5xl verde">{text}</span>
      <ArrowRight size={30} />
    </Link>
  );
}
