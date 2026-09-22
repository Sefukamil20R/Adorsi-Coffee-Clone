"use client";

import { parsePriceValue, useCart } from "../cart/CartContext";

type MenuCardProps = {
  title: string;
  price: string;
  description: string;
  tags: string[];
  cartId?: string;
  highlighted?: boolean;
};

export default function MenuCard({
  title,
  price,
  description,
  tags,
  cartId,
  highlighted = false,
}: MenuCardProps) {
  const { addToCart } = useCart();

  const handleAddToOrder = () => {
    addToCart({
      id: cartId ?? title.toLowerCase().replace(/\s+/g, "-"),
      title,
      price,
      priceValue: parsePriceValue(price),
    });
  };

  return (
    <div
      className={`flex h-full flex-col bg-[#283347] px-7 py-6 last:border-r-0 ${
        highlighted
          ? "shadow-[inset_0_0_0_2px_var(--gold)]"
          : "border-r border-white/10"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-heading text-[24px] leading-snug text-white">
          {title}
        </h3>

        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#3E424B] px-3 py-1">
          <span className="text-[11px] font-normal text-[var(--gold)]">
            {price}
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-white/50"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mb-6 flex-1 text-[14px] leading-7 text-[#C7CFD8]">
        {description}
      </p>

      <button
        type="button"
        onClick={handleAddToOrder}
        className="flex w-fit items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-[14px] font-medium text-[var(--blue-black)] transition hover:opacity-90"
      >
        <span className="text-lg leading-none">+</span>
        Add to order
      </button>
    </div>
  );
}
