"server only";

import { Plant } from "@/types/CardProps";
import { createClient } from "@/utils/supabase/server";
import { DetailedOrder, Order, OrderProduct } from "@/types/Orders";
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
        status: "ordered",
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

/**
 * Retrieves a user's orders from the database.
 *
 * @param userId The user ID to retrieve orders for.
 * @returns An object containing the retrieved orders and an error message if
 *          the request failed.
 */
export async function getOrders(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error("Error getting orders:", error);
    return { success: false, data: null, error: "Failed to get orders" };
  }
  return { success: true, data, error: null };
}

export async function getDetailedOrder(userId: string) {
  const supabase = await createClient();
  //first retrieve the orders for the user
  const { data: orders, error: ordersError } = await getOrders(userId);

  if (ordersError) {
    console.error("Error getting orders:", ordersError);
    return { success: false, data: null, error: "Failed to get orders" };
  }

  if (orders && orders.length === 0) {
    return { success: true, data: [], error: null };
  }

  //now we could get the detais of the each order via the order_items table
  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("*")
    .in(
      "order_id",
      orders?.map((order: DetailedOrder) => order.id) ?? []
    );

  if (orderItemsError) {
    console.error("Error getting order items:", orderItemsError);
    return { success: false, data: null, error: "Failed to get order items" };
  }

  //orderItems is the DetailedOrderSchema
  if (!orderItems) {
    return { success: false, data: null, error: "Failed to get order items" };
  }
  //combined orders and orderItems
  const combined: OrderProduct[] = (orders ?? []).map((order: Order) => {
    return {
      order: order,
      detailedOrder: orderItems?.filter(
        (item: DetailedOrder) => item.order_id === order.id
      ),
    };
  });

  // but the combined is the TS type of OrderProductSchema (the same except its TS type instead of zod ?)

  return { success: true, data: combined, error: null };
}
