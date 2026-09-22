"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import MenuCard from "@/components/menu/MenuCard";
import MenuFilterDropdown from "@/components/menu/MenuFilterDropdown";
import {
  MENU_CATEGORIES,
  MENU_TAGS,
  formatMenuPrice,
  menuItemTags,
  type MenuItem,
  type MenuPriceFilter,
  type MenuSort,
} from "@/domain/menu/menu-item";
import { fetchMenuItems } from "@/presentation/menu/menu-api";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  ...MENU_CATEGORIES.map((c) => ({ value: c, label: c })),
];

const TAG_OPTIONS = [
  { value: "all", label: "All tags" },
  ...MENU_TAGS.map((t) => ({ value: t, label: t })),
];

const PRICE_OPTIONS: { value: MenuPriceFilter; label: string }[] = [
  { value: "all", label: "All prices" },
  { value: "under-200", label: "Under 200 ETB" },
  { value: "200-500", label: "200 ETB - 500 ETB" },
  { value: "500-1000", label: "500 - 1000 ETB" },
  { value: "over-1000", label: "1000 + ETB" },
];

const SORT_OPTIONS: { value: MenuSort; label: string }[] = [
  { value: "name-asc", label: "Sort A-Z" },
  { value: "name-desc", label: "Sort Z-A" },
  { value: "price-asc", label: "Sort price low" },
  { value: "price-desc", label: "Sort price high" },
];

type OpenDropdown = "category" | "tag" | "price" | "sort" | null;

export default function MenuBrowser() {
  const searchParams = useSearchParams();
  const deepLinkItemId = searchParams.get("item");
  const resetForDeepLinkRef = useRef(false);
  const scrolledToItemRef = useRef<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [price, setPrice] = useState<MenuPriceFilter>("all");
  const [sort, setSort] = useState<MenuSort>("name-asc");
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchMenuItems({
        search,
        category,
        tag,
        price,
        sort,
      });
      setItems(result.items);
      setTotal(result.total);
    } catch {
      setError("Could not load menu items.");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [search, category, tag, price, sort]);

  useEffect(() => {
    const t = window.setTimeout(load, search ? 200 : 0);
    return () => window.clearTimeout(t);
  }, [load, search]);

  useEffect(() => {
    if (!deepLinkItemId || loading) return;

    const found = items.some((item) => item.id === deepLinkItemId);
    if (!found && !resetForDeepLinkRef.current) {
      resetForDeepLinkRef.current = true;
      setSearch("");
      setCategory("all");
      setTag("all");
      setPrice("all");
      setSort("name-asc");
      return;
    }

    if (!found) return;
    if (scrolledToItemRef.current === deepLinkItemId) return;

    const target = document.getElementById(`menu-item-${deepLinkItemId}`);
    if (!target) return;

    scrolledToItemRef.current = deepLinkItemId;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [deepLinkItemId, items, loading]);

  return (
    <>
      <div className="mt-[68px] flex flex-col gap-3 xl:flex-row max-md:mt-10 max-md:gap-2">
        <div className="flex h-[53px] min-w-0 flex-1 items-center rounded-full border border-[#435068] bg-[#283347] px-[19px] max-xl:flex-none max-md:h-[44px] max-md:px-[16px]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-[14px] shrink-0 text-[#8995A9]"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M16.5 16.5L21 21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drinks, food, categories..."
            className="min-w-0 flex-1 truncate bg-transparent font-inter text-[15px] text-[#F2F0EA] outline-none placeholder:text-[#8995A9] max-md:text-[14px]"
            aria-label="Search menu"
          />
        </div>

        <MenuFilterDropdown
          id="menu-filter-category"
          ariaLabel="Filter by category"
          value={category}
          options={CATEGORY_OPTIONS}
          onChange={setCategory}
          isOpen={openDropdown === "category"}
          onOpenChange={(open) => setOpenDropdown(open ? "category" : null)}
          shellClassName="min-w-[195px] max-md:w-full max-md:min-w-0"
        />

        <MenuFilterDropdown
          id="menu-filter-tag"
          ariaLabel="Filter by tag"
          value={tag}
          options={TAG_OPTIONS}
          onChange={setTag}
          isOpen={openDropdown === "tag"}
          onOpenChange={(open) => setOpenDropdown(open ? "tag" : null)}
          shellClassName="min-w-[160px] max-md:w-full max-md:min-w-0"
        />

        <MenuFilterDropdown
          id="menu-filter-price"
          ariaLabel="Filter by price"
          value={price}
          options={PRICE_OPTIONS}
          onChange={(v) => setPrice(v as MenuPriceFilter)}
          isOpen={openDropdown === "price"}
          onOpenChange={(open) => setOpenDropdown(open ? "price" : null)}
          shellClassName="min-w-[170px] max-md:w-full max-md:min-w-0"
        />

        <MenuFilterDropdown
          id="menu-filter-sort"
          ariaLabel="Sort menu"
          value={sort}
          options={SORT_OPTIONS}
          onChange={(v) => setSort(v as MenuSort)}
          isOpen={openDropdown === "sort"}
          onOpenChange={(open) => setOpenDropdown(open ? "sort" : null)}
          shellClassName="min-w-[195px] max-md:w-full max-md:min-w-0"
          lead={
            <span
              className="shrink-0 text-[19px] text-[#8995A9] max-md:text-[17px]"
              aria-hidden="true"
            >
              ↕
            </span>
          }
        />
      </div>

      <p className="mt-[45px] font-inter text-[15px] text-[#8995A9] max-md:mt-8">
        {loading ? "…" : `${total} item${total === 1 ? "" : "s"}`}
      </p>

      {error ? (
        <p className="mt-8 font-inter text-[15px] text-[#C7CFD8]">{error}</p>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <p className="mt-8 font-inter text-[15px] text-[#8995A9]">
          No items match your filters.
        </p>
      ) : null}

      <div
        className="
    mt-[36px]
    grid
    grid-cols-1
    gap-px
    overflow-hidden
    bg-[rgba(184,154,103,0.20)]
    md:grid-cols-2
    lg:grid-cols-3
    [&>div]:!border-r-0
    max-md:mt-7
  "
      >
        {!loading &&
          items.map((item) => (
            <div key={item.id} id={`menu-item-${item.id}`}>
              <MenuCard
                cartId={item.id}
                title={item.name}
                price={formatMenuPrice(item.price)}
                description={item.description ?? ""}
                tags={menuItemTags(item)}
                highlighted={
                  deepLinkItemId != null && item.id === deepLinkItemId
                }
              />
            </div>
          ))}
      </div>
    </>
  );
}
