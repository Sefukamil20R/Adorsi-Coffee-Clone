import { prisma } from "@/data/menu/prisma-client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const menuCount = await prisma.menuItem.count();
    return NextResponse.json({
      ok: true,
      menuCount,
      menuReady: menuCount >= 126,
    });
  } catch (error) {
    console.error("[GET /api/health]", error);
    return NextResponse.json(
      { ok: false, error: "Database unavailable" },
      { status: 503 },
    );
  }
}
