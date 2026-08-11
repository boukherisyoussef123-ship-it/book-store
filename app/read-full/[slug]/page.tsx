import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSignedUrl } from "@/lib/storage";

export default async function ReadFullPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  // يجب أن يكون المستخدم مسجل الدخول
  if (!userId) {
    redirect("/sign-in");
  }

  const { slug } = await params;

  // البحث عن الكتاب
  const book = await prisma.book.findUnique({
    where: {
      slug,
    },
  });

  if (!book) {
    notFound();
  }

  // البحث عن اشتراك المستخدم
  const subscription = await prisma.subscription.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  console.log("===== SUBSCRIPTION DEBUG =====");
console.log("USER ID =", userId);
console.log("SUBSCRIPTION =", subscription);
console.log("==============================");

  // التحقق من الاشتراك
  if (
    !subscription ||
    subscription.status !== "active" ||
    subscription.endDate <= new Date()
  ) {
    redirect(`/pricing?slug=${slug}`);
  }

  // إنشاء رابط مؤقت للـ PDF
  const pdfUrl = await createSignedUrl(
    "books",
    book.pdf,
    300
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Link
          href="/library"
          className="text-sky-600 hover:text-sky-800"
        >
          ← Library
        </Link>

        <h1 className="font-bold text-lg">
          {book.title}
        </h1>

        <a
          href={pdfUrl}
          download
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          ⬇️ تحميل الكتاب PDF
        </a>
      </div>

      <iframe
        src={pdfUrl}
        title={book.title}
        className="w-full h-[calc(100vh-70px)] border-0"
      />
    </main>
  );
}