import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("========== ACTIVATE SUBSCRIPTION ==========");
    console.log("USER ID =", userId);

    // تحديث Clerk
    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        subscription: "active",
      },
    });

    // إنشاء / تحديث الاشتراك في Prisma
    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const subscription = await prisma.subscription.upsert({
      where: {
        clerkUserId: userId,
      },

      update: {
        status: "active",
        plan: "monthly",
        startDate,
        endDate,
      },

      create: {
        clerkUserId: userId,
        status: "active",
        plan: "monthly",
        startDate,
        endDate,
      },
    });

    console.log("PRISMA SUBSCRIPTION =", subscription);

    return NextResponse.json({
      success: true,
      subscription,
    });

  } catch (error) {
    console.error("ACTIVATE SUBSCRIPTION ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}