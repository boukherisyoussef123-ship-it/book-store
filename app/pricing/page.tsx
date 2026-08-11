"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PricingContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug"); 
  const [loading, setLoading] = useState<
    "monthly" | "yearly" | null
  >(null);

  async function subscribe(plan: "monthly" | "yearly") {
    try {
      setLoading(plan);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
  plan,
  slug,
}),

      });
    

      const data = await response.json();

      console.log("CHECKOUT STATUS:", response.status);
      console.log("CHECKOUT DATA:", data);

      if (!response.ok) {
        alert(data?.error || "حدث خطأ أثناء إنشاء الدفع");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert("لم يتم الحصول على رابط الدفع");
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "حدث خطأ غير معروف"
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12">
          اختر اشتراكك
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* الاشتراك الشهري */}
          <div className="bg-white border rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              الاشتراك الشهري
            </h2>

            <p className="text-4xl font-bold text-green-600 mb-6">
              $1.90
            </p>

            <ul className="space-y-3 mb-8 text-gray-700">
              <li>✅ قراءة جميع الكتب</li>
              <li>✅ الوصول إلى ملفات PDF</li>
              <li>✅ تحميل الكتب</li>
            </ul>

            <button
              onClick={() => subscribe("monthly")}
              disabled={loading !== null}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
            >
              {loading === "monthly"
                ? "جاري التحويل..."
                : "اشترك الآن"}
            </button>
          </div>

          {/* الاشتراك السنوي */}
          <div className="bg-white border-2 border-purple-500 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              الاشتراك السنوي
            </h2>

            <p className="text-4xl font-bold text-purple-600 mb-6">
              $5.90
            </p>

            <ul className="space-y-3 mb-8 text-gray-700">
              <li>✅ قراءة جميع الكتب</li>
              <li>✅ الوصول إلى ملفات PDF</li>
              <li>✅ تحميل الكتب</li>
            </ul>

            <button
              onClick={() => subscribe("yearly")}
              disabled={loading !== null}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
            >
              {loading === "yearly"
                ? "جاري التحويل..."
                : "اشترك الآن"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <PricingContent />
    </Suspense>
  );
}
