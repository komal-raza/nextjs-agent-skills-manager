import { clearAuthCookie } from "@/lib/auth";
import {  NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Log out successfully" });
    clearAuthCookie(response);
    return response;
  } catch (error) {
    console.error(error, " Logout Error");
    NextResponse.json({ error: "Inernal Server error" }, { status: 500 });
  }
}
