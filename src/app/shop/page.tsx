// app/plants/page.tsx
import { createClient } from '@/lib/serverActions';

export default async function Plants() {
  // Initialize the Supabase client for server-side fetching
  const supabase = await createClient();
  
  // Fetch the plants data from the Supabase table
  const { data: plants, error } = await supabase.from("products").select();
  console.log("data : ", plants);
  

  if (error) {
    console.log("error) : ", error);
    return <div>Error fetching plants: {error.message}</div>;
  }

  return (
    <div>
      <h1>Our Plants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants?.map((plant) => (
          <div key={plant.id} className="plant-card">
            <img src={plant.image_url} alt={plant.name} className="plant-image" />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
