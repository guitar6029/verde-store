"use client";
import { debounce } from "es-toolkit";

import { useEffect, useState } from "react";
import { getPlants } from "@/lib/db/plants";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  fetchUserAndFavorites,
} from "@/lib/db/favorites";
import Card from "@/components/Card/Card";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { createClient } from "@/utils/supabase/client";
import { Plant } from "@/types/CardProps";
import { useCartStore } from "@/store/cartStore";

export default function Plants() {
  const [plants, setPlants] = useState<Array<Plant>>([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCartStore();

  useEffect(() => {
    async function fetchData() {
      const { data: plantsData, error } = await getPlants();
      if (error) {
        console.error("Error fetching plants:", error);
        return;
      }
      setPlants(plantsData);

      // Fetch user & favorites via server function
      const { user, favorites } = await fetchUserAndFavorites();

      console.log("userObject", user);

      if (!user) {
        setFavorites([]);
      }

      // If user is logged in, fetch their favorites
      const { data: favoritesData, error: favoritesError } = await getFavorites(
        user.id
      );
      if (favoritesError) {
        console.error("Error fetching favorites:", favoritesError);
      } else {
        setFavorites(favoritesData);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  // Handle the favorite toggle logic
  const handleFavorite = debounce(
    async (plantId: string, isFavorited: boolean) => {
      const supabase = createClient();
      const { data: userObject } = await supabase.auth.getUser();

      if (userObject) {
        if (isFavorited) {
          // Remove from favorites
          await removeFavorite(userObject.user.id, plantId);
          setFavorites(favorites.filter((id) => id !== plantId));
        } else {
          // Add to favorites
          await addFavorite(userObject.user.id, plantId);
          setFavorites([...favorites, plantId]);
        }
      }
    },
    500
  ); // 500ms debounce

  //handle cart logic
  const handleCartLogic = (plant: Plant) => {
    addToCart(plant);
  };

  if (loading) {
    return (
      <div className="p-10">
        <HeaderWithImgBg title="Our Plants" />
        <span className="verde text-5xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-10">
      <HeaderWithImgBg title="Our Plants" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants?.map((plant) => (
          <Card
            key={plant.id}
            {...plant}
            isFavorited={favorites.includes(plant.id)}
            handleCart={() => handleCartLogic(plant)}
            handleFavorite={() =>
              handleFavorite(plant.id, favorites.includes(plant.id))
            }
          />
        ))}
      </div>
    </div>
  );
}
