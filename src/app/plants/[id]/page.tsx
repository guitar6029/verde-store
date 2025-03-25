import { getPlant, getRandomPlants } from "@/lib/db/plants";
import type { Plant } from "@/types/CardProps";
import Image from "next/image";
import MiniCard from "@/components/Card/MiniCard";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import ShoppingCartWrapper from "@/components/Wrapper/ShoppingCartWrapper";
export default async function Plant({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const { data: plant, error } = await getPlant(Number(resolvedParams.id));

  //for the you may also like ection
  const { data: plants, error: randomPlantsError } = await getRandomPlants(
    Number(resolvedParams.id)
  );

  if (error) {
    return <div>Error fetching plant: {error.message}</div>;
  }

  return (
    <div className="relative p-20 flex flex-col gap-[3rem] overflow-x-hidden">
      <div className="absolute bottom-0 -right-30 bg-cyan-50 w-200 h-200 z-[-1]"></div>
      <HeaderWithImgBg title={plant?.name} />

      <div className="p-10 bg-red-50 w-fit text-2xl flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <h1 className="italic text-gray-400">Category /</h1>
          <h1>{plant?.category}</h1>
        </div>

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
        <ShoppingCartWrapper item={plant} />
      </div>

      {/* You might like section */}
      <div className="flex flex-col gap-4 p-10">
        <h1 className="text-2xl font-semibold">You may also like</h1>
        {randomPlantsError && (
          <div>Error fetching random plants: {randomPlantsError.message}</div>
        )}
        {plants && (
          <div className="flex flex-row items-center overflow-x-auto gap-4">
            {plants.map((plant: Plant) => {
              return <MiniCard key={plant.id} {...plant} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
