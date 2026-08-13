"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imageCompression from "browser-image-compression";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
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

async function uploadDirect(
  bucket: "covers" | "books" | "previews",
  file: File,
  path: string
) {
  console.log("🔥 REQUEST SIGNED URL:", bucket, path);

  const response = await fetch("/api/books/upload-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bucket,
      path,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error || "Failed to create upload URL"
    );
  }

  console.log(
    "🔥 UPLOADING DIRECTLY TO SUPABASE:",
    bucket,
    path
  );

  const { error } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(
      path,
      data.token,
      file
    );

  if (error) {
    console.error(
      "🔥 SUPABASE DIRECT UPLOAD ERROR:",
      error
    );

    throw error;
  }

  console.log(
    "✅ SUPABASE UPLOAD SUCCESS:",
    bucket,
    path
  );

  if (
    bucket === "covers" ||
    bucket === "previews"
  ) {
    const { data: publicData } =
      supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return publicData.publicUrl;
  }

  return path;
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
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

  if (!slug) {
    alert("❌ Invalid book title");
    return;
  }

  try {
    console.log("================================");
    console.log("🔥 START DIRECT BOOK UPLOAD");
    console.log("Slug:", slug);
    console.log("================================");

    // =========================
    // COVER
    // =========================

    console.log("🔥 START COVER UPLOAD");

    const coverPath = `${slug}/cover.webp`;

    const coverUrl = await uploadDirect(
      "covers",
      coverFile,
      coverPath
    );

    console.log(
      "✅ COVER URL:",
      coverUrl
    );

    // =========================
    // PDF
    // =========================

    console.log("🔥 START PDF UPLOAD");

    console.log(
      "PDF size:",
      (pdfFile.size / 1024 / 1024).toFixed(2),
      "MB"
    );

    const pdfPath = `${slug}/book.pdf`;

    await uploadDirect(
      "books",
      pdfFile,
      pdfPath
    );

    console.log(
      "✅ PDF UPLOAD SUCCESS:",
      pdfPath
    );

    // =========================
    // PREVIEWS
    // =========================

    let preview1Url: string | null = null;
    let preview2Url: string | null = null;
    let preview3Url: string | null = null;
    let preview4Url: string | null = null;

    if (preview1) {
      console.log(
        "🔥 START PREVIEW 1 UPLOAD"
      );

      preview1Url = await uploadDirect(
        "previews",
        preview1,
        `${slug}/preview1.jpg`
      );
    }

    if (preview2) {
      console.log(
        "🔥 START PREVIEW 2 UPLOAD"
      );

      preview2Url = await uploadDirect(
        "previews",
        preview2,
        `${slug}/preview2.jpg`
      );
    }

    if (preview3) {
      console.log(
        "🔥 START PREVIEW 3 UPLOAD"
      );

      preview3Url = await uploadDirect(
        "previews",
        preview3,
        `${slug}/preview3.jpg`
      );
    }

    if (preview4) {
      console.log(
        "🔥 START PREVIEW 4 UPLOAD"
      );

      preview4Url = await uploadDirect(
        "previews",
        preview4,
        `${slug}/preview4.jpg`
      );
    }

    // =========================
    // DATABASE
    // =========================

    console.log(
      "🔥 START DATABASE CREATE"
    );

    const response = await fetch(
      "/api/books",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          slug,
          title,
          description,
          category,
          pages,

          cover: coverUrl,
          pdf: pdfPath,

          preview1: preview1Url,
          preview2: preview2Url,
          preview3: preview3Url,
          preview4: preview4Url,
        }),
      }
    );

    const data = await response
      .json()
      .catch(() => null);

    console.log(
      "🔥 DATABASE RESPONSE:",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    if (!response.ok) {
      throw new Error(
        data?.error ||
          "Failed to create book"
      );
    }

    // =========================
    // SUCCESS
    // =========================

    console.log(
      "🎉 BOOK CREATED SUCCESSFULLY"
    );

    alert(
      "✅ Book added successfully"
    );

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

  } catch (error) {
    console.error(
      "🔥 ADD BOOK ERROR:",
      error
    );

    alert(
      `❌ Failed to add book\n${
        error instanceof Error
          ? error.message
          : "Unknown error"
      }`
    );
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