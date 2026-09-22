"use client";

import { useCart } from "./CartContext";

function CheckIcon() {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-black">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function CartSnackbar() {
  const { snackbar, viewCartFromSnackbar, dismissSnackbar } = useCart();

  if (!snackbar) return null;

  if (snackbar.kind === "receipt-submitted") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed z-[70] flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] max-md:inset-x-4 max-md:bottom-4 md:bottom-6 md:left-1/2 md:max-w-[min(520px,calc(100vw-3rem))] md:-translate-x-1/2"
      >
        <CheckIcon />
        <p className="min-w-0 flex-1 font-inter text-[14px] font-medium text-black">
          Receipt submitted! We&apos;ll confirm your order once verified.
        </p>
        <button
          type="button"
          onClick={dismissSnackbar}
          aria-label="Dismiss notification"
          className="shrink-0 font-inter text-[18px] leading-none text-black/50 transition hover:text-black"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-[70] flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] max-md:inset-x-4 max-md:bottom-4 max-md:justify-between md:bottom-6 md:right-6 md:min-w-[320px]"
    >
      <CheckIcon />
      <p className="min-w-0 flex-1 font-inter text-[14px] font-medium text-black">
        {snackbar.productName} added
      </p>
      <button
        type="button"
        onClick={viewCartFromSnackbar}
        className="shrink-0 rounded-md bg-black px-3 py-2 font-inter text-[13px] font-medium text-white transition hover:opacity-90"
      >
        View cart
      </button>
    </div>
  );
}
