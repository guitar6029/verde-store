import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(), // Ensures the ID is a string
  total_price: z.number(), // Total price as a number
  status: z.string(), // Status as a string
  created_at: z.string().datetime(), // Validates the date-time format
  user_id: z.string(),
  payment_id: z.string(),
  guest_id: z.string().nullable(), // Allows null values
});

export const DetailedOrderSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  price_at_purchase: z.number(),
  image_url: z.string().url(), // Validates that it's a proper URL
});

export const OrderProductSchema = z.object({
  order: OrderSchema, // Validates the order object
  detailedOrder: z.array(DetailedOrderSchema), // Ensures detailedOrder is an array of objects matching the schema
});