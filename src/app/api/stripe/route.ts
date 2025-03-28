import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

/**
 * Confirm a payment and save the order to the database
 * @param {Request} request - The request object
 * @returns {NextResponse} - The response object
 * @throws {Error} - If there is an error with the request or when saving the order to the database
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payment_intent, items, amount } = body;

    if (!payment_intent || !items || !amount) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Retrieve the PaymentIntent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    if (paymentIntent.status === "succeeded") {
      return NextResponse.json(
        { success: true, message: "Payment processed successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Payment not successful. Current status: ${paymentIntent.status}`,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
