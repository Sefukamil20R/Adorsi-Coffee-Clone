import type { MenuItem, MenuQuery, MenuSort } from "@/domain/menu/menu-item";
import { MENU_CATEGORIES } from "@/domain/menu/menu-item";
import { prisma } from "./prisma-client";
import type { Prisma } from "@prisma/client";

function buildPriceWhere(price: MenuQuery["price"]): Prisma.MenuItemWhereInput | undefined {
  if (!price || price === "all") return undefined;
  switch (price) {
    case "under-200":
      return { price: { lt: 200 } };
    case "200-500":
      return { price: { gte: 200, lte: 500 } };
    case "500-1000":
      return { price: { gte: 500, lte: 1000 } };
    case "over-1000":
      return { price: { gt: 1000 } };
    default:
      return undefined;
  }
}

function buildOrderBy(sort: MenuSort | undefined): Prisma.MenuItemOrderByWithRelationInput[] {
  switch (sort) {
    case "name-asc":
      return [{ name: "asc" }];
    case "name-desc":
      return [{ name: "desc" }];
    case "price-asc":
      return [{ price: "asc" }, { name: "asc" }];
    case "price-desc":
      return [{ price: "desc" }, { name: "asc" }];
    case "category":
    default:
      return [{ category: "asc" }, { name: "asc" }];
  }
}

function mapRow(row: {
  id: string;
  name: string;
  price: number;
  category: string;
  tag: string | null;
  description: string | null;
}): MenuItem {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    category: row.category,
    tag: row.tag,
    description: row.description,
  };
}

export async function findMenuItems(query: MenuQuery): Promise<MenuItem[]> {
  const where: Prisma.MenuItemWhereInput = {};

  if (query.category && query.category !== "all") {
    where.category = query.category;
  }

  if (query.tag && query.tag !== "all") {
    where.tag = query.tag;
  }

  const priceWhere = buildPriceWhere(query.price);
  if (priceWhere) {
    Object.assign(where, priceWhere);
  }

  if (query.search?.trim()) {
    const term = query.search.trim();
    where.OR = [
      { name: { contains: term } },
      { description: { contains: term } },
      { category: { contains: term } },
    ];
  }

  const sort = query.sort ?? "category";

  let items = await prisma.menuItem.findMany({
    where,
    orderBy: sort === "category" ? undefined : buildOrderBy(sort),
  });

  if (sort === "category") {
    const order = new Map(MENU_CATEGORIES.map((c, i) => [c, i]));
    items = [...items].sort((a, b) => {
      const ai =
        order.get(a.category as (typeof MENU_CATEGORIES)[number]) ?? 999;
      const bi =
        order.get(b.category as (typeof MENU_CATEGORIES)[number]) ?? 999;
      if (ai !== bi) return ai - bi;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });
  }

  return items.map(mapRow);
}

export async function countMenuItems(query: MenuQuery): Promise<number> {
  const items = await findMenuItems(query);
  return items.length;
}

export async function findMenuItemsByIds(ids: string[]): Promise<MenuItem[]> {
  if (ids.length === 0) return [];

  const rows = await prisma.menuItem.findMany({
    where: { id: { in: ids } },
  });

  return rows.map(mapRow);
}
