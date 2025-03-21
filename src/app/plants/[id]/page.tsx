import { getPlant } from "@/lib/db/plants";
import type { Plant } from "@/types/CardProps";
import Image from "next/image";
import { ShoppingBasket, Heart } from "lucide-react";
export default async function Plant({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const { data: plant, error } = await getPlant(Number(resolvedParams.id));

  if (error) {
    return <div>Error fetching plant: {error.message}</div>;
  }

  return (
    <div className="relative p-20 flex flex-col gap-[3rem] overflow-x-hidden">
      <div className="absolute bottom-0 -right-30 bg-cyan-50 w-200 h-200 z-[-1]"></div>
      <div className="relative w-full h-50">
        {/* Background with opacity */}
        <div
          className="absolute inset-0" // Ensures the background spans the parent
          style={{
            backgroundImage: `url("https://zrjoqoqiqwdlhbqwvxwb.supabase.co/storage/v1/object/public/verde-product-images//backdrop-green.webp")`,
            backgroundSize: "cover", // Ensures the image fits parent dimensions
            backgroundPosition: "center", // Centers the image within the parent
            backgroundRepeat: "no-repeat", // Prevents tiling of the image
            opacity: "0.3",
            borderRadius: "10px",
            zIndex: 2, // Z-index for background
          }}
        ></div>

        {/* Plant Name */}
        <h1 className="absolute inset-0 flex items-center  text-[7.5rem] p-10  verde z-[3]">
          {plant?.name}
        </h1>
      </div>

      <div className="p-10 bg-red-50 w-fit text-2xl flex flex-col gap-4">
        <h1 className="italic">Category | {plant?.category}</h1>
        <p>{plant?.description}</p>
      </div>
      <Image
        src={plant?.image_url}
        alt={plant?.name}
        width={500}
        height={500}
        className="shadow-xl rounded-xl shadow-neutral-200 hover:shadow-neutral-400 transition duration-300 ease-in hover:bg-neutral-100"
      />
      <p className="font-bold text-2xl">${plant?.price}</p>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-row items-center justify-center p-5 rounded-full bg-green-100 hover:bg-green-200 transition duration-300 ease-in group">
          <ShoppingBasket className="w-5 h-5 group-hover:text-green-600 group-hover:scale-110" />
        </div>
        <div className="flex flex-row items-center justify-center p-5 rounded-full bg-red-100 hover:bg-red-200 transition duration-300 ease-in group">
          <Heart className="w-5 h-5 group-hover:text-red-600 group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
