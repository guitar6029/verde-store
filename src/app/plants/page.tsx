"use client";

import { addFavorite, removeFavorite, getFavorites } from "@/lib/db/favorites";
import { debounce } from "es-toolkit";
import { getPlants } from "@/lib/db/plants";
import { Plant } from "@/types/CardProps";
import { useAccountStore } from "@/store/accountStore";
import { useCallback, useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/Card/Card";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import ModalSignIn from "@/components/Modal/ModalSignIn";
import { toast } from "react-toastify";
import SearchBarWithClearBtn from "@/components/Combo/SearchBarWithClearBtn";

export default function Plants() {
  const { addToCart } = useCartStore();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [modal, setModalShowing] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const { user } = useAccountStore();

  const handleSearch = (searchedTerm: string) => {
    if (searchedTerm === "") {
      setFilteredPlants(plants);
    } else {
      if (
        !plants.some((plant) =>
          plant.name.toLowerCase().includes(searchedTerm.toLowerCase())
        )
      ) {
        toast.error("No results found");
      }
      //filter plants based on search term
      const filtered = plants.filter((plant) => {
        return plant.name.toLowerCase().includes(searchedTerm.toLowerCase());
      });
      setFilteredPlants(filtered);
    }
  };

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
      <div className="p-10 min-h-screen">
        <HeaderWithImgBg title="Our Plants" />
        <span className="text-red-500 text-5xl mx-auto my-auto ">
          Error loading plants.
        </span>
      </div>
    );
  }

  return (
    <>
      {modal && <ModalSignIn onClose={() => setModalShowing(false)} />}
      <div className="p-10 flex flex-col gap-5">
        <HeaderWithImgBg title="Our Plants" />
        <SearchBarWithClearBtn
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
          onClear={() => handleSearch("")}
        />

        <div className="plants-grid">
          {filteredPlants.length > 0
            ? filteredPlants.map((plant: Plant) => (
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
              ))
            : plants.map((plant: Plant) => (
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
