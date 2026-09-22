"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ChapaPaymentStatus } from "@/domain/payment/chapa";
import { useCart } from "@/components/cart/CartContext";

type Props = {
  txRef: string;
  status: ChapaPaymentStatus;
  amount?: number;
};

function statusCopy(status: ChapaPaymentStatus): {
  title: string;
  body: string;
} {
  switch (status) {
    case "success":
      return {
        title: "Payment successful",
        body: "Your order has been received.",
      };
    case "pending":
      return {
        title: "Payment pending",
        body: "We are still confirming your payment. You can return to the menu and check back shortly.",
      };
    case "failed":
      return {
        title: "Payment not completed",
        body: "Your payment was cancelled or did not go through. Your cart is still saved — you can try again.",
      };
    default:
      return {
        title: "Payment status unknown",
        body: "We could not verify this payment. If you were charged, contact us with your receipt.",
      };
  }
}

export default function ChapaReturnClient({ txRef, status, amount }: Props) {
  const { completeChapaPayment } = useCart();
  const cleared = useRef(false);
  const copy = statusCopy(status);

  useEffect(() => {
    if (status !== "success" || cleared.current) return;
    cleared.current = true;
    completeChapaPayment();
  }, [status, completeChapaPayment]);

  return (
    <div className="mx-auto w-full max-w-[520px] text-center">
      <p className="font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
        Online payment
      </p>
      <h1 className="mt-4 font-heading text-[36px] leading-tight text-[#F2F0EA] max-md:text-[30px]">
        {copy.title}
      </h1>
      <p className="mt-3 font-inter text-[15px] leading-relaxed text-[#8995A9]">
        {copy.body}
      </p>
      {status === "success" && amount !== undefined ? (
        <p className="mt-5 font-heading text-[28px] text-[#F2F0EA]">
          {amount}{" "}
          <span className="font-inter text-[13px] text-[#8995A9]">ETB</span>
        </p>
      ) : null}
      {txRef ? (
        <p className="mt-4 font-inter text-[11px] text-[#6B778A]">
          Reference: {txRef}
        </p>
      ) : null}
      <Link
        href="/menu"
        className="mt-10 inline-flex h-[44px] min-w-[200px] items-center justify-center rounded-[10px] bg-[var(--gold)] px-8 font-inter text-[13px] font-medium text-[#1D2636] transition hover:opacity-90"
      >
        Back to Adorsi
      </Link>
    </div>
  );
}
