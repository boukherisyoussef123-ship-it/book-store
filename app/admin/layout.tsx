import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.publicMetadata?.role !== "admin") {
  redirect("/");
}

  console.log("===== ADMIN DEBUG =====");
  console.log("USER ID:", user.id);
  console.log(
    "USER EMAIL:",
    user.primaryEmailAddress?.emailAddress
  );
  console.log("PUBLIC METADATA:", user.publicMetadata);
  console.log("======================");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-6">
        <h1 className="mb-6 text-xl font-bold">
          📚 Book Store
        </h1>

        <nav className="space-y-2">
          <Link href="/admin" className="block">
            Dashboard
          </Link>

          <Link href="/admin/books" className="block">
            Books
          </Link>

          <Link href="/admin/categories" className="block">
            Categories
          </Link>

          <Link href="/admin/orders" className="block">
            Orders
          </Link>

          <Link href="/admin/users" className="block">
            Users
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="mb-6 flex justify-end gap-3">
          <UserButton />
          <SignOutButton />
        </div>

        {children}
      </main>
    </div>
  );
}