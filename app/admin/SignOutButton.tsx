"use client";

import { useClerk } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut({ redirectUrl: "/sign-in" })}
      className="rounded bg-red-600 px-4 py-2 text-white"
    >
      تسجيل الخروج
    </button>
  );
}