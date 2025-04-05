"use client";

import { Product } from "@/types/Orders";
import ShowMoreBtn from "../Buttons/ShowMoreButton";
import OrderDetailedList from "../Orders/OrderDetailedList";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useState } from "react";
export default function ItemsContainer({ data }: { data: Product[] }) {
  const [showAll, setShowAll] = useState(false);

  /**
   * Handles the toggle of the "Show more" button. If true, then it will show all items.
   * If false, it will only show 3 items.
   */
  const handleToggleBtn = () => {
    setShowAll((prev) => !prev);
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>No items available.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-10">
      <SectionTitle title="Items in Order" />

      <OrderDetailedList
        productsDetails={showAll ? data?.slice(0, 3) || [] : data}
      />
      {data.length > 3 ? (
        <ShowMoreBtn toggle={handleToggleBtn} currentState={showAll} />
      ) : null}
    </div>
  );
}
