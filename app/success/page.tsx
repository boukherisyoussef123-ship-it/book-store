"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    fetch("/api/activate-subscription", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        تم الاشتراك بنجاح 🎉
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        يمكنك الآن الوصول إلى جميع الكتب والقراءة الكاملة.
      </p>

      <a
        href="/library"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        الذهاب إلى المكتبة
      </a>
    </main>
  );
}