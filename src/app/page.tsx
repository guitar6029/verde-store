import Image from "next/image";
import Link from "next/link";
const plantsImage =
  "https://zrjoqoqiqwdlhbqwvxwb.supabase.co/storage/v1/object/public/verde-product-images//plants-1.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src={plantsImage}
        alt="Plants"
        quality={100}
        width={1000}
        height={1000}
        className="object-contain  z-[1]"
      />

      <div className="flex flex-col items-center z-[2] absolute">
        <h1 className="text-7xl font-semibold">Verde</h1>
        <span className="text-2xl">Green your world with Verde</span>
        <Link href={"/shop"}>
        <span>Shop</span>
        </Link>
      </div>
    </div>
  );
}
