"use client";

export default function SubscribePage() {
  async function subscribe(plan: "monthly" | "yearly") {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("DATA:", data);

      if (!response.ok) {
        alert(JSON.stringify(data, null, 2));
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : JSON.stringify(error)
      );
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        اختر اشتراكك
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            الاشتراك الشهري
          </h2>

          <p className="text-4xl font-bold text-green-600 mb-6">
            $1.90
          </p>

          <button
            onClick={() => subscribe("monthly")}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            اشترك الآن
          </button>
        </div>

        <div className="border rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            الاشتراك السنوي
          </h2>

          <p className="text-4xl font-bold text-purple-600 mb-6">
            $5.90
          </p>

          <button
            onClick={() => subscribe("yearly")}
            className="w-full bg-purple-600 text-white py-3 rounded-lg"
          >
            اشترك الآن
          </button>
        </div>
      </div>
    </main>
  );
}