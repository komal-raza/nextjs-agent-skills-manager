import { generateToken, setAuthCookie, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All Fields are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid email",
        },
        { status: 401 },
      );
    }

    const validatePassword = await verifyPassword(password, user.password);

    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json(
      {
        message: "Login Successful",
        user: { id: user?.id, name: user?.name, email: user?.email },
      },
      { status: 200 },
    );

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
