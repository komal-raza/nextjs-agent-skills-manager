import { generateToken, hashPassword, setAuthCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "All Fields are required" },
        { status: 400 },
      );
    }

    const ExistingUser = await prisma.user.findUnique({ where: { email } });

    if (ExistingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);
    const NewUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    //   Generate Token
    const token = generateToken({
      id: NewUser.id,
      email: NewUser.email,
      name: NewUser.name,
    });

    const response = NextResponse.json(
      {
        message: "Login Successful",
        user: { id: NewUser.id, email: NewUser.email, name: NewUser.name },
      },
      { status: 201 },
    );

    setAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
