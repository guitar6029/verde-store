import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoBackBtn({ gobackPath }: { gobackPath: string }) {
  return (
    <Link
      href={gobackPath}
      className="flex flex-row items-center gap-2 hover:text-green-400 transition duration-300 ease-in"
    >
      <ArrowLeft size={30} />
      <span className="text-2xl">Go Back</span>
    </Link>
  );
}
