"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

function CartIconGold({
  className = "h-[18px] w-[18px]",
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-[var(--gold)] ${className}`}
      style={{
        WebkitMask: "url(/logo/cart.svg) no-repeat center / contain",
        mask: "url(/logo/cart.svg) no-repeat center / contain",
      }}
    />
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 15H5C3.895 15 3 14.105 3 13V5C3 3.895 3.895 3 5 3H13C14.105 3 15 3.895 15 5V6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 16V4M12 4L8 8M12 4L16 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16V18C4 19.105 4.895 20 6 20H18C19.105 20 20 19.105 20 18V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DrawerHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-[#2A3344] px-6 py-5 max-md:px-5">
      <div className="flex items-center gap-3">
        <CartIconGold className="h-[18px] w-[18px]" />
        <h2 className="font-heading text-[22px] leading-none text-[#F2F0EA]">
          Your Order
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close cart"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#C7CFD8] transition hover:bg-white/5 hover:text-white"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function EmptyCartBody() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-8 text-center max-md:px-5">
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[14px] border border-[#3D4659]">
        <CartIconGold className="h-10 w-10" />
      </div>
      <p className="mt-8 font-heading text-[26px] leading-tight text-[#F2F0EA]">
        Your cup is empty.
      </p>
      <p className="mt-3 max-w-[240px] font-inter text-[14px] leading-relaxed text-[#8995A9]">
        Add something signature from the menu.
      </p>
    </div>
  );
}

function PaymentCopyField({
  label,
  sublabel,
  value,
}: {
  label: string;
  sublabel: string;
  value: string;
}) {
  const handleCopy = () => {
    void navigator.clipboard?.writeText(value.replace(/\s/g, ""));
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-inter text-[13px] font-medium text-[#F2F0EA]">
          {label}
        </p>
        <p className="font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-[#6B778A]">
          {sublabel}
        </p>
      </div>
      <div className="mt-2 flex h-[44px] items-stretch overflow-hidden rounded-[8px] border border-[#344056] bg-[#151C28]">
        <span className="flex min-w-0 flex-1 items-center px-3 font-inter text-[14px] tracking-wide text-[#F2F0EA]">
          {value}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 border-l border-[#344056] px-3 font-inter text-[12px] font-medium text-[var(--gold)] transition hover:bg-white/[0.03]"
        >
          <CopyIcon />
          Copy
        </button>
      </div>
    </div>
  );
}

function CartWithItemsBody() {
  const {
    items,
    itemCount,
    totalValue,
    updateQuantity,
    removeItem,
  } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "restaurant">(
    "bank",
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 pt-5 max-md:px-5">
      <div className="space-y-6">
        {items.map((item) => {
          const lineTotal = item.priceValue * item.quantity;

          return (
            <div key={item.id} className="border-b border-[#2A3344] pb-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-[20px] leading-tight text-[#F2F0EA]">
                    {item.title}
                  </p>
                  <p className="mt-1 font-inter text-[13px] text-[#8995A9]">
                    {item.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title}`}
                  className="font-inter text-[20px] leading-none text-[#6B778A] transition hover:text-[#F2F0EA]"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="inline-flex items-center overflow-hidden rounded-md border border-[#344056]">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="flex h-9 w-10 items-center justify-center font-inter text-[16px] text-[#C7CFD8] transition hover:bg-white/5"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="flex h-9 min-w-[36px] items-center justify-center border-x border-[#344056] font-inter text-[14px] text-[#F2F0EA]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="flex h-9 w-10 items-center justify-center font-inter text-[16px] text-[#C7CFD8] transition hover:bg-white/5"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="font-inter text-[15px] text-[#F2F0EA]">
                  {lineTotal}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-[#2A3344] pt-6">
        <div className="flex items-end justify-between">
          <p className="pb-0.5 font-inter text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
            Checkout • {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-[30px] leading-none text-[#F2F0EA]">
              {totalValue}
            </span>
            <span className="font-inter text-[13px] text-[#8995A9]">ETB</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            className="h-[44px] rounded-[8px] border border-[#344056] bg-[#151C28] px-3 font-inter text-[14px] text-[#F2F0EA] placeholder:text-[#6B778A] outline-none focus:border-[#435068]"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="h-[44px] rounded-[8px] border border-[#344056] bg-[#151C28] px-3 font-inter text-[14px] text-[#F2F0EA] placeholder:text-[#6B778A] outline-none focus:border-[#435068]"
          />
        </div>

        <div className="mt-4 flex rounded-[10px] border border-[#344056] p-1">
          <button
            type="button"
            onClick={() => setPaymentMethod("bank")}
            className={`h-[40px] flex-1 rounded-[8px] font-inter text-[13px] font-medium transition ${
              paymentMethod === "bank"
                ? "bg-[var(--gold)] text-[#1D2636]"
                : "bg-transparent text-[#C7CFD8]"
            }`}
          >
            Bank transfer
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("restaurant")}
            className={`h-[40px] flex-1 rounded-[8px] font-inter text-[13px] font-medium transition ${
              paymentMethod === "restaurant"
                ? "bg-[var(--gold)] text-[#1D2636]"
                : "bg-transparent text-[#C7CFD8]"
            }`}
          >
            At restaurant
          </button>
        </div>

        {paymentMethod === "bank" && (
          <div className="mt-4 rounded-[10px] border border-[#344056] p-4">
            <p className="font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
              Pay {totalValue} ETB via
            </p>

            <div className="mt-4 space-y-4">
              <PaymentCopyField
                label="CBE Bank Account"
                sublabel="Account number"
                value="1000722771552"
              />
              <PaymentCopyField
                label="Telebirr"
                sublabel="Merchant ID"
                value="528108"
              />
            </div>

            <button
              type="button"
              className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#435068] bg-transparent font-inter text-[13px] text-[#C7CFD8] transition hover:border-[#536075]"
            >
              <UploadIcon />
              Upload receipt screenshot
            </button>

            <button
              type="button"
              className="mt-3 h-[48px] w-full rounded-[10px] bg-[var(--gold)] font-inter text-[14px] font-medium text-[#1D2636] transition hover:opacity-90"
            >
              Submit receipt for approval
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#344056]" />
          <span className="font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B778A]">
            Or pay online
          </span>
          <span className="h-px flex-1 bg-[#344056]" />
        </div>

        <button
          type="button"
          className="mt-4 flex h-[44px] w-full items-center justify-center rounded-[8px] border border-[#344056] bg-[#151C28] font-inter text-[13px] text-[#C7CFD8] transition hover:border-[#435068]"
        >
          Pay Online with Chapa →
        </button>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, items } = useCart();
  const hasItems = items.length > 0;

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/55"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-[#1A2230] shadow-[-8px_0_40px_rgba(0,0,0,0.45)] animate-[slideInRight_0.3s_ease-out] max-md:max-w-none"
      >
        <DrawerHeader onClose={closeDrawer} />
        {hasItems ? <CartWithItemsBody /> : <EmptyCartBody />}
      </aside>
    </div>
  );
}
