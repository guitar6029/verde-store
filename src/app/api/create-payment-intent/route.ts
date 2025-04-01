import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("PaymentIntent created:", paymentIntent);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("somethign wrong");
    console.error(error);
    return NextResponse.json(
      { error: `Internal server error : ${error}` },
      { status: 500 }
    );
  }
}
