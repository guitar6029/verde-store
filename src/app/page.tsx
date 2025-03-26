import Image from "next/image";
import Link from "next/link";
const plantsImage =
  "https://zrjoqoqiqwdlhbqwvxwb.supabase.co/storage/v1/object/public/verde-product-images//plants-1.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-green-200 p-10 hover:bg-green-300 transition duration-300 ease-in">
        <Image
          src={plantsImage}
          alt="Plants"
          quality={100}
          width={1000}
          height={1000}
          className="object-contain  z-[1]"
        />
      </div>

      <div className="flex flex-col gap-5 items-center z-[2] absolute bg-cyan-100 p-10 opacity-80 ">
        <h1 className="text-7xl verde">Verde</h1>
        <span className="text-2xl">Green your world with Verde</span>
        <Link href={"/plants"} className="hover:cursor-pointer">
          <span className="text-2xl hover:cursor-pointer hover:underline transition duration-300 ease-in">
            Shop
          </span>
        </Link>
      </div>
    </div>
  );
}
