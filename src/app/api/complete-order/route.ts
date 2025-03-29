import { NextRequest, NextResponse } from "next/server";
import { createGuest, findGuest } from "@/lib/db/guests";
import { saveOrderToOrders } from "@/lib/db/orders";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { payment_id, name, guestEmail, amount, items, user } = body;

  // Verify the properties are present
  if (
    !payment_id ||
    !amount ||
    !items ||
    !Array.isArray(items) ||
    (!user && (!guestEmail || !name))
  ) {
    return NextResponse.json(
      { success: false, error: "Missing required parameters", status: 400 },
      { status: 400 }
    );
  }

  try {
    let userId = user?.id;
    if (!user) {
      // Handle guest logic
      const { data: guestData } = await findGuest(guestEmail);

      if (guestData) {
        userId = guestData.id;
      } else {
        const { data: newGuestData, error: createGuestError } =
          await createGuest(guestEmail, name);

        if (createGuestError || !newGuestData) {
          console.error(
            `Error creating guest with email ${guestEmail}:`,
            createGuestError
          );
          return NextResponse.json(
            { success: false, error: "Failed to create guest", status: 500 },
            { status: 500 }
          );
        }

        userId = newGuestData.id;
      }
    }

    // Save the order
    const forGuests = !user;
    const {
      success: orderSuccess,
      data: orderData,
      error: orderError,
    } = await saveOrderToOrders(payment_id, userId, items, amount, forGuests);

    if (!orderSuccess) {
      console.error(
        `Error saving order for ${forGuests ? "guest" : "user"} ID ${userId}:`,
        orderError
      );
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
