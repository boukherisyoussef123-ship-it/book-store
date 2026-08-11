"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();

      console.log("API DATA:", data);

      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error(error);
      setBooks([]);
    }
  }

  async function deleteBook(id: number, title: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBooks((prev) =>
        prev.filter((book) => book.id !== id)
      );

      alert("Book deleted successfully");
    } else {
      alert("Delete failed");
    }
  }

  const categories = [
    "All",
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      book.category === category;

    return matchesSearch && matchesCategory;
  });

 return (
  <main className="p-6">

    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">
        📚 Manage Books
      </h1>

      <Link
        href="/admin/add-book"
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
      >
        ➕ Add New Book
      </Link>
    </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 border rounded-xl shadow-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
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

      <p className="text-gray-500 mb-4">
        📚 {filteredBooks.length} books found
      </p>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-sky-600 text-white">
  <tr>
    <th className="p-4 text-left">Cover</th>

    <th className="p-4 text-left">
      Preview Pages
    </th>

    <th className="p-4 text-left">Title</th>

    <th className="p-4 text-left">
      Category
    </th>

    <th className="p-4 text-left">Pages</th>

    <th className="p-4 text-left">
      Actions
    </th>
  </tr>
</thead>
          <tbody>
  {filteredBooks.map((book) => (
    <tr
      key={book.id}
      className="border-b hover:bg-sky-50 transition-all duration-200"
    >
      {/* COVER */}
      <td className="p-4">
        <img
          src={book.cover}
          alt={book.title}
         className="w-24 h-36 object-cover rounded-xl shadow-lg border"
        />
      </td>

      {/* PREVIEWS */}
      <td className="p-4">
        <div className="grid grid-cols-2 gap-2 w-28">
          {book.preview1 && (
            <img
              src={book.preview1}
              alt=""
             className="w-14 h-20 object-cover rounded-lg border shadow-sm hover:scale-105 transition"
            />
          )}

          {book.preview2 && (
            <img
              src={book.preview2}
              alt=""
              className="w-14 h-20 object-cover rounded-lg border shadow-sm hover:scale-105 transition"
            />
          )}

          {book.preview3 && (
            <img
              src={book.preview3}
              alt=""
              className="w-14 h-20 object-cover rounded-lg border shadow-sm hover:scale-105 transition"
            />
          )}

          {book.preview4 && (
            <img
              src={book.preview4}
              alt=""
             className="w-14 h-20 object-cover rounded-lg border shadow-sm hover:scale-105 transition"
            />
          )}
        </div>
      </td>

      {/* TITLE */}
      <td className="p-4 font-medium">
        {book.title}
      </td>

      {/* CATEGORY */}
      <td className="p-4">
        {book.category}
      </td>

      {/* PAGES */}
      <td className="p-4">
  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
    {book.pages} Pages
  </span>
</td>

      {/* ACTIONS */}
      <td className="p-4">
        <div className="flex gap-2">
          <Link
            href={`/admin/edit-book/${book.slug}`}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>

          <button
            onClick={() =>
              deleteBook(
                book.id,
                book.title
              )
            }
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
        </table>

        {filteredBooks.length === 0 && (
          <div className="text-center py-10">
            No books found 📚
          </div>
        )}
      </div>
    </main>
  );
}