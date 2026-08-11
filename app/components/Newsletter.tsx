"use client";

export default function Newsletter() {
  return (
    <section className="bg-sky-700 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Join Our Learning Community
        </h2>

        <p className="text-sky-100 text-lg mb-8">
          Get new educational books, activity packs, and special offers
          delivered directly to your inbox.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-4 rounded-xl w-full md:w-96 text-gray-800 outline-none"
          />

          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300">
            Subscribe ✨
          </button>
        </div>

        <p className="text-sky-200 text-sm mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}