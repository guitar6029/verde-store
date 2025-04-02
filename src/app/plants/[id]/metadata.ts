import { getPlant } from "@/lib/db/plants";
import type { Metadata } from "next";

export async function generatePlantMetadata(id: string): Promise<Metadata> {
  const { data: plant } = await getPlant(id);

  return {
    title: plant ? `${plant.name}` : "Plant Not Found",
    description: plant ? `Learn more about ${plant.name} on Verde.` : "This plant could not be found.",
  };
}
