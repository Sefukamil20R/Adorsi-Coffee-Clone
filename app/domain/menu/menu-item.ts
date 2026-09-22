export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  tag: string | null;
  description: string | null;
};

export const MENU_CATEGORIES = [
  "Signature",
  "Filter Coffee",
  "Black Coffee",
  "Milk Coffee",
  "Non-Coffee",
  "Cold & Shakes",
  "Fasting",
  "Tea & Refreshments",
  "Breakfast",
  "Snacks",
  "Salads",
  "Pastry",
  "Juice",
  "Extras",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export const MENU_TAGS = ["Signature", "New", "Seasonal", "Fasting"] as const;

export type MenuTag = (typeof MENU_TAGS)[number];

export type MenuPriceFilter =
  | "all"
  | "under-200"
  | "200-500"
  | "500-1000"
  | "over-1000";

export type MenuSort =
  | "category"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

export type MenuQuery = {
  search?: string;
  category?: string;
  tag?: string;
  price?: MenuPriceFilter;
  sort?: MenuSort;
};

export type MenuListResult = {
  items: MenuItem[];
  total: number;
};

export function menuItemTags(item: MenuItem): string[] {
  if (item.tag) {
    return [item.category, item.tag];
  }
  return [item.category];
}

export function formatMenuPrice(price: number): string {
  return `${price} ETB`;
}
