"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

type Book = {
  id: number;
  slug: string;
  title: string;
  cover: string;
  pdf: string;
  description: string;
  category: string;
  pages: number;
};

export default function EditBookPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState(0);

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch("/api/books");
        const books = await res.json();

        const foundBook = books.find(
          (b: Book) => b.slug === slug
        );

        if (foundBook) {
          setBook(foundBook);
          setTitle(foundBook.title);
          setDescription(foundBook.description);
          setCategory(foundBook.category);
          setPages(foundBook.pages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [slug]);

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    alert(
      "Update API not created yet. Book data ready for update."
    );
  }

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-red-600">
          Book not found
        </h1>

        <Link
          href="/admin/books"
          className="mt-4 inline-block bg-sky-600 text-white px-4 py-2 rounded"
        >
          Back to Books
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-8">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-yellow-600">
          ✏️ Edit Book
        </h1>

        <Link
          href="/admin"
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <div>
          <label className="block mb-2 font-semibold">
            📖 Book Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            📝 Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            📂 Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            📄 Pages
          </label>

          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
        >
          💾 Save Changes
        </button>
      </form>

    </main>
  );
}