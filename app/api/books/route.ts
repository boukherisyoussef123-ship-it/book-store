import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
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
    console.error("🔥 GET BOOKS ERROR:", error);

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
// CREATE BOOK
// =========================
export async function POST(req: Request) {
  try {
    // =========================
    // ADMIN AUTH
    // =========================

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

    // =========================
    // JSON DATA
    // =========================

    const body = await req.json();

    console.log("🔥 BOOK JSON RECEIVED:");
    console.log(body);

    const {
      slug,
      title,
      description,
      category,
      pages,
      cover,
      pdf,
      preview1,
      preview2,
      preview3,
      preview4,
    } = body;

    // =========================
    // VALIDATION
    // =========================

    if (!slug?.trim()) {
      return NextResponse.json(
        { error: "Slug missing" },
        { status: 400 }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title missing" },
        { status: 400 }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { error: "Description missing" },
        { status: 400 }
      );
    }

    if (!category?.trim()) {
      return NextResponse.json(
        { error: "Category missing" },
        { status: 400 }
      );
    }

    if (!pages || Number(pages) < 1) {
      return NextResponse.json(
        { error: "Invalid pages" },
        { status: 400 }
      );
    }

    if (!cover) {
      return NextResponse.json(
        { error: "Cover URL missing" },
        { status: 400 }
      );
    }

    if (!pdf) {
      return NextResponse.json(
        { error: "PDF path missing" },
        { status: 400 }
      );
    }

    // =========================
    // LOG FILE PATHS
    // =========================

    console.log("===== FINAL BOOK DATA =====");

    console.log("slug:", slug);
    console.log("title:", title);
    console.log("category:", category);
    console.log("pages:", pages);

    console.log("cover:", cover);
    console.log("pdf:", pdf);

    console.log("preview1:", preview1);
    console.log("preview2:", preview2);
    console.log("preview3:", preview3);
    console.log("preview4:", preview4);

    console.log("===========================");

    // =========================
    // CREATE DATABASE RECORD
    // =========================

    console.log("🔥 START DATABASE CREATE");

    const book = await prisma.book.create({
      data: {
        slug,
        title,
        description,
        category,
        pages: Number(pages),

        folder: slug,

        cover,
        pdf,

        preview1: preview1 || null,
        preview2: preview2 || null,
        preview3: preview3 || null,
        preview4: preview4 || null,
      },
    });

    console.log(
      "🎉 DATABASE CREATE SUCCESS:",
      book.id
    );

    // =========================
    // RESPONSE
    // =========================

    return NextResponse.json(book, {
      status: 201,
    });

  } catch (error) {
    console.error(
      "🔥 CREATE BOOK ERROR FULL:",
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