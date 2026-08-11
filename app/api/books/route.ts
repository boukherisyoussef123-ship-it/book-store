import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import {
  uploadPublicFile,
  uploadPrivateFile,
} from "@/lib/storage";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// =========================
// GET ALL BOOKS
// =========================
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("🔥 GET BOOKS ERROR FULL:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}

// =========================
// ADD BOOK
// =========================
export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (user.publicMetadata?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    console.log("🔥 ADMIN AUTHORIZED:", user.id);
    console.log("🔥 FORM DATA RECEIVED");

    const formData = await req.formData();

    // =========================
    // TEXT DATA
    // =========================

    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const pages = Number(formData.get("pages"));

    console.log("===== BOOK DATA =====");
    console.log("slug:", slug);
    console.log("title:", title);
    console.log("category:", category);
    console.log("pages:", pages);
    console.log("=====================");

    // =========================
    // FILES
    // =========================

    const coverFile = formData.get("cover") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    const preview1File = formData.get("preview1") as File | null;
    const preview2File = formData.get("preview2") as File | null;
    const preview3File = formData.get("preview3") as File | null;
    const preview4File = formData.get("preview4") as File | null;

    console.log("preview1File =", preview1File?.name);
    console.log("preview2File =", preview2File?.name);
    console.log("preview3File =", preview3File?.name);
    console.log("preview4File =", preview4File?.name);

    // =========================
    // VALIDATION
    // =========================

    if (!coverFile) {
      return NextResponse.json(
        { error: "Cover missing" },
        { status: 400 }
      );
    }

    if (!pdfFile) {
      return NextResponse.json(
        { error: "PDF missing" },
        { status: 400 }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title missing" },
        { status: 400 }
      );
    }

    if (!category?.trim()) {
      return NextResponse.json(
        { error: "Category missing" },
        { status: 400 }
      );
    }

    // =========================
    // COVER UPLOAD
    // =========================

    console.log("🔥 START COVER UPLOAD");

    console.log(
      "Cover size:",
      (coverFile.size / 1024).toFixed(0),
      "KB"
    );

    const coverUrl = await uploadPublicFile(
      "covers",
      coverFile,
      `${slug}/cover.webp`
    );

    console.log(
      "🔥 COVER UPLOAD SUCCESS:",
      coverUrl
    );

    // =========================
    // PDF UPLOAD
    // =========================

    const pdfPath = `${slug}/book.pdf`;

    console.log("🔥 START PDF UPLOAD");

    console.log(
      "PDF size:",
      (pdfFile.size / 1024 / 1024).toFixed(2),
      "MB"
    );

    await uploadPrivateFile(
      "books",
      pdfFile,
      pdfPath
    );

    console.log("🔥 PDF UPLOAD SUCCESS");

    // =========================
    // PREVIEWS
    // =========================

    let preview1Path: string | null = null;
    let preview2Path: string | null = null;
    let preview3Path: string | null = null;
    let preview4Path: string | null = null;

    if (preview1File) {
      console.log("🔥 START PREVIEW 1 UPLOAD");

      preview1Path = await uploadPublicFile(
        "previews",
        preview1File,
        `${slug}/preview1.jpg`
      );
    }

    if (preview2File) {
      console.log("🔥 START PREVIEW 2 UPLOAD");

      preview2Path = await uploadPublicFile(
        "previews",
        preview2File,
        `${slug}/preview2.jpg`
      );
    }

    if (preview3File) {
      console.log("🔥 START PREVIEW 3 UPLOAD");

      preview3Path = await uploadPublicFile(
        "previews",
        preview3File,
        `${slug}/preview3.jpg`
      );
    }

    if (preview4File) {
      console.log("🔥 START PREVIEW 4 UPLOAD");

      preview4Path = await uploadPublicFile(
        "previews",
        preview4File,
        `${slug}/preview4.jpg`
      );
    }

    // =========================
    // DATABASE
    // =========================

    console.log("🔥 START DATABASE CREATE");

console.log("===== FINAL PREVIEW PATHS =====");
console.log("preview1Path =", preview1Path);
console.log("preview2Path =", preview2Path);
console.log("preview3Path =", preview3Path);
console.log("preview4Path =", preview4Path);
console.log("==============================");

    const book = await prisma.book.create({
      data: {
        slug,
        title,
        description,
        pages,
        folder: slug,

        cover: coverUrl,
        pdf: pdfPath,

        preview1: preview1Path,
        preview2: preview2Path,
        preview3: preview3Path,
        preview4: preview4Path,

        // IMPORTANT:
        // category is a String in your Prisma schema
        category: category,
      },
    });

    console.log(
      "🔥 DATABASE CREATE SUCCESS:",
      book.id
    );

    return NextResponse.json(book);

  } catch (error) {
    console.error(
      "🔥 POST ERROR FULL:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}