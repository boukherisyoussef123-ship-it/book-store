import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

// =========================
// SEO لكل كتاب
// =========================

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const book = await prisma.book.findUnique({
    where: {
      slug,
    },
  });

  if (!book) {
    return {
      title: "Book Not Found | Book Store",
      description: "The requested book could not be found.",
    };
  }

  return {
    title: book.title,
    description: book.description,

    keywords: [
      book.title,
      "kids books",
      "children books",
      "digital library",
      "educational books",
      "kids stories",
    ],

    openGraph: {
      title: book.title,
      description: book.description,
      type: "book",
      images: book.cover
        ? [
            {
              url: book.cover,
              width: 400,
              height: 600,
              alt: book.title,
            },
          ]
        : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// =========================
// BOOK PAGE
// =========================

export default async function BookPage({
  params,
}: Props) {
  const { slug } = await params;

  console.log("================================");
  console.log("BOOK SLUG =", slug);
  console.log("================================");

  const book = await prisma.book.findUnique({
    where: {
      slug,
    },
  });

  console.log("BOOK =", book);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">

        <Link
          href="/library"
          className="inline-block mb-6 text-sky-600 hover:text-sky-800 font-medium"
        >
          ← Back to Library
        </Link>

        <div className="grid md:grid-cols-[420px_1fr] gap-10">

          {/* ========================= */}
          {/* COVER + PREVIEWS */}
          {/* ========================= */}

          <div className="bg-white rounded-xl shadow-lg p-5">

            {/* COVER */}

            <div className="w-full flex justify-center">
              <Image
                src={book.cover}
                alt={book.title}
                width={400}
                height={600}
                unoptimized
                className="w-full max-w-[400px] h-auto object-cover rounded-lg shadow"
              />
            </div>

            {/* PREVIEW THUMBNAILS */}

            <div className="mt-5">
              <h3 className="font-bold mb-3">
                🖼️ صفحات المعاينة
              </h3>

              <div className="grid grid-cols-4 gap-2">

                {book.preview1 && (
                  <Image
                    src={book.preview1}
                    alt={`${book.title} Preview 1`}
                    width={100}
                    height={140}
                    unoptimized
                    className="w-full h-32 object-cover rounded-lg border shadow-sm"
                  />
                )}

                {book.preview2 && (
                  <Image
                    src={book.preview2}
                    alt={`${book.title} Preview 2`}
                    width={100}
                    height={140}
                    unoptimized
                    className="w-full h-32 object-cover rounded-lg border shadow-sm"
                  />
                )}

                {book.preview3 && (
                  <Image
                    src={book.preview3}
                    alt={`${book.title} Preview 3`}
                    width={100}
                    height={140}
                    unoptimized
                    className="w-full h-32 object-cover rounded-lg border shadow-sm"
                  />
                )}

                {book.preview4 && (
                  <Image
                    src={book.preview4}
                    alt={`${book.title} Preview 4`}
                    width={100}
                    height={140}
                    unoptimized
                    className="w-full h-32 object-cover rounded-lg border shadow-sm"
                  />
                )}

              </div>
            </div>

          </div>

          {/* ========================= */}
          {/* BOOK INFORMATION */}
          {/* ========================= */}

          <div>

            <h1 className="text-4xl font-bold mb-4">
              {book.title}
            </h1>

            <p className="text-gray-600 mb-8">
              {book.description}
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                href={`/read/${book.slug}`}
                className="border px-6 py-3 rounded-lg hover:bg-gray-100"
              >
                📖 معاينة مجانية
              </Link>

              <Link
                href={`/read-full/${book.slug}`}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                ⭐ قراءة كاملة للمشتركين
              </Link>

            </div>

            <div className="mt-8 p-4 bg-yellow-50 border rounded-lg">

              <h3 className="font-bold mb-2">
                ماذا ستحصل عليه؟
              </h3>

              <ul className="space-y-2 text-gray-700">
                <li>✅ معاينة مجانية قبل القراءة</li>
                <li>✅ قراءة الكتاب كاملاً بصيغة PDF</li>
                <li>✅ وصول فوري لجميع الكتب المشتركة</li>
              </ul>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}