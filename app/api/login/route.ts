import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("BODY =", body);

  const { email, password } = body;

  console.log("EMAIL =", email);
  console.log("PASSWORD =", password);

  if (
    email === "admin@bookstore.com" &&
    password === "123456"
  ) {
    console.log("LOGIN OK");

    return NextResponse.json({
      success: true,
    });
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