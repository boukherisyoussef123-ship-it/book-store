import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is missing");

      return NextResponse.json(
        { error: "Webhook secret is not configured" },
        { status: 500 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);

      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    console.log("STRIPE EVENT:", event.type);

    // ==============================
    // SUBSCRIPTION CREATED
    // ==============================

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const clerkUserId = session.metadata?.clerkUserId;
      const plan = session.metadata?.plan;

      if (!clerkUserId || !plan) {
        console.error("Missing metadata:", session.metadata);

        return NextResponse.json(
          { error: "Missing subscription metadata" },
          { status: 400 }
        );
      }

      const startDate = new Date();

      const endDate = new Date(startDate);

      if (plan === "yearly") {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }

      await prisma.subscription.upsert({
        where: {
          clerkUserId,
        },

        update: {
          plan,
          status: "active",
          startDate,
          endDate,
        },

        create: {
          clerkUserId,
          plan,
          status: "active",
          startDate,
          endDate,
        },
      });

      console.log("SUBSCRIPTION ACTIVATED:", clerkUserId);
    }

    // ==============================
    // SUBSCRIPTION CANCELED
    // ==============================

    if (event.type === "customer.subscription.deleted") {
      const subscription =
        event.data.object as Stripe.Subscription;

      const clerkUserId =
        subscription.metadata?.clerkUserId;

      if (clerkUserId) {
        await prisma.subscription.updateMany({
          where: {
            clerkUserId,
          },

          data: {
            status: "canceled",
          },
        });

        console.log(
          "SUBSCRIPTION CANCELED:",
          clerkUserId
        );
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("STRIPE WEBHOOK ERROR:", error);

    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}