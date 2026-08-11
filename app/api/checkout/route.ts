import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    // المستخدم الحالي
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { plan, slug } = await req.json();

    if (plan !== "monthly" && plan !== "yearly") {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const amount = plan === "yearly" ? 590 : 190;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name:
                plan === "yearly"
                  ? "اشتراك سنوي"
                  : "اشتراك شهري",

              tax_code: "txcd_10103000",
            },

            recurring: {
              interval:
                plan === "yearly"
                  ? "year"
                  : "month",
            },

            unit_amount: amount,
          },

          quantity: 1,
        },
      ],

      // مهم جدًا:
      // نربط عملية الدفع بمستخدم Clerk
      metadata: {
        clerkUserId: userId,
        plan,
      },

      // مهم أيضًا للأحداث الخاصة بالاشتراك
      subscription_data: {
        metadata: {
          clerkUserId: userId,
          plan,
        },
      },

      success_url:
        "http://localhost:3000/success",

      cancel_url:
        "http://localhost:3000/cancel",
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error: any) {
    console.error("========== STRIPE ERROR ==========");
    console.log(error?.message);
    console.dir(error, { depth: null });

    return NextResponse.json(
      {
        error: error?.message || "Stripe Error",
      },
      {
        status: 500,
      }
    );
  }
}