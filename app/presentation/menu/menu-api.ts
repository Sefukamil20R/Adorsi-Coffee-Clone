import type { MenuListResult, MenuQuery } from "@/domain/menu/menu-item";

export function buildMenuSearchParams(query: MenuQuery): string {
  const params = new URLSearchParams();
  if (query.search?.trim()) params.set("search", query.search.trim());
  if (query.category && query.category !== "all") {
    params.set("category", query.category);
  }
  if (query.tag && query.tag !== "all") {
    params.set("tag", query.tag);
  }
  if (query.price && query.price !== "all") {
    params.set("price", query.price);
  }
  if (query.sort) params.set("sort", query.sort);
  return params.toString();
}

export async function fetchMenuItems(
  query: MenuQuery,
  init?: RequestInit,
): Promise<MenuListResult> {
  const qs = buildMenuSearchParams(query);
  const url = qs ? `/api/menu?${qs}` : "/api/menu";
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }
  return res.json() as Promise<MenuListResult>;
}
