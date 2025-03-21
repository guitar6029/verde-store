// app/plants/page.tsx
import { getPlants } from "@/lib/db/plants";
import Card from "@/components/Card/Card";
import {toast} from "react-toastify";

export default async function Plants() {
  const { data: plants, error } = await getPlants();

  if (error) {
    console.log("error) : ", error);
    toast.error(error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return <div>Error fetching plants: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">Our Plants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants?.map((plant) => (
          <Card key={plant.id} {...plant} />
        ))}
      </div>
    </div>
  );
}
