import Link from "next/link";

export default function MainLinkBtn({
  pathUrl,
  linkText,
}: {
  pathUrl: string;
  linkText: string;
}) {
  return (
    <Link
      href={pathUrl}
      className="hover:cursor-pointer rounded-xl p-5 w-full text-center bg-green-300 hover:bg-green-400 transition duration-300 ease-in"
    >
      <span className="text-2xl hover:cursor-pointer transition duration-300 ease-in">
        {linkText}
      </span>
    </Link>
  );
}
