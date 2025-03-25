"use client";
import { debounce } from "es-toolkit";

import { useCallback, useEffect, useState } from "react";
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

export default function Plants() {
  const [plants, setPlants] = useState<Array<Plant>>([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModalShowing] = useState(false);

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

      if (!user) {
        setFavorites([]);
      } else {
        setFavorites(favorites);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  // Handle the favorite toggle logic
  // const handleFavoriteItem = debounce(
  //   async (plantId: string, isFavorited: boolean) => {
  //     const supabase = createClient();
  //     try {
  //       const { data: userObject } = await supabase.auth.getUser();

  //       // Explicitly check if `userObject.user` exists
  //       if (userObject?.user) {
  //         if (isFavorited) {
  //           // Remove from favorites
  //           await removeFavorite(userObject.user.id, plantId);
  //           setFavorites(favorites.filter((id) => id !== plantId));
  //         } else {
  //           // Add to favorites
  //           await addFavorite(userObject.user.id, plantId);
  //           setFavorites([...favorites, plantId]);
  //         }
  //       } else {
  //         console.warn(
  //           "No authenticated user found. Cannot handle favorite action."
  //         );
  //         setModalShowing(true);
  //       }
  //     } catch (error) {
  //       console.error("Error while handling favorite item:", error);
  //     }
  //   },
  //   300
  // ); // 300ms debounce interval

  const debouncedHandleFavoriteItem = useCallback(
    debounce(async (plantId: string, isFavorited: boolean) => {
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
    []
  );

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
    <>
      {modal && <ModalSignIn onClose={() => setModalShowing(false)} />}
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
                debouncedHandleFavoriteItem(
                  plant.id,
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
