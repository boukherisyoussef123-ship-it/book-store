import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

    if (
   email === process.env.ADMIN_EMAIL &&
  password === process.env.ADMIN_PASSWORD
  ) {
    console.log("LOGIN OK");

    const response = NextResponse.json({
  success: true,
});

response.cookies.set("admin_token", "logged", {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
  path: "/",
  maxAge: 60 * 60 * 24,
});

return response;

  }

  console.log("LOGIN FAILED");

  return NextResponse.json(
    {
      success: false,
    },
    {
      status: 401,
    }
  );
}