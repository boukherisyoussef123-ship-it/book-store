import { PrismaClient } from "@prisma/client";
import { books } from "../app/library/books";

const prisma = new PrismaClient();

async function main() {
  for (const book of books) {
    await prisma.book.upsert({
      where: {
        slug: book.slug,
      },
      update: {folder: book.folder},
      create: {
        slug: book.slug,
        title: book.title,
        cover: book.cover,
        pdf: book.pdf,
        description: book.description,
        category: book.category,
        pages: book.pages,
        folder: book.folder,
      },
    });
  }

  console.log("✅ All books imported");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });