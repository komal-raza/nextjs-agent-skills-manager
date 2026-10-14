import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const skillId = parseInt(id);

    if (isNaN(skillId)) {
      return NextResponse.json(
        {
          error: "Invalid Skill ID",
        },
        { status: 400 },
      );
    }

    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized Request" },
        { status: 401 },
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
      select: {
        id: true,
        name: true,
        description: true,
        content:true,
        isPublic: true,
        createdAt: true,
        authorId: true,
        updatedAt: true,
      },
    });
    if (!skill) {
      return NextResponse.json({ error: "Skill Not Found" }, { status: 404 });
    }

    if (skill.authorId !== payload.userId) {
      return NextResponse.json(
        { error: "Not authorized to edit this skill" },
        { status: 403 },
      );
    }

    return NextResponse.json({ skill });
  } catch (error) {
    console.error("Error Getting user skills", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
