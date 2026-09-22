"use client";

import { useEffect, useRef, useState } from "react";
import {
  isValidCustomerName,
  isValidEthiopianPhone,
} from "@/domain/payment/customer";
import { initializeChapaCheckout } from "@/presentation/payment/chapa-api";
import { useCart } from "./CartContext";

const CBE_ACCOUNT = "1000722771552";
const TELEBIRR_MERCHANT_ID = "528108";

const RECEIPT_ACCEPT = "image/jpeg,image/jpg,image/png,image/webp";

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
    <div className="flex items-center justify-between border-b border-[#2A3344] px-6 py-4 max-md:px-5">
      <div className="flex items-center gap-2.5">
        <CartIconGold className="h-[16px] w-[16px]" />
        <h2 className="font-heading text-[19px] leading-none text-[#F2F0EA]">
          Your Order
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close cart"
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#C7CFD8] transition hover:bg-white/5 hover:text-white"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function DrawerReceiptSnackbar() {
  const { snackbar, dismissSnackbar } = useCart();

  if (snackbar?.kind !== "receipt-submitted") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-x-4 bottom-4 z-10 flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] max-md:inset-x-4"
    >
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
      <p className="min-w-0 flex-1 font-inter text-[13px] font-medium leading-snug text-black">
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

function EmptyCartBody() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-md:px-5">
      <CartIconGold className="h-10 w-10" />
      <p className="mt-6 font-heading text-[22px] leading-tight text-[#F2F0EA]">
        Your cup is empty.
      </p>
      <p className="mt-2 max-w-[240px] font-inter text-[13px] leading-relaxed text-[#8995A9]">
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
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-inter text-[12px] font-medium text-[#F2F0EA]">
          {label}
        </p>
        <p className="font-inter text-[8px] font-medium uppercase tracking-[0.14em] text-[#6B778A]">
          {sublabel}
        </p>
      </div>
      <div className="mt-1.5 flex h-[40px] items-stretch overflow-hidden rounded-[8px] border border-[#344056] bg-[#151C28]">
        <span className="flex min-w-0 flex-1 items-center px-3 font-inter text-[13px] tracking-wide text-[#F2F0EA]">
          {value}
        </span>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className="flex shrink-0 items-center gap-1.5 border-l border-[#344056] px-3 font-inter text-[11px] font-medium text-[var(--gold)] transition hover:bg-white/[0.03]"
        >
          <CopyIcon />
          {copied ? "Copied" : "Copy"}
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
    clearCart,
    completeReceiptSubmission,
  } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "restaurant">(
    "bank",
  );
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState<string | null>(
    null,
  );
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneFormatError, setPhoneFormatError] = useState(false);
  const [receiptError, setReceiptError] = useState(false);
  const [chapaLoading, setChapaLoading] = useState(false);
  const [chapaError, setChapaError] = useState<string | null>(null);
  const [chapaValidationMessage, setChapaValidationMessage] = useState<
    string | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const chapaButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(
    () => () => {
      if (receiptPreviewUrl) URL.revokeObjectURL(receiptPreviewUrl);
    },
    [receiptPreviewUrl],
  );

  const openReceiptPicker = () => {
    fileInputRef.current?.click();
  };

  const handleReceiptSelected = (file: File | undefined) => {
    if (!file) return;

    const isImage =
      file.type.startsWith("image/") &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/webp");

    if (!isImage) return;

    if (receiptPreviewUrl) URL.revokeObjectURL(receiptPreviewUrl);
    setReceiptFile(file);
    setReceiptPreviewUrl(URL.createObjectURL(file));
    setReceiptError(false);
  };

  const handleSubmitReceipt = () => {
    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    let valid = true;

    if (!receiptFile) {
      setReceiptError(true);
      valid = false;
    }

    if (!trimmedName) {
      setNameError(true);
      valid = false;
    }

    if (!trimmedPhone) {
      setPhoneError(true);
      valid = false;
    }

    if (!valid) {
      if (!trimmedName) nameInputRef.current?.focus();
      return;
    }

    if (receiptPreviewUrl) URL.revokeObjectURL(receiptPreviewUrl);
    completeReceiptSubmission();
  };

  const handlePlaceRestaurantOrder = () => {
    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    let valid = true;

    if (!trimmedName) {
      setNameError(true);
      valid = false;
    }

    if (!trimmedPhone) {
      setPhoneError(true);
      valid = false;
    }

    if (!valid) {
      if (!trimmedName) nameInputRef.current?.focus();
      return;
    }

    setFullName("");
    setPhone("");
    setNameError(false);
    setPhoneError(false);
    setPaymentMethod("bank");
    clearCart();
  };

  const showChapaFeedback = () => {
    requestAnimationFrame(() => {
      chapaButtonRef.current?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    });
  };

  const handlePayOnlineChapa = async () => {
    if (chapaLoading) return;

    setChapaError(null);
    setChapaValidationMessage(null);
    setPhoneFormatError(false);

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    let valid = true;
    let validationMessage: string | null = null;

    if (!isValidCustomerName(trimmedName)) {
      setNameError(true);
      valid = false;
      validationMessage = "Enter your full name to pay online.";
    }

    if (!trimmedPhone) {
      setPhoneError(true);
      valid = false;
      validationMessage ??= "Enter your phone number to pay online.";
    } else if (!isValidEthiopianPhone(trimmedPhone)) {
      setPhoneError(true);
      setPhoneFormatError(true);
      valid = false;
      validationMessage =
        "Use a valid Ethiopian number (09xxxxxxxx or 07xxxxxxxx).";
    }

    if (!valid) {
      setChapaValidationMessage(validationMessage);
      showChapaFeedback();
      if (!isValidCustomerName(trimmedName)) nameInputRef.current?.focus();
      return;
    }

    setChapaLoading(true);

    try {
      const result = await initializeChapaCheckout({
        fullName: trimmedName,
        phone: trimmedPhone,
        lines: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      if ("error" in result && result.error) {
        setChapaError(
          typeof result.error === "string"
            ? result.error
            : "Unable to start online payment. Please try again.",
        );
        showChapaFeedback();
        return;
      }

      if ("checkoutUrl" in result && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }

      setChapaError("Unable to start online payment. Please try again.");
      showChapaFeedback();
    } catch (error) {
      console.error("[CHAPA] Initialization failed:", error);
      setChapaError("Unable to start online payment. Please try again.");
      showChapaFeedback();
    } finally {
      setChapaLoading(false);
    }
  };

  const hasReceipt = Boolean(receiptPreviewUrl && receiptFile);
  const pinCheckoutToBottom = paymentMethod === "restaurant";

  const itemsList = (
    <div className="space-y-5">
        {items.map((item) => {
          const lineTotal = item.priceValue * item.quantity;

          return (
            <div key={item.id} className="border-b border-[#2A3344] pb-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-[18px] leading-tight text-[#F2F0EA]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 font-inter text-[12px] text-[#8995A9]">
                    {item.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title}`}
                  className="font-inter text-[18px] leading-none text-[#6B778A] transition hover:text-[#F2F0EA]"
                >
                  ×
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center overflow-hidden rounded-md border border-[#344056]">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="flex h-8 w-9 items-center justify-center font-inter text-[15px] text-[#C7CFD8] transition hover:bg-white/5"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="flex h-8 min-w-[32px] items-center justify-center border-x border-[#344056] font-inter text-[13px] text-[#F2F0EA]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="flex h-8 w-9 items-center justify-center font-inter text-[15px] text-[#C7CFD8] transition hover:bg-white/5"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="font-inter text-[14px] text-[#F2F0EA]">
                  {lineTotal}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );

  const checkoutSection = (
      <div
        className={`border-t border-[#2A3344] pt-5 ${pinCheckoutToBottom ? "" : "mt-5"}`}
      >
        <div className="flex items-end justify-between">
          <p className="pb-0.5 font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
            Checkout • {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-[26px] leading-none text-[#F2F0EA]">
              {totalValue}
            </span>
            <span className="font-inter text-[12px] text-[#8995A9]">ETB</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (e.target.value.trim()) {
                setNameError(false);
                setChapaValidationMessage(null);
              }
            }}
            className={`h-[40px] rounded-[8px] border bg-[#151C28] px-3 font-inter text-[13px] text-[#F2F0EA] placeholder:text-[#6B778A] outline-none focus:border-[#435068] ${
              nameError ? "border-[#B85C5C]" : "border-[#344056]"
            }`}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (e.target.value.trim()) {
                setPhoneError(false);
                setPhoneFormatError(false);
                setChapaValidationMessage(null);
              }
            }}
            className={`h-[40px] rounded-[8px] border bg-[#151C28] px-3 font-inter text-[13px] text-[#F2F0EA] placeholder:text-[#6B778A] outline-none focus:border-[#435068] ${
              phoneError ? "border-[#B85C5C]" : "border-[#344056]"
            }`}
          />
        </div>

        {nameError && chapaValidationMessage?.includes("full name") ? (
          <p className="mt-1.5 font-inter text-[11px] text-[#B85C5C]">
            Enter your full name to pay online.
          </p>
        ) : null}

        {phoneFormatError ? (
          <p className="mt-1.5 font-inter text-[11px] text-[#B85C5C]">
            Use a valid Ethiopian number (09xxxxxxxx or 07xxxxxxxx).
          </p>
        ) : phoneError && chapaValidationMessage?.includes("phone number") ? (
          <p className="mt-1.5 font-inter text-[11px] text-[#B85C5C]">
            Enter your phone number to pay online.
          </p>
        ) : null}

        <div className="mt-3.5 flex rounded-[10px] border border-[#344056] p-1">
          <button
            type="button"
            onClick={() => setPaymentMethod("bank")}
            className={`h-[36px] flex-1 rounded-[8px] font-inter text-[12px] font-medium transition ${
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
            className={`h-[36px] flex-1 rounded-[8px] font-inter text-[12px] font-medium transition ${
              paymentMethod === "restaurant"
                ? "bg-[var(--gold)] text-[#1D2636]"
                : "bg-transparent text-[#C7CFD8]"
            }`}
          >
            At restaurant
          </button>
        </div>

        {paymentMethod === "bank" && (
          <div className="mt-3.5 rounded-[10px] border border-[#344056] p-3.5">
            <p className="font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
              Pay {totalValue} ETB via
            </p>

            <div className="mt-3 space-y-3">
              <PaymentCopyField
                label="CBE Bank Account"
                sublabel="Account number"
                value={CBE_ACCOUNT}
              />
              <PaymentCopyField
                label="Telebirr"
                sublabel="Merchant ID"
                value={TELEBIRR_MERCHANT_ID}
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={RECEIPT_ACCEPT}
              className="hidden"
              onChange={(e) => {
                handleReceiptSelected(e.target.files?.[0]);
                e.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={openReceiptPicker}
              className={`mt-3 flex h-[40px] w-full items-center justify-center gap-2 rounded-[8px] border border-dashed bg-transparent font-inter text-[12px] transition hover:border-[#536075] ${
                receiptError && !hasReceipt
                  ? "border-[#B85C5C] text-[#C7CFD8]"
                  : "border-[#435068] text-[#C7CFD8]"
              }`}
            >
              <UploadIcon />
              {hasReceipt ? "Change receipt" : "Upload receipt screenshot"}
            </button>

            {hasReceipt ? (
              <div className="mt-3 overflow-hidden rounded-[8px] border border-[#344056] bg-[#151C28]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={receiptPreviewUrl!}
                  alt="Receipt preview"
                  className="max-h-[160px] w-full object-contain"
                />
              </div>
            ) : null}

            {receiptError && !hasReceipt ? (
              <p className="mt-1.5 font-inter text-[11px] text-[#B85C5C]">
                Please upload a receipt image before submitting.
              </p>
            ) : null}

            <button
              type="button"
              onClick={handleSubmitReceipt}
              className="mt-2.5 h-[44px] w-full rounded-[10px] bg-[var(--gold)] font-inter text-[13px] font-medium text-[#1D2636] transition hover:opacity-90"
            >
              Submit receipt for approval
            </button>
          </div>
        )}

        {paymentMethod === "restaurant" && (
          <>
            <p className="mt-4 px-1 text-center font-inter text-[12px] leading-relaxed text-[#8995A9]">
              Ordering from the café? Skip the receipt — pay cash or card at the
              counter and staff will confirm your order.
            </p>
            <button
              type="button"
              onClick={handlePlaceRestaurantOrder}
              className="mt-4 h-[44px] w-full rounded-[10px] bg-[var(--gold)] font-inter text-[13px] font-medium text-[#1D2636] transition hover:opacity-90"
            >
              Place order · pay {totalValue} ETB at counter
            </button>
          </>
        )}

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#344056]" />
          <span className="font-inter text-[9px] font-medium uppercase tracking-[0.14em] text-[#6B778A]">
            Or pay online
          </span>
          <span className="h-px flex-1 bg-[#344056]" />
        </div>

        <button
          ref={chapaButtonRef}
          type="button"
          onClick={() => void handlePayOnlineChapa()}
          disabled={chapaLoading}
          className="mt-3.5 flex h-[40px] w-full items-center justify-center rounded-full border border-[#344056] bg-[#151C28] font-inter text-[12px] text-[#C7CFD8] transition hover:border-[#435068] hover:bg-[#2A3344] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {chapaLoading ? "Redirecting to Chapa…" : "Pay Online with Chapa →"}
        </button>

        {chapaValidationMessage &&
        !phoneFormatError &&
        !chapaValidationMessage.includes("full name") &&
        !chapaValidationMessage.includes("phone number") ? (
          <p className="mt-2 font-inter text-[11px] text-[#B85C5C]">
            {chapaValidationMessage}
          </p>
        ) : null}

        {chapaError ? (
          <p className="mt-2 font-inter text-[11px] leading-relaxed text-[#B85C5C]">
            {chapaError}
          </p>
        ) : null}
      </div>
  );

  if (pinCheckoutToBottom) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-7 pt-4 max-md:px-5">
        <div className="min-h-0 flex-1 overflow-y-auto">{itemsList}</div>
        <div className="max-h-[min(72vh,720px)] shrink-0 overflow-y-auto">
          {checkoutSection}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-7 pt-4 max-md:px-5">
      {itemsList}
      {checkoutSection}
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
        <div className="relative flex min-h-0 flex-1 flex-col">
          {hasItems ? <CartWithItemsBody /> : <EmptyCartBody />}
          <DrawerReceiptSnackbar />
        </div>
      </aside>
    </div>
  );
}
