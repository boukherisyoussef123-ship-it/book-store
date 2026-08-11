"use client";

export default function Benefits() {
  const benefits = [
    {
      icon: "⚡",
      title: "Instant Download",
      description: "Get your books immediately after purchase."
    },
    {
      icon: "📚",
      title: "Educational Content",
      description: "Designed to help children learn while having fun."
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      description: "Beautifully designed books and printable resources."
    },
    {
      icon: "👧",
      title: "Kid Friendly",
      description: "Created especially for curious young learners."
    }
  ];

  return (
    <section className="bg-sky-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-sky-700 mb-12">
          Why Parents Love Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">
                {benefit.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}