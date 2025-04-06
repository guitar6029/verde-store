import { NextRequest, NextResponse } from "next/server";
import { saveOrderToOrders } from "@/lib/db/orders";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { payment_id, amount, items, userId } = body;

  // Verify the properties are present
  if (!userId || !payment_id || !amount || !items || !Array.isArray(items)) {
    return NextResponse.json(
      { success: false, error: "Missing required parameters", status: 400 },
      { status: 400 }
    );
  }

  try {
    const {
      success: orderSuccess,
      data: orderData,
      error: orderError,
    } = await saveOrderToOrders(payment_id, userId, items, amount);

    if (!orderSuccess) {
      console.error(`Error saving order for user ID ${userId}:`, orderError);
      return NextResponse.json(
        { success: false, error: "Failed to save order", status: 500 },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully",
        data: orderData,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in save-order route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
}
