"use client";

export default function Categories() {
  const categories = [
    { name: "Activity Books", emoji: "📚" },
    { name: "Coloring Books", emoji: "🎨" },
    { name: "Animals", emoji: "🦁" },
    { name: "Astronomy", emoji: "🌎" },
    { name: "Botany", emoji: "🌿" },
    { name: "Storybooks", emoji: "✨" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-sky-700 mb-12">
        Explore Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white border rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="text-5xl mb-4">{category.emoji}</div>

            <h3 className="font-semibold text-gray-800">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}