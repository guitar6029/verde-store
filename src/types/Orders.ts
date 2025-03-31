export type Order = {
    id: string;
    total_price: number;
    status: string;
    created_at: string;
    user_id: string;
    payment_id: string;
    guest_id: string | null;
  };
  
  export type DetailedOrder = {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price_at_purchase: number;
    image_url: string;
  };
  
  export type OrderProduct = {
    order: Order;
    detailedOrder: DetailedOrder[];
  };