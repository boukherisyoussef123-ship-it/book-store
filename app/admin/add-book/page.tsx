"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imageCompression from "browser-image-compression";

export default function AddBookPage() {
  console.log("ADD BOOK PAGE LOADED");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Education");
  const [pages, setPages] = useState(15);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [preview1, setPreview1] = useState<File | null>(null);
  const [preview2, setPreview2] = useState<File | null>(null);
  const [preview3, setPreview3] = useState<File | null>(null);
  const [preview4, setPreview4] = useState<File | null>(null);

 // الحد الأقصى للصورة بعد الضغط
const MAX_IMAGE_SIZE = 300 * 1024; // 300KB

async function compressImage(
  file: File,
  label: string
): Promise<File | null> {

  console.log("🔥 COMPRESS START:", label);
  console.log(
    "Original:",
    file.name,
    (file.size / 1024).toFixed(0),
    "KB"
  );

  try {
    let quality = 0.8;
    let maxSize = 1400;
    let compressed = file;

    for (let i = 0; i < 8; i++) {

      console.log(
        `🔄 ${label} compression attempt ${i + 1}`
      );

      compressed = await imageCompression(file, {
        maxSizeMB: 0.28,
        maxWidthOrHeight: maxSize,
        initialQuality: quality,
        useWebWorker: true,
        fileType: "image/jpeg",
      });

      console.log(
        `✅ ${label}:`,
        (file.size / 1024).toFixed(0),
        "KB →",
        (compressed.size / 1024).toFixed(0),
        "KB"
      );

      if (compressed.size <= MAX_IMAGE_SIZE) {
        console.log(
          `🎯 ${label} FINAL:`,
          (compressed.size / 1024).toFixed(0),
          "KB"
        );

        return compressed;
      }

      quality -= 0.08;
      maxSize -= 100;

      if (quality < 0.25) {
        quality = 0.25;
      }

      if (maxSize < 700) {
        maxSize = 700;
      }
    }

    console.log("❌ Could not compress:", label);

    alert(
      `❌ ${label} لا يمكن ضغطها إلى أقل من 300KB.\n` +
      `الحجم النهائي: ${(compressed.size / 1024).toFixed(0)}KB`
    );

    return null;

  } catch (error) {

    console.error(
      `❌ Compression error - ${label}:`,
      error
    );

    alert(`❌ فشل ضغط ${label}`);

    return null;
  }
} 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!coverFile) {
      alert("❌ Please select a cover image");
      return;
    }

    if (!pdfFile) {
      alert("❌ Please select a PDF file");
      return;
    }

    if (!title.trim()) {
      alert("❌ Please enter the book title");
      return;
    }

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    const formData = new FormData();

    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("pages", pages.toString());

    formData.append("cover", coverFile);
    formData.append("pdf", pdfFile);

    if (preview1) {
      formData.append("preview1", preview1);
    }

    if (preview2) {
      formData.append("preview2", preview2);
    }

    if (preview3) {
      formData.append("preview3", preview3);
    }

    if (preview4) {
      formData.append("preview4", preview4);
    }

    console.log("===== FORMDATA =====");

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          key,
          value.name,
          `${(value.size / 1024).toFixed(0)} KB`
        );
      } else {
        console.log(key, value);
      }
    }

    console.log("========== FILE SIZES ==========");

console.log(
  "Cover:",
  coverFile
    ? `${(coverFile.size / 1024).toFixed(0)} KB`
    : "NONE"
);

console.log(
  "PDF:",
  pdfFile
    ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB`
    : "NONE"
);

console.log(
  "Preview 1:",
  preview1
    ? `${(preview1.size / 1024).toFixed(0)} KB`
    : "NONE"
);

console.log(
  "Preview 2:",
  preview2
    ? `${(preview2.size / 1024).toFixed(0)} KB`
    : "NONE"
);

console.log(
  "Preview 3:",
  preview3
    ? `${(preview3.size / 1024).toFixed(0)} KB`
    : "NONE"
);

console.log(
  "Preview 4:",
  preview4
    ? `${(preview4.size / 1024).toFixed(0)} KB`
    : "NONE"
);

console.log("================================");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      console.log(
  "🔥 API RESPONSE =",
  JSON.stringify(data, null, 2)
);

      if (response.ok) {
        alert("✅ Book added successfully");

        setTitle("");
        setDescription("");
        setCategory("Education");
        setPages(15);

        setCoverFile(null);
        setPdfFile(null);

        setPreview1(null);
        setPreview2(null);
        setPreview3(null);
        setPreview4(null);

        setCoverPreview(null);
      } else {
        console.error(
  "🔥 ADD BOOK ERROR =",
  JSON.stringify(data, null, 2)
);

        alert(
          `❌ Failed to add book\n${
            data?.error || "Unknown server error"
          }`
        );
      }
    } catch (error) {
      console.error("FETCH ERROR =", error);

      alert("❌ Could not connect to the server");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
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
          {/* BOOK PREVIEW */}
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

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg space-y-6"
          >
            {/* TITLE */}
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

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 font-semibold">
                📝 Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                placeholder="Book description..."
                required
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-2 font-semibold">
                📂 Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              >
                <option>Education</option>
                <option>Story</option>
                <option>Animals</option>
                <option>Activity</option>
                <option>Coloring</option>
              </select>
            </div>

            {/* PAGES */}
            <div>
              <label className="block mb-2 font-semibold">
                📄 Pages
              </label>

              <input
                type="number"
                value={pages}
                onChange={(e) =>
                  setPages(Number(e.target.value))
                }
                className="w-full border rounded-lg p-3"
                min={1}
              />
            </div>

            {/* COVER */}
            <div>
              <label className="block mb-2 font-semibold">
                🖼️ Cover Image
              </label>

              <input
  type="file"
  accept="image/*"
  className="w-full border rounded-lg p-3"
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressed = await compressImage(
      file,
      "Cover"
    );

    if (!compressed) return;

    setCoverFile(compressed);

    setCoverPreview(
      URL.createObjectURL(compressed)
    );
  }}
/>
            </div>

            {/* PDF */}
            <div>
              <label className="block mb-2 font-semibold">
                📄 PDF File
              </label>

              <input
                type="file"
                accept=".pdf"
                className="w-full border rounded-lg p-3"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setPdfFile(file);
                  }
                }}
              />
            </div>

            {/* PREVIEW 1 */}
            <div>
              <label className="block mb-2 font-semibold">
                🖼️ Preview Page 1
              </label>

              <input
  type="file"
  accept="image/*"
  className="w-full border rounded-lg p-3"
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressed = await compressImage(
      file,
      "Preview 1"
    );

    if (!compressed) return;

    setPreview1(compressed);
  }}
/>
            </div>

            {/* PREVIEW 2 */}
            <div>
              <label className="block mb-2 font-semibold">
                🖼️ Preview Page 2
              </label>

             <input
  type="file"
  accept="image/*"
  className="w-full border rounded-lg p-3"
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressed = await compressImage(
      file,
      "Preview 2"
    );

    if (!compressed) return;

    setPreview2(compressed);
  }}
/>
            </div>

            {/* PREVIEW 3 */}
            <div>
              <label className="block mb-2 font-semibold">
                🖼️ Preview Page 3
              </label>

              <input
  type="file"
  accept="image/*"
  className="w-full border rounded-lg p-3"
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressed = await compressImage(
      file,
      "Preview 3"
    );

    if (!compressed) return;

    setPreview3(compressed);
  }}
/>
            </div>

            {/* PREVIEW 4 */}
            <div>
              <label className="block mb-2 font-semibold">
                🖼️ Preview Page 4
              </label>

             <input
  type="file"
  accept="image/*"
  className="w-full border rounded-lg p-3"
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const compressed = await compressImage(
      file,
      "Preview 4"
    );

    if (!compressed) return;

    setPreview4(compressed);
  }}
/>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              ➕ Add Book
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}