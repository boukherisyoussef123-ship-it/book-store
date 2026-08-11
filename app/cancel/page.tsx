import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="max-w-3xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        تم إلغاء العملية ❌
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        لم يتم تفعيل أي اشتراك. يمكنك المحاولة مرة أخرى في أي وقت.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/subscribe"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          العودة إلى الاشتراك
        </Link>

        <Link
          href="/library"
          className="border px-6 py-3 rounded-lg hover:bg-gray-100"
        >
          العودة إلى المكتبة
        </Link>
      </div>
    </main>
  );
}