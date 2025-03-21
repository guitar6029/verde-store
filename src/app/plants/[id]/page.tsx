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
  console.log("data :: ", plant);

  if (error) {
    console.error("Error fetching plant:", error);
    return <div>Error fetching plant: {error.message}</div>;
  }

  return (
    <div className="p-20 flex flex-col gap-[3rem]">
      <h1 className="text-4xl p-10 bg-cyan-50">{plant?.name}</h1>
      <p className="p-10 bg-red-50 w-fit text-2xl">{plant?.description}</p>
      <Image
        src={plant?.image_url}
        alt={plant?.name}
        width={500}
        height={500}
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
