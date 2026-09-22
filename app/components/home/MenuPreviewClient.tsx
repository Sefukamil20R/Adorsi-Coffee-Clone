"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Container from "../common/Container";
import MenuCard from "../menu/MenuCard";
import {
  MENU_CATEGORIES,
  formatMenuPrice,
  menuItemTags,
  type MenuItem,
} from "@/domain/menu/menu-item";
import { fetchMenuItems } from "@/presentation/menu/menu-api";

export default function MenuPreviewClient() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof MENU_CATEGORIES)[number]>("Signature");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (category: string) => {
    setLoading(true);
    try {
      const result = await fetchMenuItems({
        category,
        sort: "name-asc",
      });
      setItems(result.items.slice(0, 3));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(activeCategory);
  }, [activeCategory, load]);

  return (
    <section className="bg-[var(--blue-black)] py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[var(--gold)]" />
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">
                The Menu
              </p>
            </div>

            <h2 className="font-heading text-[52px] leading-[1.12] text-white max-md:text-[40px] max-md:leading-[1.1]">
              Built for ritual.
              <br />
              <span className="text-[var(--gold)]">Ordered with ease.</span>
            </h2>
          </div>

          <div className="flex items-center justify-end">
            <p className="w-full max-w-[360px] text-[15px] leading-7 text-[#C7CFD8] max-md:max-w-full max-md:text-[14px] max-md:leading-6">
              Tap to add. Review your selections in the cart and place your order
              we&apos;ll have it ready when you arrive.{" "}
              <Link
                href="/menu"
                className="text-[var(--gold)] transition-opacity hover:opacity-80"
              >
                Browse the full menu →
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 border-b border-white/10 pb-8">
          {MENU_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveCategory(item)}
              className={`rounded-full px-5 py-3 text-[15px] transition max-md:px-3 max-md:py-2 max-md:text-[13px] ${
                activeCategory === item
                  ? "bg-[var(--gold)] text-[var(--blue-black)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-3">
          {loading
            ? null
            : items.map((item) => (
                <MenuCard
                  key={item.id}
                  cartId={item.id}
                  title={item.name}
                  price={formatMenuPrice(item.price)}
                  tags={menuItemTags(item)}
                  description={item.description ?? ""}
                />
              ))}
        </div>
      </Container>
    </section>
  );
}
