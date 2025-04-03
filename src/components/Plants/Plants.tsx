"use client";

import { addFavorite, removeFavorite, getFavorites } from "@/lib/db/favorites";
import { debounce } from "es-toolkit";
import { Plant } from "@/types/CardProps";
import { toast } from "react-toastify";
import { useAccountStore } from "@/store/accountStore";
import { useCartStore } from "@/store/cartStore";
import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/Card/Card";
import ModalSignIn from "@/components/Modal/ModalSignIn";
import SearchBarWithClearBtn from "@/components/Combo/SearchBarWithClearBtn";

export default function Plants({ plants }: { plants: Plant[] }) {
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [modal, setModalShowing] = useState(false);
  const { user } = useAccountStore();
  const { addToCart } = useCartStore();

  // Sync filteredPlants with initial plants when plants change
  useEffect(() => {
    setFilteredPlants(plants);
  }, [plants]);

  // Search Filter
  const handleSearch = (searchedTerm: string) => {
    const term = searchedTerm.toLowerCase();

    if (!term) {
      setFilteredPlants(plants);
      return;
    }

    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(term)
    );

    setFilteredPlants(filtered);
    
    if (filtered.length === 0) {
      toast.error("No results found");
    }
  };

  // Fetch favorites when the user exists
  const { data: favoritesData } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      const { data } = await getFavorites(user?.id as string);
      return data.map((favorite) => favorite.product_id);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Sync fetched favorites with state
  useEffect(() => {
    if (favoritesData) setFavorites(favoritesData);
  }, [favoritesData]);

  // Debounced Favorite Handling
  const handleFavorite = useCallback(
    debounce(async (plant: Plant, isFavorited: boolean) => {
      if (!user) {
        setModalShowing(true);
        return;
      }

      try {
        if (isFavorited) {
          await removeFavorite(user.id, plant.id);
          setFavorites((prev) => prev.filter((id) => id !== plant.id));
        } else {
          const { error } = await addFavorite(user.id, plant.id);
          if (!error) {
            toast.success(`Added ${plant.name} to favorites!`);
            setFavorites((prev) => [...prev, plant.id]);
          }
        }
      } catch (error) {
        console.error("Error handling favorite:", error);
      }
    }, 500),
    [user]
  );

  return (
    <>
      {modal && <ModalSignIn onClose={() => setModalShowing(false)} />}
      <div className="mt-10">

      <SearchBarWithClearBtn
        handleChange={(e) => handleSearch(e.target.value)}
        onClear={() => handleSearch("")}
        />
        </div>

      <div className="plants-grid">
        {filteredPlants.map((plant) => (
          <Card
            key={plant.id}
            {...plant}
            isFavorited={favorites.includes(plant.id)}
            handleCart={() => addToCart(plant)}
            handleFavorite={() =>
              handleFavorite(plant, favorites.includes(plant.id))
            }
          />
        ))}
      </div>
    </>
  );
}
