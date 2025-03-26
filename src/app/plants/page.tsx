"use client";

import { debounce } from "es-toolkit";
import { useCallback, useState, useEffect } from "react";
import { getPlants } from "@/lib/db/plants";
import { addFavorite, removeFavorite, getFavorites } from "@/lib/db/favorites";
import Card from "@/components/Card/Card";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import { Plant } from "@/types/CardProps";
import { useCartStore } from "@/store/cartStore";
import ModalSignIn from "@/components/Modal/ModalSignIn";
import { useQuery } from "@tanstack/react-query";
import { useAccountStore } from "@/store/accountStore";


export default function Plants() {
  const { addToCart } = useCartStore();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [modal, setModalShowing] = useState(false);
   const { user} = useAccountStore();


  

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

  // Fetch favorites (conditionally based on user existence)
  const {
    data: favoritesData,
    isSuccess: favoritesSuccess,
    isError: favoritesError,
  } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      const { data: favorites } = await getFavorites(user?.id as string);
      console.log("favorites", favorites);
      return favorites.map((favorite) => favorite.product_id);
    },
    enabled: !!user, // Only fetch if the user exists
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Update favorites state when query succeeds
  useEffect(() => {
    if (favoritesSuccess && favoritesData) {
      setFavorites(favoritesData);
    }
    if (favoritesError) {
      console.error("Error fetching favorites.");
    }
  }, [favoritesSuccess, favoritesData, favoritesError]);

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
      <div className="p-10 flex flex-col items-center justify-center min-h-screen">
        <HeaderWithImgBg title="Our Plants" />
        <span className="verde text-9xl mx-auto my-auto">Loading...</span>
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
        <div className="plants-grid">
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