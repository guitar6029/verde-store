import { NextRequest, NextResponse } from "next/server";
import { createGuest, findGuest } from "@/lib/db/guests";
import { saveOrderToOrders } from "@/lib/db/orders";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { payment_id, name, guestEmail, amount, items } = body;

  // Verify the properties are present
  if (
    !payment_id ||
    !name ||
    !guestEmail ||
    !amount ||
    !items ||
    !Array.isArray(items)
  ) {
    return NextResponse.json(
      { success: false, error: "Missing required parameters", status: 400 },
      { status: 400 }
    );
  }

  try {
    let guestId;

    // Step 1: Check if guest exists
    const { data: guestData } = await findGuest(guestEmail);

    // if guest exists
    if (guestData) {
      guestId = guestData.id;
    } else {
      // Step 2: Create a new guest
      const { data: newGuestData, error: createGuestError } = await createGuest(
        guestEmail,
        name
      );

      if (createGuestError || !newGuestData) {
        console.error(
          `Error creating guest with email ${guestEmail}:`,
          createGuestError
        );
        return NextResponse.json({
          success: false,
          error: "Failed to create guest",
          status: 500,
        });
      }

      guestId = newGuestData.id;
    }

    // Step 3: Save the order
    //for guests
    const forGuests = true;
    const {
      success: orderSuccess,
      data: orderData,
      error: orderError,
    } = await saveOrderToOrders(payment_id, guestId, items, amount, forGuests);

    if (!orderSuccess) {
      console.error(`Error saving order for guest ID ${guestId}:`, orderError);
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
    console.error("Unexpected error in save-guest-and-order route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
}
