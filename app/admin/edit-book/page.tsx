"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Education");
  const [pages, setPages] = useState(15);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const slug = title
      .trim().toLowerCase()
      .replace(/\s+/g, "-");

    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        title,
        description,
        category,
        pages,
        cover: "/placeholder-cover.jpg",
        pdf: "/placeholder.pdf",
      }),
    });

    if (response.ok) {
      alert("✅ Book added successfully");

      setTitle("");
      setDescription("");
      setCategory("Education");
      setPages(15);
      setCoverPreview(null);
    } else {
      alert("❌ Failed to add book");
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-green-600">
          ➕ Add New Book
        </h1>

        <Link
          href="/admin"
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-full h-[320px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {coverPreview ? (
              <Image
                src={coverPreview}
                alt="Cover Preview"
                width={250}
                height={320}
                className="object-cover h-full w-full"
              />
            ) : (
              <span className="text-gray-400">
                Cover Preview
              </span>
            )}
          </div>

          <p className="mt-4 font-semibold text-gray-600">
            Book Preview
          </p>
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
              placeholder="Solar System"
              required
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
              placeholder="Book description..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              📂 Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>Education</option>
              <option>Story</option>
              <option>Animals</option>
              <option>Activity</option>
              <option>Coloring</option>
            </select>
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
              min={1}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              🖼️ Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setCoverPreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            ➕ Add Book
          </button>
        </form>
      </div>
    </main>
  );
}