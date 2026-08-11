import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("CURRENT SLUG =", slug);

  const book = await prisma.book.findUnique({
    where: {
      slug,
    },
  });

  if (!book) {
    console.log("BOOK NOT FOUND");
    notFound();
  }

console.log("===== BOOK PREVIEWS =====");
console.log("PREVIEW 1 =", book.preview1);
console.log("PREVIEW 2 =", book.preview2);
console.log("PREVIEW 3 =", book.preview3);
console.log("PREVIEW 4 =", book.preview4);
console.log("=========================");


  let previews: string[] = [];

  // النظام الجديد (preview1..preview4 من قاعدة البيانات)
  if (
    book.preview1 ||
    book.preview2 ||
    book.preview3 ||
    book.preview4
  ) {
    previews = [
      book.preview1,
      book.preview2,
      book.preview3,
      book.preview4,
    ].filter(Boolean) as string[];

    console.log("DB PREVIEWS =", previews);
  }

  // النظام القديم (public/preview/slug)
  else {
    const previewFolder = path.join(
      process.cwd(),
      "public",
      "preview",
      slug
    );

    console.log("PREVIEW FOLDER =", previewFolder);

    console.log(
      "FOLDER EXISTS =",
      fs.existsSync(previewFolder)
    );

    if (fs.existsSync(previewFolder)) {
      const files = fs.readdirSync(previewFolder);

      console.log("FILES =", files);

      previews = files
        .sort()
        .map(
          (file) => `/preview/${slug}/${file}`
        );
    }
  }

  console.log("FINAL PREVIEWS =", previews);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Link
        href={`/book/${book.slug}`}
        className="inline-block mb-6 text-sky-600 hover:text-sky-800 font-medium"
      >
        ← Back
      </Link>

      <h1 className="mb-8 text-center text-3xl font-bold">
        {book.title}
      </h1>

      <div className="flex flex-col gap-4">
        {previews.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Preview ${index + 1}`}
            width={1200}
            height={1700}
            unoptimized
            className="w-full h-auto rounded-lg shadow"
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href={`/read-full/${book.slug}`}
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          ⭐ أكمل القراءة بالاشتراك
        </Link>
      </div>
    </main>
  );
}