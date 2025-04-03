"use client";

import { addFavorite, removeFavorite, getFavorites } from "@/lib/db/favorites";
import { debounce } from "es-toolkit";
import { MoveUp } from "lucide-react";
import { Plant } from "@/types/CardProps";
import { scrollToTop } from "@/utils/scroll/scrollRelated";
import { toast } from "react-toastify";
import { useAccountStore } from "@/store/accountStore";
import { useCallback, useState, useEffect, useRef } from "react";
import { useCartStore } from "@/store/cartStore";
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

  //for the scroll btn
  const parentDivRef = useRef<HTMLDivElement | null>(null);
  // for the scroll btn
  const [scrollBtn, setScrollBtnVisibility] = useState<boolean>(false);

  useEffect(() => {
    const mainElement = document.querySelector("main");

    const handleScroll = () => {
      if (mainElement) {
        const scrollPosition = mainElement.scrollTop;
        const divHeight = mainElement.offsetHeight;

        console.log("Scroll Position:", scrollPosition); // Debugging
        console.log("Div Height:", divHeight); // Debugging

        if (scrollPosition > divHeight * 0.55) {
          setScrollBtnVisibility(true);
        } else {
          setScrollBtnVisibility(false);
        }
      }
    };

    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }

    // Cleanup
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
      {scrollBtn ? (
        <div
          onClick={scrollToTop}
          className="fixed bottom-10 right-5 p-5 z-10 rounded-full bg-green-200 hover:bg-green-300 transition duration-300 ease-in group hover:cursor-pointer hover:scale-110"
        >
          <MoveUp size={50} className="text-white group-hover:cursor-pointer" />
        </div>
      ) : null}
      {modal && <ModalSignIn onClose={() => setModalShowing(false)} />}
      <div ref={parentDivRef} className="mt-10">
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
