import { menuRepository } from "@/data/menu/menu-repository";
import type {
  MenuPriceFilter,
  MenuQuery,
  MenuSort,
} from "@/domain/menu/menu-item";
import { NextRequest, NextResponse } from "next/server";

function parseQuery(request: NextRequest): MenuQuery {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const price = (searchParams.get("price") ?? "all") as MenuPriceFilter;
  const sort = (searchParams.get("sort") ?? "category") as MenuSort;

  return {
    search: search || undefined,
    category: category && category !== "all" ? category : undefined,
    tag: tag && tag !== "all" ? tag : undefined,
    price,
    sort,
  };
}

export async function GET(request: NextRequest) {
  try {
    const query = parseQuery(request);
    const result = await menuRepository.list(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/menu]", error);
    return NextResponse.json(
      { error: "Failed to load menu items" },
      { status: 500 },
    );
  }
}
