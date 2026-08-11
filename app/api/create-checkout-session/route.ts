import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    line_items: [
      {
        price_data: {
          currency: "mad",
          product_data: {
            name: "اشتراك المكتبة الشهري",
          },
          unit_amount: 1900,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],

    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return NextResponse.json({
    url: session.url,
  });
} 