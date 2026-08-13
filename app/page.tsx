[import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import KnowledgeUniverse from "./components/Scene/KnowledgeUniverse";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex justify-end p-4">
        <UserButton />
      </div>

      <Hero />

      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="bg-gradient-to-r from-blue-50 to-sky-100 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-4xl font-bold text-sky-700 mb-4">
            Welcome to Our Digital Library 📚
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Discover a world of stories, adventures, educational activities,
            and inspiring books for young readers.
          </p>

          <Link
            href="/library"
            className="inline-block bg-sky-600 text-white px-8 py-3 rounded-xl hover:bg-sky-700 transition"
          >
            Browse Library →
          </Link>
        </div>
      </section>

      <KnowledgeUniverse />

      <Categories />

      <FeaturedProducts />

      <Newsletter />

      <Footer />
    </main>
  );
}]