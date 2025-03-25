"use client";

import { debounce } from "es-toolkit";
import { useCallback, useState } from "react";
import { getPlants } from "@/lib/db/plants";
import { addFavorite, removeFavorite, getFavorites } from "@/lib/db/favorites";
import Card from "@/components/Card/Card";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { Plant } from "@/types/CardProps";
import { useCartStore } from "@/store/cartStore";
import ModalSignIn from "@/components/Modal/ModalSignIn";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/context/UserContext";

export default function Plants() {
  const { addToCart } = useCartStore();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [modal, setModalShowing] = useState(false);

  const { user } = useUserContext(); // Access user from the context

  // Fetch plants
  const {
    data: plants = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plants"],
    queryFn: getPlants,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Fetch favorites only if the user exists
  const { data: favoritesData } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      const { favorites } = await getFavorites(user?.id as string);
      return favorites.map((favorite) => favorite.product_id);
    },
    enabled: !!user, // Only fetch if the user is not null
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => setFavorites(data), // Update state on successful fetch
  });

  const debouncedHandleFavoriteItem = useCallback(
    debounce(async (plantId: number, isFavorited: boolean) => {
      try {
        if (user) {
          if (isFavorited) {
            await removeFavorite(user.id, plantId);
            setFavorites((prev) => prev.filter((id) => id !== plantId));
          } else {
            await addFavorite(user.id, plantId);
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
    [removeFavorite, addFavorite, setFavorites, user]
  );

  const handleCartLogic = (plant: Plant) => {
    addToCart(plant);
  };

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
