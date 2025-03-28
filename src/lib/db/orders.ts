"use server";

import { Plant } from "@/types/CardProps";
import { createClient } from "@/utils/supabase/server";

export async function saveOrderToOrders(
  payment_id: string,
  id: string,
  items: Plant[],
  total_price: number,
  forGuests: boolean
) {
  const supabase = await createClient();

  // Step 1: Insert into `orders` table
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        id: crypto.randomUUID(),
        total_price,
        status: "pending",
        created_at: new Date().toISOString(),
        guest_id: forGuests ? id : null,
        user_id: forGuests ? null : id,
        payment_id,
      },
    ]) // Save order without items for now
    .select("id") // Retrieve the `id` of the newly created order
    .single(); // Expect a single order to be created

  if (orderError || !orderData) {
    console.error("Error saving order:", {
      message: orderError?.message || "No error message provided",
      code: orderError?.code || "No error code",
      details: orderError?.details || "No details provided",
      hint: orderError?.hint || "No hint available",
    });

    return {
      success: false,
      error: "Failed to save order",
      fullError: orderError,
    };
  }

  const order_id = orderData.id; // Retrieve the created order's ID

  // Step 2: Insert into `order_items` table
  const orderItems = items.map((item) => ({
    order_id, // Associate with the order
    product_id: item.id, // Use product ID from the `items`
    quantity: item.quantity,
    price_at_purchase: item.price, // Store the price at purchase
    image_url: item.image_url,
  }));

  const { data: orderItemsData, error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems); // Insert all items at once

  if (orderItemsError) {
    console.error("Error saving order items:", orderItemsError);
    return { success: false, error: "Failed to save order items" };
  }

  return { success: true, data: { order_id, orderItemsData }, error: null };
}
