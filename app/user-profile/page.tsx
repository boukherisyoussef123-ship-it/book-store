import { auth } from "@clerk/nextjs/server";

export default async function UserProfilePage() {
  const { userId } = await auth();

  return (
    <main className="p-10">
      <h1>User ID</h1>
      <pre>{userId}</pre>
    </main>
  );
}