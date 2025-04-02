import MainLinkBtn from "@/components/Buttons/MainLinkBtn";
import Image from "next/image";
const plantsImage =
  "https://zrjoqoqiqwdlhbqwvxwb.supabase.co/storage/v1/object/public/verde-product-images//plants-1.jpg";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="absolute bg-green-500 p-10 w-[50vw] h-[50vh] top-0 left-0 hover:bg-green-600 transition duration-300 ease-in z-[-1] greeny-gradient-1"></div>
      <div className="absolute bg-green-100 p-10 w-[50vw] h-[50vh] top-0 right-0 hover:bg-green-200 transition duration-300 ease-in z-[-1] greeny-gradient-3"></div>
      <div className="absolute bg-green-800 p-10 w-[50vw] h-[50vh] bottom-0 left-0 hover:bg-green-900 transition duration-300 ease-in z-[-1] greeny-gradient-2"></div>
      <div className="absolute bg-green-400 p-10 w-[50vw] h-[50vh] bottom-0 right-0 hover:bg-green-500 transition duration-300 ease-in z-[-1]"></div>
      <div className="bg-green-200 p-10 hover:bg-green-300 transition duration-300 ease-in">
        <Image
          src={plantsImage}
          alt="Plants"
          quality={100}
          width={1200}
          height={1200}
          className="object-contain z-[1]"
        />
      </div>

      <div className="flex flex-col gap-5 items-center z-[2] absolute bg-cyan-100 p-10 opacity-80 ">
        <h1 className="text-7xl md:text-[10rem] verde">Verde</h1>
        <span className="text-5xl verde">Nature, Simplified.</span>
        <MainLinkBtn pathUrl="/plants" linkText="Shop" />
      </div>
    </div>
  );
}
