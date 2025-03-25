"use client";
import { debounce } from "es-toolkit";
import { useCallback, useState } from "react";
import { getPlants } from "@/lib/db/plants";
import {
  addFavorite,
  removeFavorite,
  fetchUserAndFavorites,
} from "@/lib/db/favorites";
import Card from "@/components/Card/Card";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { createClient } from "@/utils/supabase/client";
import { Plant } from "@/types/CardProps";
import { useCartStore } from "@/store/cartStore";
import ModalSignIn from "@/components/Modal/ModalSignIn";
import { useQuery } from "@tanstack/react-query";

export default function Plants() {
  const { addToCart } = useCartStore();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [modal, setModalShowing] = useState(false);

  // ✅ Use TanStack Query
  const {
    data: plants = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plants"],
    queryFn: getPlants,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  console.log("plants", plants);

  // ✅ Fetch user & favorites separately
  useQuery({
    queryKey: ["user", "favorites"],
    queryFn: async () => {
      const { user, favorites } = await fetchUserAndFavorites();
      setFavorites(
        user ? favorites.map((favorite) => favorite.product_id) : []
      );
    },
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Debounced favorite toggle function
  const debouncedHandleFavoriteItem = useCallback(
    debounce(async (plantId: number, isFavorited: boolean) => {
      const supabase = createClient();
      try {
        const { data: userObject } = await supabase.auth.getUser();

        if (userObject?.user) {
          if (isFavorited) {
            await removeFavorite(userObject.user.id, plantId);
            setFavorites((prev) => prev.filter((id) => id !== plantId));
          } else {
            await addFavorite(userObject.user.id, plantId);
            setFavorites((prev) => [...prev, plantId]);
          }
        } else {
          console.warn(
            "No authenticated user found. Cannot handle favorite action."
          );
          setModalShowing(true);
        }
      } catch (error) {
        console.error("Error while handling favorite item:", error);
      }
    }, 300), // 300ms debounce time
    [removeFavorite, addFavorite, setFavorites, createClient] // explicit dependencies
  );

  // ✅ Handle cart logic
  const handleCartLogic = (plant: Plant) => {
    addToCart(plant);
  };

  // ✅ Handle loading and errors
  if (isLoading) {
    return (
      <div className="p-10">
        <HeaderWithImgBg title="Our Plants" />
        <span className="verde text-5xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <HeaderWithImgBg title="Our Plants" />
        <span className="text-red-500 text-5xl">Error loading plants.</span>
      </div>
    );
  }

  return (
    <>
      {modal && <ModalSignIn onClose={() => setModalShowing(false)} />}
      <div className="p-10">
        <HeaderWithImgBg title="Our Plants" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map((plant: Plant) => (
            <Card
              key={plant.id}
              {...plant}
              isFavorited={favorites.includes(plant.id)}
              handleCart={() => handleCartLogic(plant)}
              handleFavorite={() =>
                debouncedHandleFavoriteItem(
                  Number(plant.id),
                  favorites.includes(plant.id)
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
