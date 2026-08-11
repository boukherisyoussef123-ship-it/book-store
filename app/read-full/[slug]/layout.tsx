import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasActiveSubscription } from "../../config/subscription";

export default async function ReadFullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // المستخدم غير مسجل
  if (!userId) {
    redirect("/sign-in");
  }

  console.log("SUB:", hasActiveSubscription);

  // المستخدم غير مشترك
  if (!hasActiveSubscription) {
    redirect("/subscribe");
  }

  return <>{children}</>;
}