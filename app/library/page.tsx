"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Book = {
  id: number;
  slug: string;
  title: string;
  cover: string;
  pdf: string;

  preview1?: string;
  preview2?: string;
  preview3?: string;
  preview4?: string;

  description: string;
  category: string;
  pages: number;
};

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-sky-700">
        📚 Library
      </h1>

      <div className="text-center mb-8">
        <Link
          href="/"
          className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg transition"
        >
          🏠 العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border rounded-xl shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {[
          "All",
          "Story",
          "Activity",
          "Animals",
          "Coloring",
          "Education",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg ${
              category === cat
                ? "bg-sky-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-gray-500 mb-6">
        📚 {filteredBooks.length} books found
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {filteredBooks.map((book) => (
          <Link key={book.slug} href={`/book/${book.slug}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border hover:scale-105 transition">
             {book.cover ? (
  <Image
    src={book.cover}
    alt={book.title}
    width={400}
    height={600}
    unoptimized
  />
) : (
  <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-xl">
    لا يوجد غلاف
  </div>
)}

<div className="flex gap-2 p-2 overflow-hidden">
  {book.preview1 && (
    <Image
      src={book.preview1}
      alt="preview1"
      width={60}
      height={80}
       unoptimized
      className="rounded border"
    />
  )}

  {book.preview2 && (
    <Image
      src={book.preview2}
      alt="preview2"
      width={60}
      height={80}
       unoptimized
      className="rounded border"
    />
  )}

  {book.preview3 && (
    <Image
      src={book.preview3}
      alt="preview3"
      width={60}
      height={80}
       unoptimized
      className="rounded border"
    />
  )}

  {book.preview4 && (
    <Image
      src={book.preview4}
      alt="preview4"
      width={60}
      height={80}
      unoptimized
      className="rounded border"
    />
  )}
</div>

              <div className="p-4">
                <h2 className="font-bold text-xl">
                  {book.title}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {book.description}
                </p>

                <span className="inline-block mt-3 bg-sky-100 text-sky-700 px-3 py-1 rounded-lg text-sm">
                  {book.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}