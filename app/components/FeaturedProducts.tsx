"use client";

import { siteConfig } from "@/config/siteConfig";

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-sky-700 mb-12">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {siteConfig.products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border"
          >
            <img
              src={product.cover}
              alt={product.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg">{product.title}</h3>

              <p className="text-gray-600 text-sm mt-2">
                {product.desc}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-sky-700">
                  ${product.price}
                </span>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-sky-600 text-white px-4 py-2 rounded-lg"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}