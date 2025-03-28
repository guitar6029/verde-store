"use server";

import { Plant } from "@/types/CardProps";
import { createClient } from "@/utils/supabase/server";

export async function saveOrderToOrders(
  payment_id: string,
  id: string,
  items: Plant[],
  total_price: number,
) {
  const supabase = await createClient();

  console.log("payment_id", payment_id)
  console.log("id", id)
  console.log("items", items)
  console.log("total_price", total_price)

  // Step 1: Insert into `orders` table
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        id: crypto.randomUUID(),
        total_price,
        status: "pending",
        created_at: new Date().toISOString(),
        user_id: id, 
        payment_id,
      },
    ]) // Save order without items for now
    .select("id") // Retrieve the `id` of the newly created order
    .single(); // Expect a single order to be created

  if (orderError || !orderData) {
    console.error("Error saving order:", orderError);
    return { success: false, error: "Failed to save order" };
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
